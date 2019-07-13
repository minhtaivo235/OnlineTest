using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineTestAPI.Models;
using OnlineTestAPI.Models.Response;

namespace OnlineTestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamTalkingController : ControllerBase
    {
        private readonly OnlineTestDBContext _context;
        public ExamTalkingController(OnlineTestDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse
            {
                data = await _context.Exam_Talkings.Include(x => x.Gr_Tests).Include(y=> y.Takers).AsNoTracking().ToListAsync() 
            };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(long id)
        {
            var exam = await _context.Exam_Talkings.FindAsync(id);
            if (exam == null)
            {
                return NotFound();
            }
            return new BaseResponse
            {
                data = exam
            };
        }

        [HttpPost]
        public async Task<ActionResult<Exam_Talking>> Post(Exam_Talking sub)
        {
            Exam_Talking sub2 = new Exam_Talking
            {
                GRPT_ID = sub.GRPT_ID,
                TAK_ID = sub.TAK_ID,
                EXAACCOUNT = Utils.Helper.GenHash(sub.Takers.TAKADDRESS+ sub.Takers.Id+ 
                                                    sub.Takers.TAKFIRSTNAME+ sub.Takers.TAKLASTNAME+ sub.Takers.TAKPHONE+ sub.Takers.Id),
                EXAREMAINING_TIME = sub.Gr_Tests.Tests.TESTIME,
                EXADATE = sub.EXADATE,
                EXASTATUS = sub.EXASTATUS,
                EXAIP = sub.EXAIP
            };

            _context.Exam_Talkings.Add(sub2);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = sub2.Id }, new BaseResponse { data = sub2 });
        }

    }
}