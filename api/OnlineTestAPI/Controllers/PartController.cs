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
    [Authorize] // de dau chan do
    [Route("api/[controller]")]
    [ApiController]
    public class PartController : BaseController
    {
        public PartController(OnlineTestDBContext db) : base(db) { }
        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse
            {
                data = await _context.Parts.Select(x => new PartResponse
                {
                    Id = x.Id,
                    SUB_ID = x.SUB_ID,
                    SUBNAME = x.Subjects.SUBNAME,
                    PARID = x.PARID,
                    PARNAME = x.PARNAME,
                    PARDIRECTION = x.PARDIRECTION,
                    PARDEFAULT_SCORE = x.PARDEFAULT_SCORE,
                    PARDEFAULT_LEVEL = x.PARDEFAULT_LEVEL,
                    PARNOTE = x.PARNOTE
                }
                    ).AsNoTracking().ToListAsync()
            };
        }
        [HttpGet("PartInSub/{id}")]
        public async Task<ActionResult<BaseResponse>> GetPartForSub(long id)
        {
            return new BaseResponse
            {
                data = await _context.Parts.Where(x => x.SUB_ID == id).AsNoTracking().ToListAsync()
            };
        }
        // GET: api/<controller>
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(long id)
        {
            var Part = await _context.Parts.FindAsync(id);
            if (Part == null)
            {
                return NotFound();
            }
            return new BaseResponse { data = Part };
        }
        // POST api/<controller>
        [HttpPost]
        public async Task<ActionResult<Part>> Post(Part par)
        {
            _context.Parts.Add(par);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = par.Id }, new BaseResponse { data = par });
        }
        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Part>> Put(long id, Part part)
        {
            var parDB = await _context.Parts.FindAsync(id);
            if (parDB == null)
            {
                return NotFound();
            }

            parDB.SUB_ID = part.SUB_ID;
            parDB.PARID = part.PARID;
            parDB.PARNAME = part.PARNAME;
            parDB.PARDIRECTION = part.PARDIRECTION;
            parDB.PARDEFAULT_SCORE = part.PARDEFAULT_SCORE;
            parDB.PARDEFAULT_LEVEL = part.PARDEFAULT_LEVEL;
            parDB.PARNOTE = part.PARNOTE;

            await _context.SaveChangesAsync();

            return Ok(new BaseResponse { data = parDB });
        }
        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(long id)
        {
            var parDB = await _context.Parts.FindAsync(id);
            try
            {
                if (parDB == null)
                {
                    return NotFound();
                }

                _context.Parts.Remove(parDB);
                await _context.SaveChangesAsync();
                return new BaseResponse { data = parDB };
            }
            catch (Exception)
            {
                return new BaseResponse { errorCode = 1, Message = "Foreign key when delete!" };
            }
        }
    }
}