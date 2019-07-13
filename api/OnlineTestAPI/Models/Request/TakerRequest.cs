using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models.Request
{
    public class TakerRequest
    {
        public long grpt_id { get; set; }
        public Taker tak { get; set; }
    }
}
