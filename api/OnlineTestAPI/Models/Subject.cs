using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("SUBJECTS")]
    public class Subject
    {
        [Column("SUB_ID")]
        public long Id { get; set; }
        public long? PARENT_ID { get; set; }
        [Required]
        [StringLength(20)]
        public string SUBID { get; set; }
        [Required]
        [StringLength(100)]
        public string SUBNAME { get; set; }
        [ForeignKey("PARENT_ID")]
        public virtual Subject SubjectChild { get; set; }
        //public ICollection<Assignment> Assignments { get; set; }
    }
}
