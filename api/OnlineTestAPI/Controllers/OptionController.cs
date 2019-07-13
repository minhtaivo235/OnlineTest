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
    public class OptionController : BaseController
    {
        public OptionController(OnlineTestDBContext db) : base(db) { }

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get (long id)
        {
            return new BaseResponse
            {
                data = await _context.Options.Where(x => x.QUE_ID == id).AsNoTracking().ToListAsync()
            };
        }
    }
}