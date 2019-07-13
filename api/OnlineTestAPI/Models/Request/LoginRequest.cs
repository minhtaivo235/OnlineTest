using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models.Request
{
    public class LoginRequest
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
