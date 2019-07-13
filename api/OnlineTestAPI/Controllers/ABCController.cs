using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineTestAPI.Models;
using OnlineTestAPI.Models.Request;
using OnlineTestAPI.Models.Response;

namespace OnlineTestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ABCController : BaseController
    {
        private IHostingEnvironment _hostingEnv;
        public ABCController(OnlineTestDBContext db, IHostingEnvironment env) : base(db)
        {
            _hostingEnv = env;
        }
        [HttpGet]
        public async Task<ActionResult<PagingResponse>> Get([FromQuery] PagingRequest pag)
        {
            var query = _context.ABCs.AsNoTracking();
            long totalRows = await query.LongCountAsync();
            var pageCount = (double)totalRows / pag.Size;
            int totalPage = (int)Math.Ceiling(pageCount);

            var skip = (pag.Page - 1) * pag.Size;
            var results = await query.Skip(skip).Take(pag.Size).ToListAsync();

            return new PagingResponse
            {
                data = results,
                PagingInfo = new PagingInfo
                {
                    CurrentPage = pag.Page,
                    PageSize = pag.Size,
                    TotalPages = totalPage,
                    TotalRecords = totalRows
                }
            };
        }
        [HttpGet("Avatar/{id}")]
        public FileResult GetAvatar(int id) // co token moi lay dc
        {
            var abc = _context.ABCs.Find(id);
            if (!String.IsNullOrEmpty(abc.Avatar))
            {
                if (!String.IsNullOrEmpty(abc.Avatar))
                {
                    string path = Path.Combine(_hostingEnv.ContentRootPath, "Data", abc.Avatar);
                    try
                    {
                        byte[] bytes = System.IO.File.ReadAllBytes(path);
                        return File(bytes, System.Net.Mime.MediaTypeNames.Application.Octet, abc.Avatar);
                    }
                    catch (Exception) { }
                }
            }
            return null;
        }
        [HttpGet("getAvatarData/{id}")]
        public ActionResult GetAvatarData(int id) // co token moi lay dc + tra ve base64 (ten anh, size,...)
        {
            var abc = _context.ABCs.Find(id);
            if (!String.IsNullOrEmpty(abc.Avatar))
            {
                if (!String.IsNullOrEmpty(abc.Avatar))
                {
                    string path = Path.Combine(_hostingEnv.ContentRootPath, "Data", abc.Avatar);
                    try
                    {
                        byte[] bytes = System.IO.File.ReadAllBytes(path);
                        string base64Str = Convert.ToBase64String(bytes);
                        return Ok(new FileDataInfo
                        {
                            FileName = abc.Avatar,
                            Extension = System.IO.Path.GetExtension(abc.Avatar),
                            Data = "data:image;base64," + base64Str
                        });
                    }
                    catch (Exception) { }
                }
                return NoContent();
            }
            return NotFound();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(int id)
        {
            ABC abc = await _context.ABCs.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (abc == null)
                return NotFound();
            else
            {
                //string domainUrl = Request.Scheme + "://" + Request.Host.ToString();
                //string path = domainUrl + "/Data/" + abc.Avatar;
                abc.Avatar = Utils.Helper.GetBaseUrl(Request) + "/Data/" + abc.Avatar;
                return new BaseResponse
                {
                    data = abc
                };
            }
        }
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> Post([FromForm]ABC sub)
        {
            var file = sub.File;
            _context.ABCs.Add(sub);
            await _context.SaveChangesAsync();
            if (file != null)
            {
                string newFileName = sub.name + "_" + file.FileName;
                string path = Path.Combine(_hostingEnv.ContentRootPath, "Data", newFileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(stream);
                    sub.Avatar = newFileName;
                    _context.Entry(sub).Property(x => x.Avatar).IsModified = true;
                    await _context.SaveChangesAsync();
                }
            }
            sub.Avatar = Utils.Helper.GetBaseUrl(Request) + "/Data/" + sub.Avatar;
            return new BaseResponse
            {
                data = sub
            };
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> Put(int id, [FromForm]ABC abc)
        {
            var abcDB = await _context.ABCs.FindAsync(id);
            if (abcDB == null)
            {
                return NotFound();
            }
            var file = abc.File;
            abcDB.name = abc.name;
            await _context.SaveChangesAsync();


            if (abcDB.Avatar == null)
            {
                if (file != null)
                {
                    string newFileName = abc.name + "_" + file.FileName;
                    string path = _hostingEnv.ContentRootPath + "\\Data\\" + newFileName;

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        abcDB.Avatar = newFileName;
                        _context.Entry(abcDB).Property(x => x.Avatar).IsModified = true;
                        await _context.SaveChangesAsync();
                    }
                }
            }
            else
            {
                if (file != null)
                {
                    string pathdelete = _hostingEnv.ContentRootPath + "\\Data\\" + abcDB.Avatar;


                    string newFileName = abc.name + "_" + file.FileName;
                    string path = _hostingEnv.ContentRootPath + "\\Data\\" + newFileName;

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        abcDB.Avatar = newFileName;
                        _context.Entry(abcDB).Property(x => x.Avatar).IsModified = true;
                        await _context.SaveChangesAsync();
                    }
                    if (System.IO.File.Exists(pathdelete))
                    {
                        try
                        {
                            System.IO.File.Delete(pathdelete);
                        }
                        catch { }
                    }
                }
                else
                {
                    string path = _hostingEnv.ContentRootPath + "\\Data\\" + abcDB.Avatar;



                    abcDB.Avatar = null;
                    _context.Entry(abcDB).Property(x => x.Avatar).IsModified = true;
                    await _context.SaveChangesAsync();

                    if (System.IO.File.Exists(path))
                    {
                        try
                        {
                            System.IO.File.Delete(path);
                        }
                        catch { }
                    }
                }
            }

            //if (file != null)
            //{
            //    if (abcDB.Avatar != null)
            //    {
            //        string pathdelete = _hostingEnv.ContentRootPath + "\\Data\\" + abcDB.Avatar;
            //        System.IO.File.Delete(pathdelete);
            //    }
            //    string newFileName = abc.name + "_" + file.FileName;
            //    string path = _hostingEnv.ContentRootPath + "\\Data\\" + newFileName;

            //    using (var stream = new FileStream(path, FileMode.Create))
            //    {
            //        file.CopyTo(stream);
            //        abcDB.Avatar = newFileName;
            //        _context.Entry(abcDB).Property(x => x.Avatar).IsModified = true;
            //        await _context.SaveChangesAsync();
            //    }
            //}
            abcDB.Avatar = Utils.Helper.GetBaseUrl(Request) + "/Data/" + abcDB.Avatar;
            return new BaseResponse
            {
                data = abcDB
            };
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(int id)
        {
            var abcDB = await _context.ABCs.FindAsync(id);
            if (abcDB == null)
            {
                return NotFound();
            }
            if (abcDB.Avatar != null)
            {
                string pathdelete = _hostingEnv.ContentRootPath + "\\Data\\" + abcDB.Avatar;
                System.IO.File.Delete(pathdelete);
            }
            _context.ABCs.Remove(abcDB);
            await _context.SaveChangesAsync();
            abcDB.Avatar = Utils.Helper.GetBaseUrl(Request) + "/Data/" + abcDB.Avatar;
            return new BaseResponse
            {
                data = abcDB
            };
        }
    }
}