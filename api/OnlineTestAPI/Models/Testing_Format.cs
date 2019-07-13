using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("TESTING_FORMATS")]
    public class Testing_Format
    {
        [Column("TESF_ID")]
        public long Id { get; set; }
        [Required]
        public long TES_ID { get; set; }
        [Required]
        public bool TESISFREE { get; set; }
        [Required]
        public bool TESISSHOW_PART { get; set; }
        [Required]
        public bool TESISSHOW_SCORE { get; set; }
        [Required]
        public bool TESISSHOW_PROCTOR { get; set; }
        [Required]
        public bool TESISSHOW_FEEDBACK { get; set; }
        [Required]
        public bool TESISSHOW_SIGNATURE { get; set; }
    }
}
