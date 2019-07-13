using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("USERS")]
    public class User
    {
        [Column("USE_ID")]
        public long Id { get; set; }
        [Required]
        public long USET_ID { get; set; }
        [Required]
        [StringLength(50)]
        public string USEACCOUNT { get; set; }
        [Required]
        [StringLength(50)]
        public string USEENC_PASSWORD { get; set; }
        [Required]
        [StringLength(50)]
        public string USEFIRSTNAME { get; set; }
        [Required]
        [StringLength(100)]
        public string USELASTNAME { get; set; }
        [Required]
        public DateTime USEDOB { get; set; }
        [Required]
        public bool USEGENDER { get; set; }
        [MaxLength(50)]
        public string USEEMAIL { get; set; }
        [Required]
        [MaxLength(50)]
        public string USEPHONE { get; set; }
        [Required]
        public bool USEISACTIVE { get; set; }
        [Required]
        public DateTime USEDATE { get; set; }
        [ForeignKey("USET_ID")]
        public virtual User_Type User_Types { get; set; }
        public ICollection<Assignment> Assignments { get; set; }
    }
}
