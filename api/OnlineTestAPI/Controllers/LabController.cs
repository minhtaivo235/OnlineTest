using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineTestAPI.Models;
using OnlineTestAPI.Models.Response;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineTestAPI.Controllers
{

    [Route("api/lab")]
    [ApiController]
    public class LabController : BaseController
    {
        public LabController(OnlineTestDBContext db) : base(db) { }

        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse {
                data = await _context.Labs.ToListAsync()
            };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(int id)
        {
            var Lab = await _context.Labs.FindAsync(id);
            if(Lab == null)
            {
                return NotFound();
            }
            return new BaseResponse { data = Lab};
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<ActionResult<Lab>> Post(Lab lab)
        {
            _context.Labs.Add(lab);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = lab.Id }, new BaseResponse { data = lab });
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Lab>> Put(int id, Lab lab)
        {
            var labDB = await _context.Labs.FindAsync(id);
            if (labDB == null)
            {
                return NotFound();
            }

            labDB.LABNAME = lab.LABNAME;
            labDB.LABADDRESS = lab.LABADDRESS;
            await _context.SaveChangesAsync();
            return Ok(new BaseResponse { data = labDB});
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(int id)
        {
            var labDB = await _context.Labs.FindAsync(id);
            if (labDB == null)
            {
                return NotFound();
            }

            _context.Labs.Remove(labDB);
            await _context.SaveChangesAsync();
            return new BaseResponse { data = labDB };
        }

        [HttpGet("search")]
        public async Task<ActionResult<BaseResponse>> Search([FromQuery] string keySearch)
        {
            return new BaseResponse { data = await _context.Labs.Where(x => x.LABNAME.Contains(keySearch)).ToListAsync() };
        }
    }
}
