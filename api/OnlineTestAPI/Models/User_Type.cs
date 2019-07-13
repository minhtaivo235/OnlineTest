using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("USER_TYPES")]
    public class User_Type
    {
        [Column("USET_ID")]
        public long Id { get; set; }
        [Required]
        [StringLength(100)]
        public string USETNAME { get; set; }
        [Required]
        public bool USETISADMIN { get; set; }
        [StringLength(400)]
        public string USETNOTE { get; set; }
        public ICollection<Permission> Permissions { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
