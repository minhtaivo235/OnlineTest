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
    public class User_TypeController : BaseController
    {
        public User_TypeController(OnlineTestDBContext db) : base(db) { }
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse { data = await _context.User_Types.AsNoTracking().ToListAsync() };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(long id)
        {
            var ustDB = await _context.User_Types.FindAsync(id);
            if (ustDB == null)
            {
                return NotFound();
            }
            return new BaseResponse { data = ustDB };
        }

        [HttpPost]
        public async Task<ActionResult<BaseResponse>> Post(User_Type ut)
        {
            _context.User_Types.Add(ut);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = ut.Id }, new BaseResponse { data = ut });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User_Type>> Put(long id, User_Type ut)
        {
            var utDB = await _context.User_Types.FindAsync(id);
            if (utDB == null)
            {
                return NotFound();
            }
            utDB.USETNAME = ut.USETNAME;
            utDB.USETISADMIN = ut.USETISADMIN;
            utDB.USETNOTE = ut.USETNOTE;

            await _context.SaveChangesAsync();
            return Ok(new BaseResponse { data = ut });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(long id)
        {
            var ustDB = await _context.User_Types.FindAsync(id);
            try
            {
                if (ustDB == null)
                {
                    return NotFound();
                }
                _context.User_Types.Remove(ustDB);
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