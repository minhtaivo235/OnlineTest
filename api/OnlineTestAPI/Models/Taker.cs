using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("TAKERS")]
    public class Taker
    {
        [Column("TAK_ID")]
        public long Id { get; set; }
        [StringLength(20)]
        public string TAKID { get; set; }
        [StringLength(50)]
        public string TAKFIRSTNAME { get; set; }
        [StringLength(100)]
        public string TAKLASTNAME { get; set; }
        public bool TAKGENDER { get; set; }
        public DateTime TAKDOB { get; set; }
        [StringLength(200)]
        public string TAKADDRESS { get; set; }
        [StringLength(50)]
        public string TAKEMAIL { get; set; }
        [StringLength(20)]
        public string TAKPHONE { get; set; }

    }
}
