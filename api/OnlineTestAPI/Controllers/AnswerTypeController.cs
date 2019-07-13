using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineTestAPI.Models;
using OnlineTestAPI.Models.Response;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace OnlineTestAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerTypeController : BaseController
    {
        public AnswerTypeController(OnlineTestDBContext db) : base(db) { }
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse
            {
                data = await _context.AnswerTypes.AsNoTracking().ToListAsync()
            };
        }
    }
}