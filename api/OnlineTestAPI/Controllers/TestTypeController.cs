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
    public class TestTypeController : BaseController
    {

        public TestTypeController(OnlineTestDBContext db) : base(db) { }
        // GET: api/<controller>
        //[HttpGet]
        //public async Task<ActionResult<asdojasodcs>> Get()
        //{
        //    List<Subject> a = await _context.Subjects.ToListAsync();
        //    return new asdojasodcs
        //    {

        //    };

        //}
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse { data = await _context.Test_Types.AsNoTracking().ToListAsync() };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(int id)
        {
            var TestType = await _context.Test_Types.FindAsync(id);
            if (TestType == null)
            {
                return NotFound();
            }
            return new BaseResponse { data = TestType};
        }

        [HttpPost]
        public async Task<ActionResult<Test_Type>> Post(Test_Type test_Type)
        {
            _context.Test_Types.Add(test_Type);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = test_Type.Id }, new BaseResponse { data = test_Type});
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Test_Type>> Put(int id, Test_Type test_type)
        {
            var tes = await _context.Test_Types.FindAsync(id);
            if (tes == null)
            {
                return NotFound();
            }

            tes.TESTISCURRENT = test_type.TESTISCURRENT;
            tes.TESTNAME = test_type.TESTNAME;
            tes.TESTORDER = test_type.TESTORDER;

            await _context.SaveChangesAsync();

            return Ok(new BaseResponse {  data = tes});
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(int id)
        {
            var test_Type = await _context.Test_Types.FindAsync(id);
            if (test_Type == null)
            {
                return NotFound();
            }

            _context.Test_Types.Remove(test_Type);
            await _context.SaveChangesAsync();
            return new BaseResponse { data = test_Type };
        }
    }
}