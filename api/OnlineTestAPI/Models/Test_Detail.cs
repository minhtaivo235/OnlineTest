using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("TEST_DETAILS")]
    public class Test_Detail
    {
        [Column("TESD_ID")]
        public long Id { get; set; }

        public long? TESD_ID2 { get; set; }

        [Required]
        public long TES_ID { get; set; }

        [Required]
        public long TESDID { get; set; }

        [Column(TypeName = "tinyint")]
        public int TESDTABLE { get; set; }

        [Required]
        public int TESDNO_QUESTION { get; set; }

        public int? TESDORDER { get; set; }

        [ForeignKey("TES_ID")]
        public virtual Test Tests { get; set; }
    }
}
