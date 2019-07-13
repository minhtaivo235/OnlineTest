using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    [Table("ABC")]
    public class ABC
    {
        [Column("id")]
        public int Id { get; set; }
        public string name { get; set; }
        public string Avatar { get; set; }
        [NotMapped]
        public IFormFile File { get; set; }
    }
}
