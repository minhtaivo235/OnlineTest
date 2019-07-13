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
    public class Relative_PrivilegeController : ControllerBase
    {
        public readonly OnlineTestDBContext _context;
        public Relative_PrivilegeController(OnlineTestDBContext context)
        {
            _context = context;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse
            {
                data = await _context.Relative_Privileges.AsNoTracking().ToListAsync()
            };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(long id)
        {
            var Relative_Privilege = await _context.Relative_Privileges.FindAsync(id);
            if (Relative_Privilege == null)
            {
                return NotFound();
            }
            return new BaseResponse { data = Relative_Privilege };
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<ActionResult<Relative_Privilege>> Post(Relative_Privilege rel_pri)
        {
            _context.Relative_Privileges.Add(rel_pri);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = rel_pri.Id }, new BaseResponse { data = rel_pri });
        }
        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Relative_Privilege>> Put(long id, Relative_Privilege relative_privilege)
        {
            var rel_priDB = await _context.Relative_Privileges.FindAsync(id);
            if (rel_priDB == null)
            {
                return NotFound();
            }

            rel_priDB.PRI_ID = relative_privilege.PRI_ID;
            rel_priDB.RELNAME = relative_privilege.RELNAME;
            rel_priDB.RELURL = relative_privilege.RELURL;
            rel_priDB.RELNOTE = relative_privilege.RELNOTE;


            await _context.SaveChangesAsync();

            return Ok(new BaseResponse { data = rel_priDB });
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(long id)
        {
            var rel_priDB = await _context.Relative_Privileges.FindAsync(id);
            try
            {
                if (rel_priDB == null)
                {
                    return NotFound();
                }

                _context.Relative_Privileges.Remove(rel_priDB);
                await _context.SaveChangesAsync();
                return new BaseResponse { data = rel_priDB };
            }
            catch (Exception)
            {
                return new BaseResponse { errorCode = 1, Message = "Foreign key when delete!", data = rel_priDB };
            }
        }
        [HttpGet("search")]
        public async Task<ActionResult<BaseResponse>> Search([FromQuery] string q)
        {
            return new BaseResponse
            {
                data = await _context.Relative_Privileges.Where(x => x.RELNAME.Contains(q)).AsNoTracking().ToListAsync()
            };
        }


    }
}
