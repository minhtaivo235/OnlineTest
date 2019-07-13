using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models.Response
{
    public class GroupReponse
    {
        public long Id { get; set; }
        public int LAB_ID { get; set; }
        public int SEM_ID { get; set; }
        public long SUB_ID { get; set; }
        public string GRPID { get; set; }
        public string GRPNAME { get; set; }
        public string GRPPASSWORD { get; set; }
        public string GRPENC_PASSWORD { get; set; }
        public string GRPREV_PASSWORD { get; set; }
        public string GRP_ENC_PASSWORD { get; set; }
        public bool GRPISACTIVE { get; set; }

        public string LABNAME { get; set; }
        public int SEMSEMESTER { get; set; }
        public string SUBNAME { get; set; }

    }

}
