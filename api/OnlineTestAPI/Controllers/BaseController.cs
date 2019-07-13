using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineTestAPI.Models;

namespace OnlineTestAPI.Controllers
{
    [ApiController]
    public class BaseController : ControllerBase
    {
        public readonly OnlineTestDBContext _context;
        public BaseController(OnlineTestDBContext context)
        {
            _context = context;
        }
    }
}