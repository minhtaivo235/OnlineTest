using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("RELATIVE_PRIVILEGES")]
    public class Relative_Privilege
    {
        [Column("REL_ID")]
        public long Id { get; set; }
        public long PRI_ID { get; set; }
        [Required]
        [StringLength(100)]
        public string RELNAME { get; set; }
        [Required]
        [StringLength(50)]
        public string RELURL { get; set; }
        [StringLength(400)]
        public string RELNOTE { get; set; }
        [ForeignKey("PRI_ID")]
        public virtual Privilege Privileges { get; set; }
    }
}
