using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("GROUP_TESTS")]
    public class Group_Test
    {
        [Column("GRPT_ID")]
        public long Id { get; set; }

        [Required]
        public long GRP_ID { get; set; }

        [Required]
        public long TES_ID { get; set; }

        [Required]
        [Column(TypeName = "tinyint")]
        public int GRPTSTATUS { get; set; }

        [Required]
        public DateTime GRPTDATE { get; set; }

        [ForeignKey("GRP_ID")]
        public virtual Group Groups { get; set; }

        [ForeignKey("TES_ID")]
        public virtual Test Tests { get; set; }
    }
}
