using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("ASSIGNMENTS")]
    public class Assignment
    {
        [Column("ASS_ID")]
        public long Id { get; set; }
        [Required]
        public long USE_ID { get; set; }
        [Required]
        public long SUB_ID { get; set; }
        [Required]
        [Column(TypeName = "tinyint")]
        public int ASSLEVEL { get; set; }
        //[ForeignKey("SUB_ID")]
        //public virtual Subject Subjects { get; set; }
        [ForeignKey("USE_ID")]
        public virtual User Users { get; set; }
    }
}
