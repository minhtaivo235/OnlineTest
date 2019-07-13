using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineTestAPI.Models;
using OnlineTestAPI.Models.Response;
using Microsoft.EntityFrameworkCore;
using OnlineTestAPI.Models.Request;

namespace OnlineTestAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : BaseController
    {
        public QuestionController(OnlineTestDBContext db) : base(db) { }
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse
            {
                data = await _context.Questions.Include(x => x.AnswerTypes).Include(x => x.Options).Include(x => x.Parts).ThenInclude(x => x.Subjects).Select(x => new QuestionResponse
                {
                    Id = x.Id,
                    ANST_ID = x.ANST_ID,
                    ANST_NAME = x.AnswerTypes.ANSTNAME,
                    PAR_ID = x.PAR_ID,
                    PAR_NAME = x.Parts.PARNAME,
                    SUB_ID = x.Parts.SUB_ID,
                    SUB_NAME = x.Parts.Subjects.SUBNAME,
                    QUECONTENT = x.QUECONTENT,
                    QUEISSHUFFLE = x.QUEISSHUFFLE,
                    QUESCORE = x.QUESCORE,
                    QUELEVEL = x.QUELEVEL,
                    list_option = x.Options
                }).AsNoTracking().ToListAsync()
            };
        }
        [AllowAnonymous]
        [HttpPost("getrdquestion")]
        public async Task<ActionResult<BaseResponse>> GetRdQuestion(Test_Detail[] td)
        {
            List<QuestionResponse> list_result = new List<QuestionResponse>();
            for (int i = 0; i < td.Length; i++)
            {
                List<QuestionResponse> list_all_of_part = await _context.Questions.Include(x => x.AnswerTypes).Include(x => x.Options).Include(x => x.Parts).ThenInclude(x => x.Subjects).Where(x=>x.PAR_ID == td[i].TESDID).Select(x => new QuestionResponse
                {
                    Id = x.Id,
                    ANST_ID = x.ANST_ID,
                    ANST_NAME = x.AnswerTypes.ANSTNAME,
                    PAR_ID = x.PAR_ID,
                    PAR_NAME = x.Parts.PARNAME,
                    SUB_ID = x.Parts.SUB_ID,
                    SUB_NAME = x.Parts.Subjects.SUBNAME,
                    QUECONTENT = x.QUECONTENT,
                    QUEISSHUFFLE = x.QUEISSHUFFLE,
                    QUESCORE = x.QUESCORE,
                    QUELEVEL = x.QUELEVEL,
                    list_option = x.Options
                }).AsNoTracking().ToListAsync();
                for (int j = 0; j < td[i].TESDNO_QUESTION; j++)
                {
                    var rd = new Random();
                    while (true)
                    {
                        QuestionResponse qr = list_all_of_part[rd.Next(list_all_of_part.Count)];
                        if (!list_result.Contains(qr))
                        {
                            list_result.Add(qr);
                            break;
                        }
                    }
                }
            }
            return new BaseResponse
            {
                data = list_result
            };
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(long id)
        {
            var questionDB = await _context.Questions.Include(x => x.AnswerTypes).Include(x => x.Options).Include(x => x.Parts).ThenInclude(x => x.Subjects)
                .Select(x => new QuestionResponse
                {
                    Id = x.Id,
                    ANST_ID = x.ANST_ID,
                    ANST_NAME = x.AnswerTypes.ANSTNAME,
                    PAR_ID = x.PAR_ID,
                    PAR_NAME = x.Parts.PARNAME,
                    SUB_ID = x.Parts.SUB_ID,
                    SUB_NAME = x.Parts.Subjects.SUBNAME,
                    QUECONTENT = x.QUECONTENT,
                    QUEISSHUFFLE = x.QUEISSHUFFLE,
                    QUESCORE = x.QUESCORE,
                    QUELEVEL = x.QUELEVEL,
                    list_option = x.Options
                }).AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (questionDB == null)
                return NotFound();
            return new BaseResponse
            {
                data = questionDB
            };
        }
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> Post(QuestionRequest que)
        {
            _context.Questions.Add(que.question);
            await _context.SaveChangesAsync();
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    for (int i = 0; i < que.options.Length; i++)
                    {
                        que.options[i].QUE_ID = que.question.Id;
                        que.options[i].Id = 0;
                        _context.Options.Add(que.options[i]);
                        await _context.SaveChangesAsync();
                    }
                    transaction.Commit();
                }
                catch (Exception) { }
            }
            return CreatedAtAction("Get", new { id = que.question.Id }, new BaseResponse { data = que.question });
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> Put(QuestionRequest que)
        {
            var queDB = await _context.Questions.Include(x => x.AnswerTypes).Include(x => x.Options).Include(x => x.Parts).ThenInclude(x => x.Subjects).Select(x => new QuestionResponse
            {
                Id = x.Id,
                ANST_ID = x.ANST_ID,
                ANST_NAME = x.AnswerTypes.ANSTNAME,
                PAR_ID = x.PAR_ID,
                PAR_NAME = x.Parts.PARNAME,
                SUB_ID = x.Parts.SUB_ID,
                SUB_NAME = x.Parts.Subjects.SUBNAME,
                QUECONTENT = x.QUECONTENT,
                QUEISSHUFFLE = x.QUEISSHUFFLE,
                QUESCORE = x.QUESCORE,
                QUELEVEL = x.QUELEVEL,
                list_option = x.Options
            }).FirstOrDefaultAsync(x => x.Id == que.question.Id);

            if (queDB == null)
            {
                return NotFound();
            }

            queDB.ANST_ID = que.question.ANST_ID;
            queDB.PAR_ID = que.question.PAR_ID;
            queDB.QUECONTENT = que.question.QUECONTENT;
            queDB.QUESCORE = que.question.QUESCORE;
            queDB.QUELEVEL = que.question.QUELEVEL;

            await _context.SaveChangesAsync();

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    //update old record & add new record
                    for (int i = 0; i < que.options.Length; i++)
                    {
                        int count = 0;
                        foreach (var item in queDB.list_option)
                        {
                            if (que.options[i].Id == item.Id)
                            {
                                Option optDB = _context.Options.FirstOrDefault(x => x.Id == item.Id);
                                optDB.OPTCONTENT = que.options[i].OPTCONTENT;
                                optDB.OPTISCORRECT = que.options[i].OPTISCORRECT;
                                await _context.SaveChangesAsync();
                                count++;
                                break;
                            }
                        }
                        if (count == 0) // Not exists in DB
                        {
                            _context.Options.Add(new Option
                            {
                                QUE_ID = que.question.Id,
                                OPTCONTENT = que.options[i].OPTCONTENT,
                                OPTISCORRECT = que.options[i].OPTISCORRECT
                            });
                            await _context.SaveChangesAsync();
                        }
                    }
                    //delete record
                    foreach (var item in queDB.list_option)
                    {
                        int count = 0;
                        for (int j = 0; j < que.options.Length; j++)
                        {
                            if (que.options[j].Id == item.Id)
                            {
                                count++;
                            }
                        }
                        if (count == 0)
                        {
                            Option opt = _context.Options.Find(item.Id);
                            _context.Remove(opt);
                            await _context.SaveChangesAsync();
                        }
                    }
                    transaction.Commit();
                }
                catch (Exception) { }
            }
            return Ok(new BaseResponse { data = queDB });
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(long id)
        {
            var queDB = await _context.Questions.FindAsync(id);
            if (queDB == null)
            {
                return NotFound();
            }
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    List<Option> list = await _context.Options.Where(x => x.QUE_ID == id).ToListAsync();
                    for (int i = 0; i < list.Count; i++)
                    {
                        _context.Options.Remove(list[i]);
                        await _context.SaveChangesAsync();
                    }
                    transaction.Commit();
                }
                catch (Exception) { }
            }

            _context.Questions.Remove(queDB);
            await _context.SaveChangesAsync();
            return new BaseResponse { data = queDB };
        }
    }
}