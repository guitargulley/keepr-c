using System.ComponentModel.DataAnnotations;

namespace keepr.Models
{
    public class Keep
    {
        public int Id { get; set; }
        [MaxLength(255)]
        public string ImageUrl { get; set; }
        [MaxLength(80)]
        public string Name { get; set; }
        public int UserId { get; set; }
        public int KeepCount { get; set; }
        public int Viewed { get; set; }
        public bool Public { get; set; }
        public string Category {get; set;}
    }
}