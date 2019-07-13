using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models.Request
{
    public class QuestionRequest
    {
        public Question question { get; set; }
        public Option[] options { get; set; }
    }
}
