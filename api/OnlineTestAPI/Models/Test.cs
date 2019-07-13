using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("TESTS")]
    public class Test
    {
        [Key]
        [Column("TES_ID")]
        public long Id { get; set; }
        public long SUB_ID { get; set; }
        public long USE_ID { get; set; }
        public int SEM_ID { get; set; }
        public int TEST_ID { get; set; }

        [MaxLength(20)]
        public string TESTITLE { get; set; }

        [MaxLength(50)]
        public string TESVERSION { get; set; } = "1";

        public DateTime TESDATE { get; set; }

        public long TESTIME { get; set; }

        [MaxLength(2)]
        public string TESLANGUAGE { get; set; } = "vn";

        public bool TESISSHUFFLE { get; set; } = false;

        public bool TESISHEADPHONE { get; set; } = false;

        public bool TESISFRAME { get; set; } = false;

        public bool TESISACTIVE { get; set; } = true;

        public bool TESISLOCKED { get; set; } = false;

        [MaxLength(50)]
        public string TESPASSWORD { get; set; } = "";

        [MaxLength(100)]
        public string TESENC_PASSWORD { get; set; } = "";

        
        public double TESMAX_SCORE { get; set; } = 10;

        [MaxLength(400)]
        public string TESNOTE { get; set; }
        [ForeignKey("SUB_ID")]
        public virtual Subject Subjects { get; set; }
        [ForeignKey("USE_ID")]
        public virtual User Users { get; set; }
        [ForeignKey("SEM_ID")]
        public virtual Semester Semesters { get; set; }
        [ForeignKey("TEST_ID")]
        public virtual Test_Type Test_Types{ get; set; }

        public ICollection<Test_Detail> Test_Details { get; set; }
    }
}
