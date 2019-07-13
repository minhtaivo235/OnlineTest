using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("LABS")]
    public class Lab
    {
        [Key]
        [Column("LAB_ID")]
        public int Id { get; set; }

        [MaxLength(200)]
        public string LABNAME { get; set; }

        [MaxLength(400)]
        public string LABADDRESS { get; set; }
    }
}
