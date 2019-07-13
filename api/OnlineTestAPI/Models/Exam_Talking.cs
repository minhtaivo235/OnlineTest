using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("EXAM_TAKINGS")]
    public class Exam_Talking
    {
        [Column("EXA_ID")]
        public long Id { get; set; }
        [Required]
        public long GRPT_ID { get; set; }

        [Required]
        public long TAK_ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string EXAACCOUNT { get; set; }

        [Required]
        public long EXAREMAINING_TIME { get; set; }

        [Required]
        public DateTime EXADATE { get; set; }

        [Required]
        [Column(TypeName = "tinyint")]
        public int EXASTATUS { get; set; }

        [MaxLength(20)]
        public string EXAIP { get; set; }

        [ForeignKey("GRPT_ID")]
        public virtual Group_Test Group_Tests { get; set; }

        [ForeignKey("TAK_ID")]
        public virtual Taker Takers { get; set; }
    }
}
