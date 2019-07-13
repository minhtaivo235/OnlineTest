using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models.Response
{
    public class PartResponse
    {
        public long Id { get; set; }

        public long SUB_ID { get; set; }

        public string SUBNAME { get; set; }

        public string PARID { get; set; }

        public string PARNAME { get; set; }

        public string PARDIRECTION { get; set; }

        public double PARDEFAULT_SCORE { get; set; }

        public int PARDEFAULT_LEVEL { get; set; }

        public int? PARORDER { get; set; }

        public string PARNOTE { get; set; }
    }
}
