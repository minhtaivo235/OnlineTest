using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models.Response
{
    public class BaseResponse
    {
        public int errorCode { get; set; } = 0;
        public string Message { get; set; } = "";
        public object data { get; set; }
        
    }
}
