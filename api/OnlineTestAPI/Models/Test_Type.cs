using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("TEST_TYPES")]
    public class Test_Type
    {
        [Column("TEST_ID")]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string TESTNAME { get; set; }
        [Required]
        public bool TESTISCURRENT { get; set; }

        [Column(TypeName = "tinyint")]
        public int TESTORDER { get; set; }
    }
}
