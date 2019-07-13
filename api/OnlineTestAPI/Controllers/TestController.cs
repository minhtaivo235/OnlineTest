using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineTestAPI.Models;
using OnlineTestAPI.Models.Response;

namespace OnlineTestAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {

        public readonly OnlineTestDBContext _context;
        public TestController(OnlineTestDBContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse { data = await _context.Tests.Include(x=>x.Test_Details).AsNoTracking().ToListAsync() };
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(long id)
        {
            var test = await _context.Tests.Include(x=>x.Test_Details).AsNoTracking().FirstOrDefaultAsync(x=>x.Id == id);
            if (test == null)
            {
                return NotFound();
            }
            return new BaseResponse { data = test };
        }
        //[HttpPost]
        //public async Task<ActionResult<Test>> Post(Test test)
        //{
        //    _context.Tests.Add(test);
        //    await _context.SaveChangesAsync();
        //    return CreatedAtAction("Get", new { id = test.Id }, new BaseResponse { data = test });
        //}
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> Post(Test test)
        {


            test.TESVERSION = "1";
            test.TESLANGUAGE = "vn";
            test.TESISSHUFFLE = false;
            test.TESISHEADPHONE = false;
            test.TESISFRAME = false;
            test.TESPASSWORD = "";
            test.TESENC_PASSWORD = "";
           

            _context.Tests.Add(test);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = test.Id }, new BaseResponse { data = test });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> Put(long id, Test test)
        {
            var tesDB = await _context.Tests.FindAsync(id);
            if (tesDB == null)
            {
                return NotFound();
            }

            tesDB.SUB_ID = test.SUB_ID;
            tesDB.USE_ID = test.USE_ID;
            tesDB.SEM_ID = test.SEM_ID;
            tesDB.TEST_ID = test.TEST_ID;
            tesDB.TESTITLE = test.TESTITLE;
            tesDB.TESVERSION = "1";
            tesDB.TESDATE = test.TESDATE;
            tesDB.TESTIME = test.TESTIME;
            tesDB.TESLANGUAGE = "vn";
            tesDB.TESISSHUFFLE = false;
            tesDB.TESISHEADPHONE = false;
            tesDB.TESISFRAME = false;            
            tesDB.TESISACTIVE = test.TESISACTIVE;
            tesDB.TESISLOCKED = test.TESISLOCKED;
            tesDB.TESMAX_SCORE = test.TESMAX_SCORE;
            tesDB.TESPASSWORD = "";
            tesDB.TESENC_PASSWORD = ""; 
            tesDB.TESNOTE = test.TESNOTE;

            await _context.SaveChangesAsync();

            return Ok(new BaseResponse { data = tesDB });
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(long id)
        {
            var test = await _context.Tests.FindAsync(id);
            try
            {
                if (test == null)
                {
                    return NotFound();
                }

                _context.Tests.Remove(test);
                await _context.SaveChangesAsync();
                return new BaseResponse { data = test };
            }
            catch (Exception)
            {
                return new BaseResponse { errorCode = 1, Message = "Foreign key when delete!" };
            }
        }

    }
}