using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models.Request
{
    public class PagingRequest
    {
        public int Size { get; set; }
        public int Page { get; set; }
    }
}
