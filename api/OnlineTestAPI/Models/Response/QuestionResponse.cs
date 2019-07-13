using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models.Response
{
    public class QuestionResponse
    {
        public long Id { get; set; }
        public int ANST_ID { get; set; }
        public string ANST_NAME { get; set; }
        public long? PAR_ID { get; set; }
        public string PAR_NAME { get; set; }
        public long SUB_ID { get; set; }
        public string SUB_NAME { get; set; }
        public string QUECONTENT { get; set; }
        public bool QUEISSHUFFLE { get; set; }
        public double QUESCORE { get; set; }
        public int QUELEVEL { get; set; }
        public ICollection<Option> list_option { get; set; }
    }
}
