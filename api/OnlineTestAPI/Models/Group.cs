using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("GROUPS")]
    public class Group
    {
        [Key]
        [Column("GRP_ID")]
        public long Id { get; set; }

        public int LAB_ID { get; set; }
        [ForeignKey("LAB_ID")]
        public virtual Lab lab { get; set; }

        public int SEM_ID { get; set; }
        [ForeignKey("SEM_ID")]
        public virtual Semester semester { get; set; }

        public long SUB_ID { get; set; }
        [ForeignKey("SUB_ID")]
        public virtual Subject subject { get; set; }

        [MaxLength(20)]
        public string GRPID { get; set; }

        [MaxLength(100)]
        public string GRPNAME { get; set; }

        [MaxLength(50)]
        public string GRPPASSWORD { get; set; }

        [MaxLength(100)]
        public string GRPENC_PASSWORD { get; set; }

        [MaxLength(50)]
        public string GRPREV_PASSWORD { get; set; }

        [MaxLength(100)]
        public string GRP_ENC_PASSWORD { get; set; }

        public bool GRPISACTIVE { get; set; }
    }
}
