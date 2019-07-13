using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("SEMESTERS")]
    public class Semester
    {
        [Column("SEM_ID")]
        public int Id { get; set; }

        [Column(TypeName = "tinyint")]
        public int SEMSEMESTER { get; set; }

        public int SEMYEAR { get; set; }

        public bool SEMISCURRENT { get; set; }
    }
}
