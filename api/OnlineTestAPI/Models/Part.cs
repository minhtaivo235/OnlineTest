using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("PARTS")]
    public class Part
    {
        [Column("PAR_ID")]
        public long Id { get; set; }

        [Required]
        public long SUB_ID { get; set; }

        [Required]
        [MaxLength(10)]
        public string PARID { get; set; }

        [Required]
        [MaxLength(200)]
        public string PARNAME { get; set; }

        [Column(TypeName="text")]
        public string PARDIRECTION { get; set; }

        [Required]
        public double PARDEFAULT_SCORE { get; set; }

        [Required]
        [Column(TypeName = "tinyint")]
        public int PARDEFAULT_COLUMN { get; set; }

        [Required]
        [Column(TypeName = "tinyint")]
        public int PARDEFAULT_LEVEL { get; set; }

        public int? PARORDER { get; set; }

        [MaxLength(400)]
        public string PARNOTE { get; set; }

        [ForeignKey("SUB_ID")]
        public virtual Subject Subjects { get; set; }

    }
}
