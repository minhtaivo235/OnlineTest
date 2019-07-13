using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineTestAPI.Models;
using OnlineTestAPI.Models.Response;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineTestAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : BaseController
    {
        private IHostingEnvironment _hostingEnv;
        public SubjectController(OnlineTestDBContext db, IHostingEnvironment env) : base(db) {
            _hostingEnv = env;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse
            {
                data = await _context.Subjects.Include(x => x.SubjectChild).AsNoTracking().ToListAsync()
            };
        }
        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(long id)
        {
            var Subject = await _context.Subjects.AsNoTracking().SingleOrDefaultAsync(x => x.Id == id);
            if (Subject == null)
            {
                return NotFound();
            }
            return new BaseResponse
            {
                data = Subject
            };
        }
        // POST api/<controller>
        [HttpPost]
        public async Task<ActionResult<Subject>> Post(Subject sub)
        {
            _context.Subjects.Add(sub);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = sub.Id }, new BaseResponse { data = sub });
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Subject>> Put(long id, Subject subject)
        {
            var subDB = await _context.Subjects.FindAsync(id);
            if (subDB == null)
            {
                return NotFound();
            }
            
            subDB.PARENT_ID = subject.PARENT_ID;
            subDB.SUBID = subject.SUBID;
            subDB.SUBNAME = subject.SUBNAME;

            await _context.SaveChangesAsync();

            return Ok(new BaseResponse { data = subDB });
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(long id)
        {
            var subDB = await _context.Subjects.FindAsync(id);
            try
            {
                if (subDB == null)
                {
                    return NotFound();
                }

                _context.Subjects.Remove(subDB);
                await _context.SaveChangesAsync();
                return new BaseResponse { data = subDB };
            }
            catch (Exception)
            {
                return new BaseResponse { errorCode = 1, Message = "Foreign key when delete!", data = subDB };
            }
        }
        [HttpGet("search")]
        public async Task<ActionResult<BaseResponse>> Search([FromQuery] string q)
        {
            return new BaseResponse {
                data = await _context.Subjects.Where(x => x.SUBNAME.Contains(q)).AsNoTracking().ToListAsync()
            };
        }
        

    }
}
