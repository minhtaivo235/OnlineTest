using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("PERMISSIONS")]
    public class Permission
    {
        [Column("PER_ID")]
        public long Id { get; set; }
        [Required]
        public long USET_ID { get; set; }
        [Required]
        public long PRI_ID { get; set; }
        [Required]
        public bool PERISREAD_ONLY { get; set; }
        [ForeignKey("USET_ID")]
        public virtual User_Type User_Types { get; set; }
        [ForeignKey("PRI_ID")]
        public virtual Privilege Privileges { get; set; }
    }
}
