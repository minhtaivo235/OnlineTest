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
    public class PrivilegeController : ControllerBase
    {
        public readonly OnlineTestDBContext _context;
        public PrivilegeController(OnlineTestDBContext context)
        {
            _context = context;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse
            {
                data = await _context.Privileges.AsNoTracking().ToListAsync()
            };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(long id)
        {
            var Privilege = await _context.Privileges.FindAsync(id);
            if (Privilege == null)
            {
                return NotFound();
            }
            return new BaseResponse { data = Privilege };
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<ActionResult<Privilege>> Post(Privilege pri)
        {
            _context.Privileges.Add(pri);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = pri.Id }, new BaseResponse { data = pri });
        }
        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Privilege>> Put(long id, Privilege privilege)
        {
            var priDB = await _context.Privileges.FindAsync(id);
            if (priDB == null)
            {
                return NotFound();
            }

            priDB.PRINAME = privilege.PRINAME;
            priDB.PRIURL = privilege.PRIURL;
            priDB.PRIPARENT = privilege.PRIPARENT;
            priDB.PRIORDER = privilege.PRIORDER;
            priDB.PRINOTE = privilege.PRINOTE;


            await _context.SaveChangesAsync();

            return Ok(new BaseResponse { data = priDB });
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(long id)
        {
            var priDB = await _context.Privileges.FindAsync(id);
            try
            {
                if (priDB == null)
                {
                    return NotFound();
                }

                _context.Privileges.Remove(priDB);
                await _context.SaveChangesAsync();
                return new BaseResponse { data = priDB };
            }
            catch (Exception)
            {
                return new BaseResponse { errorCode = 1, Message = "Foreign key when delete!", data = priDB };
            }
        }
        [HttpGet("search")]
        public async Task<ActionResult<BaseResponse>> Search([FromQuery] string q)
        {
            return new BaseResponse
            {
                data = await _context.Privileges.Where(x => x.PRINAME.Contains(q)).AsNoTracking().ToListAsync()
            };
        }


    }
}
