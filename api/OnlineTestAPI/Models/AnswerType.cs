using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("ANSWER_TYPES")]
    public class AnswerType
    {
        [Column("ANST_ID")]
        public int Id { get; set; }
        [Required]
        [StringLength(10)]
        public string ANSTID { get; set; }
        [Required]
        [StringLength(50)]
        public string ANSTNAME { get; set; }
        public int? ANSTORDER { get; set; }
        [Column(TypeName = "ntext")]
        public string ANSTSAMPLE { get; set; }
    }
}
