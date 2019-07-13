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
    public class TestDetailController : BaseController
    {
        public TestDetailController(OnlineTestDBContext db) : base(db) { }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> GetListByTestID(long id)
        {
            return new BaseResponse
            {
                data = await _context.Test_Details.Where(x => x.TES_ID == id).AsNoTracking().ToListAsync()
            };
        }
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> Post(Test_DetailRequest tdr)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                for (int i = 0; i < tdr.list_test_detail.Length; i++)
                {
                    tdr.list_test_detail[i].TES_ID = tdr.tes_id;
                    _context.Test_Details.Add(tdr.list_test_detail[i]);
                    await _context.SaveChangesAsync();
                }
                transaction.Commit();
            }
            return Ok(new BaseResponse {
                data = tdr.list_test_detail
            });
        }
    }
}