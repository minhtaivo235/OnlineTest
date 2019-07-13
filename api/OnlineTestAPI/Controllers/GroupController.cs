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
    public class GroupController : ControllerBase
    {
        public readonly OnlineTestDBContext _context;

        public GroupController(OnlineTestDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse
            {
                data = await _context.Groups.Select(x => new GroupReponse
                {
                    Id = x.Id,
                    GRPID = x.GRPID,
                    GRPNAME = x.GRPNAME,
                    GRPPASSWORD = x.GRPPASSWORD,
                    GRPENC_PASSWORD = x.GRPENC_PASSWORD,
                    GRPREV_PASSWORD = x.GRPREV_PASSWORD,
                    GRP_ENC_PASSWORD = x.GRP_ENC_PASSWORD,
                    GRPISACTIVE = x.GRPISACTIVE,
                    LAB_ID = x.LAB_ID,
                    SUB_ID = x.SUB_ID,
                    SEM_ID = x.SEM_ID,
                    LABNAME = x.lab.LABNAME,
                    SUBNAME = x.subject.SUBNAME,
                    SEMSEMESTER = x.semester.SEMSEMESTER
                }
                    ).AsNoTracking().ToListAsync()
            };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(long id)
        {
            var group = await _context.Groups.FindAsync(id);
            if (group == null)
            {
                return NotFound();
            }
            return new BaseResponse { data = group };
        }

        [HttpPost]
        public async Task<ActionResult<Group>> Post(Group group)
        {
            _context.Groups.Add(group);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = group.Id }, new BaseResponse { data = group });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Group>> Put(long id, Group group)
        {
            var groupDB = await _context.Groups.FindAsync(id);
            if (groupDB == null)
            {
                return NotFound();
            }

            groupDB.LAB_ID = group.LAB_ID;
            groupDB.SEM_ID = group.SEM_ID;
            groupDB.SUB_ID = group.SUB_ID;
            groupDB.GRPID = group.GRPID;
            groupDB.GRPNAME = group.GRPNAME;
            groupDB.GRPPASSWORD = group.GRPPASSWORD;
            groupDB.GRPENC_PASSWORD = group.GRPENC_PASSWORD;
            groupDB.GRPREV_PASSWORD = group.GRPREV_PASSWORD;
            groupDB.GRP_ENC_PASSWORD = group.GRP_ENC_PASSWORD;
            groupDB.GRPISACTIVE = group.GRPISACTIVE;

            await _context.SaveChangesAsync();
            return Ok(new BaseResponse { data = groupDB });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(long id)
        {
            var groupDB = await _context.Groups.FindAsync(id);
            if (groupDB == null)
            {
                return NotFound();
            }

            _context.Groups.Remove(groupDB);
            await _context.SaveChangesAsync();
            return new BaseResponse { data = groupDB };
        }

    }
}