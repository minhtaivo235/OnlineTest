using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("PRIVILEGES")]
    public class Privilege
    {
        [Column("PRI_ID")]
        public long Id { get; set; }
        [Required]
        [StringLength(200)]
        public string PRINAME { get; set; }
        [Required]
        [StringLength(200)]
        public string PRIURL { get; set; }
        [Required]
        [Column(TypeName = "smallint")]
        public int PRIPARENT { get; set; }
        [Column(TypeName = "smallint")]
        public int? PRIORDER { get; set; }
        [StringLength(400)]
        public string PRINOTE { get; set; }
        public ICollection<Relative_Privilege> Relative_Privileges { get; set; }
        public ICollection<Permission> Permissions { get; set; }
    }
}
