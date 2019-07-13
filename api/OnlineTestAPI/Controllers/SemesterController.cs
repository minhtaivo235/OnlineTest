using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineTestAPI.Models;
using OnlineTestAPI.Models.Response;

namespace OnlineTestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SemesterController : ControllerBase
    {
        public readonly OnlineTestDBContext _context;
        public SemesterController(OnlineTestDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse
            {
                data = await _context.Semesters.AsNoTracking().ToListAsync()
            };
        }
        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(int id)
        {
            var Semester = await _context.Semesters.FindAsync(id);
            if (Semester == null)
            {
                return NotFound();
            }
            return new BaseResponse { data = Semester };
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> Post(Semester sem)
        {
            _context.Semesters.Add(sem);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = sem.Id }, new BaseResponse { data = sem });
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> Put(int id, Semester semester)
        {
            var semDB = await _context.Semesters.FindAsync(id);
            if (semDB == null)
            {
                return NotFound();
            }

            semDB.SEMISCURRENT = semester.SEMISCURRENT;
            semDB.SEMSEMESTER = semester.SEMSEMESTER;
            semDB.SEMYEAR = semester.SEMYEAR;

            await _context.SaveChangesAsync();

            return Ok(new BaseResponse { data = semester });
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(int id)
        {
            var semDB = await _context.Semesters.FindAsync(id);
            try
            {
                if (semDB == null)
                {
                    return NotFound();
                }

                _context.Semesters.Remove(semDB);
                await _context.SaveChangesAsync();
                return new BaseResponse { data = semDB };
            }
            catch (Exception)
            {
                return new BaseResponse { errorCode = 1, Message = "Error foreign key exist!" , data = semDB };
            }
        }
    }
}