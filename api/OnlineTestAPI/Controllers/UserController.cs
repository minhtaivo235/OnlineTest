using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OnlineTestAPI.Models;
using OnlineTestAPI.Models.Request;
using OnlineTestAPI.Models.Response;
namespace OnlineTestAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly OnlineTestDBContext _context;
        public UserController(OnlineTestDBContext context)
        {
            _context = context;
            if(_context.Users.Count() == 0)
            {
                User admin = new User
                {
                    USET_ID = 1,
                    USEACCOUNT = "admin",
                    USEENC_PASSWORD = Utils.Helper.GenHash("admin"),
                    USEFIRSTNAME = "Nguyen Hoang",
                    USELASTNAME = "Tan",
                    USEDOB = new DateTime(1996, 11, 18),
                    USEGENDER = true,
                    USEPHONE = "0906971622",
                    USEISACTIVE = true,
                    USEDATE = DateTime.Now
                };
                _context.Users.Add(admin);
                _context.SaveChanges();
            }
        }
        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            return new BaseResponse
            {
                data = await _context.Users.Include(y => y.User_Types).AsNoTracking().ToListAsync()
            };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(long id)
        {
            var User = await _context.Users.FindAsync(id);
            if (User == null)
            {
                return NotFound();
            }
            return new BaseResponse
            {
                data = User
            };
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<BaseResponse>> Login(LoginRequest req)
        {
            if(String.IsNullOrEmpty(req.username) || String.IsNullOrEmpty(req.password))
            {
                return new BaseResponse
                {
                    errorCode = 1,
                    Message = "Missing field(s)"
                };
            }
            else
            {
                var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(x => x.USEACCOUNT == req.username && x.USEENC_PASSWORD == Utils.Helper.GenHash(req.password));
                if (user == null)
                {
                    return new BaseResponse
                    {
                        errorCode = 2,
                        Message = "Wrong username or password!"
                    };
                }
                else
                {
                    var claimdata = new[] { new Claim(ClaimTypes.Name, req.username) };
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Utils.Helper.appkey));
                    var signingCredential = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        issuer: Utils.Helper.issuer,
                        audience: Utils.Helper.issuer,
                        expires: DateTime.Now.AddHours(12),
                        claims: claimdata,
                        signingCredentials: signingCredential
                        );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                    return new BaseResponse
                    {
                        data = new LoginResponse
                        {
                            Id = user.Id,
                            username = user.USEACCOUNT,
                            firstname = user.USEFIRSTNAME,
                            lastname = user.USELASTNAME,
                            token = "Bearer " + tokenString
                        }
                    };
                }
            }
        }
        // POST api/<controller>
        [HttpPost]
        public async Task<ActionResult<User>> Post(User sub)
       {
            User sub2 = new User
            {
                USET_ID = sub.USET_ID,
                USEACCOUNT = sub.USEACCOUNT,
                USEENC_PASSWORD = Utils.Helper.GenHash(sub.USEENC_PASSWORD),
                USEFIRSTNAME = sub.USEFIRSTNAME,
                USELASTNAME = sub.USELASTNAME,
                USEDOB = sub.USEDOB,
                USEGENDER = sub.USEGENDER,
                USEEMAIL = sub.USEEMAIL,
                USEPHONE = sub.USEPHONE,
                USEISACTIVE = sub.USEISACTIVE,
                USEDATE = sub.USEDATE
            };
            
            _context.Users.Add(sub2);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = sub2.Id },new BaseResponse { data = sub2 });
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> Put(long id, User user)
        {
            var usDB = await _context.Users.FindAsync(id);
            if( usDB == null)
            {
                return NotFound();
            }
            usDB.USET_ID = user.USET_ID;
            if (usDB.USEENC_PASSWORD != user.USEENC_PASSWORD)
            {
                usDB.USEENC_PASSWORD = Utils.Helper.GenHash(user.USEENC_PASSWORD);
            }
            usDB.USEFIRSTNAME = user.USEFIRSTNAME;
            usDB.USELASTNAME = user.USELASTNAME;
            usDB.USEDOB = user.USEDOB;
            usDB.USEGENDER = user.USEGENDER;
            usDB.USEEMAIL = user.USEEMAIL;
            usDB.USEPHONE = user.USEPHONE;
            usDB.USEISACTIVE = user.USEISACTIVE;
            usDB.USEDATE = user.USEDATE;

            await _context.SaveChangesAsync();
            return Ok(new BaseResponse { data = usDB});

        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(long id )
        {
            var usDB = await _context.Users.FindAsync(id);
            try
            {
                if(usDB == null)
                {
                    return NotFound();
                }
                _context.Users.Remove(usDB);
                await _context.SaveChangesAsync();
                return new BaseResponse { data = usDB };
            }
            catch (Exception)
            {
                return new BaseResponse { errorCode = 1, Message = "Foreign key exist" };
            }
        }
    }
}
