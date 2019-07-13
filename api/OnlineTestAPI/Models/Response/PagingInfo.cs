using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models.Response
{
    public class PagingInfo
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public long TotalRecords { get; set; }
        public int TotalPages { get; set; }
    }
}
