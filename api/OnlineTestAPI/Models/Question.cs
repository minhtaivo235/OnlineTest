using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("QUESTIONS")]
    public class Question
    {
        [Column("QUE_ID")]
        public long Id { get; set; }
        [Required]
        public int ANST_ID { get; set; }
        public long? PAR_ID { get; set; }
        public long? PAS_ID { get; set; }
        [Required]
        [Column(TypeName = "ntext")]
        public string QUECONTENT { get; set; }
        [Required]
        public bool QUEISSHUFFLE { get; set; }
        [Required]
        public double QUESCORE { get; set; }
        [Required]
        [Column(TypeName = "tinyint")]
        public int QUEOPT_COLUMN { get; set; }
        [Required]
        public bool QUEISBANK { get; set; }
        [Required]
        [Column(TypeName = "tinyint")]
        public int QUELEVEL { get; set; }
        [StringLength(50)]
        public string QUEMEDIA { get; set; }
        [StringLength(100)]
        public string QUEREFERENCE { get; set; }
        public int? QUEORDER { get; set; }
        [ForeignKey("ANST_ID")]
        public virtual AnswerType AnswerTypes { get; set; }
        [ForeignKey("PAR_ID")]
        public virtual Part Parts { get; set; }
        public ICollection<Option> Options { get; set; }
    }
}
