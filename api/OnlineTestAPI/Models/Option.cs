using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("OPTIONS")]
    public class Option
    {
        [Column("OPT_ID")]
        public long Id { get; set; }
        [Required]
        public long QUE_ID { get; set; }
        [Required]
        [Column(TypeName = "ntext")]
        public string OPTCONTENT { get; set; }
        [Required]
        public bool OPTISCORRECT { get; set; }
        [Column(TypeName = "tinyint")]
        public int? OPTORDER { get; set; }
        [ForeignKey("QUE_ID")]
        public virtual Question Questions { get; set; }
    }
}
