using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models.Request
{
    public class Test_DetailRequest
    {
        public long tes_id { get; set; }
        public Test_Detail[] list_test_detail { get; set; }
    }
}
