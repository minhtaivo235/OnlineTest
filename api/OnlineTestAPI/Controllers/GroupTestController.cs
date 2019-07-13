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
    public class GroupTestController : BaseController
    {
        public GroupTestController(OnlineTestDBContext db) : base(db) { }
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse
            {
                data = await _context.Group_Tests.Include(x=>x.Groups).Include(x=>x.Tests).AsNoTracking().ToListAsync()
            };
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get (long id)
        {
            var groDB = await _context.Group_Tests.Include(x=>x.Groups).Include(x=>x.Tests).AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if(groDB == null)
            {
                return NotFound();
            }
            return new BaseResponse
            {
                data = groDB
            };
        }
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> Post(Group_Test gt)
        {
            _context.Group_Tests.Add(gt);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = gt.Id }, new BaseResponse { data = gt });
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> Put (long id, Group_Test gt)
        {
            var gtDB = _context.Group_Tests.Find(id);
            if (gtDB == null)
                return NotFound();

            gtDB.GRP_ID = gt.GRP_ID;
            gtDB.TES_ID = gt.TES_ID;
            gtDB.GRPTDATE = gt.GRPTDATE;
            gtDB.GRPTSTATUS = gt.GRPTSTATUS;

            await _context.SaveChangesAsync();
            return Ok(new BaseResponse {
                data = gtDB
            });
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete (long id)
        {
            var gtDB = _context.Group_Tests.Find(id);
            if (gtDB == null)
                return NotFound();
            try
            {
                _context.Group_Tests.Remove(gtDB);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    data = gtDB
                };
            }
            catch (Exception)
            {
                return new BaseResponse
                {
                    errorCode = 1,
                    Message = "Foreign key still exist!"
                };
            }
        }
    }
}