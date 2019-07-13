using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineTestAPI.Models;
using OnlineTestAPI.Models.Request;
using OnlineTestAPI.Models.Response;

namespace OnlineTestAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TakerController : BaseController
    {
        public TakerController(OnlineTestDBContext db) : base(db) { }
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse { data = await _context.Takers.AsNoTracking().ToListAsync() };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(long id)
        {
            var ustDB = await _context.Takers.FindAsync(id);
            if (ustDB == null)
            {
                return NotFound();
            }
            return new BaseResponse { data = ustDB };
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> Post(TakerRequest tr)
        {
            if (_context.Takers.ToList().Count == 0)
            {
                tr.tak.TAKID = "TAK1";
            }
            else
                tr.tak.TAKID = "TAK" + (_context.Takers.OrderByDescending(x => x.Id).Take(1).ToList()[0].Id + 1);
            _context.Takers.Add(tr.tak);
            await _context.SaveChangesAsync();

            Exam_Talking et = new Exam_Talking
            {
                GRPT_ID = tr.grpt_id,
                TAK_ID = tr.tak.Id,
                EXAACCOUNT = Utils.Helper.GenHash(tr.tak.ToString()),
                EXADATE = DateTime.Now,
                EXAREMAINING_TIME = _context.Tests.Where(x => x.Id == _context.Group_Tests.FirstOrDefault(y => y.Id == tr.grpt_id).TES_ID).FirstOrDefault().TESTIME,
                EXASTATUS = 1
            };
            _context.Exam_Talkings.Add(et);
            await _context.SaveChangesAsync();
            return new BaseResponse
            {
                data = et
            };
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Taker>> Put(long id, Taker ut)
        {
            var utDB = await _context.Takers.FindAsync(id);
            if (utDB == null)
            {
                return NotFound();
            }
            utDB.TAKID = ut.TAKID;
            utDB.TAKFIRSTNAME = ut.TAKFIRSTNAME;
            utDB.TAKLASTNAME = ut.TAKLASTNAME;
            utDB.TAKGENDER = ut.TAKGENDER;
            utDB.TAKDOB = ut.TAKDOB;
            utDB.TAKADDRESS = ut.TAKADDRESS;
            utDB.TAKEMAIL = ut.TAKEMAIL;
            utDB.TAKPHONE = ut.TAKPHONE;

            await _context.SaveChangesAsync();
            return Ok(new BaseResponse { data = ut });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(long id)
        {
            var ustDB = await _context.Takers.FindAsync(id);
            try
            {
                if (ustDB == null)
                {
                    return NotFound();
                }
                _context.Takers.Remove(ustDB);
                await _context.SaveChangesAsync();
                return new BaseResponse { data = ustDB };
            }
            catch
            {
                return new BaseResponse { errorCode = 1, Message = "foreign key" };
            }

        }
    }
}