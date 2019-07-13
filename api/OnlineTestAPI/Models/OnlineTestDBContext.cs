using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineTestAPI.Models
{
    public class OnlineTestDBContext : DbContext
    {
        public OnlineTestDBContext(DbContextOptions<OnlineTestDBContext> opt) : base(opt) { }

        public DbSet<Subject> Subjects { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Assignment> Assignments { get; set; }

        public DbSet<Exam_Talking> Exam_Talkings { get; set; }

        public DbSet<Group> Groups { get; set; }

        public DbSet<Group_Test> Group_Tests { get; set; }

        public DbSet<Lab> Labs { get; set; }

        public DbSet<Part> Parts { get; set; }

        public DbSet<Permission> Permissions { get; set; }

        public DbSet<Privilege> Privileges { get; set; }

        public DbSet<Relative_Privilege> Relative_Privileges { get; set; }

        public DbSet<Semester> Semesters { get; set; }

        public DbSet<Test> Tests { get; set; }

        public DbSet<Test_Detail> Test_Details { get; set; }

        public DbSet<Test_Type> Test_Types { get; set; }

        public DbSet<Testing_Format> Testing_Formats { get; set; }

        public DbSet<User_Type> User_Types { get; set; }


        public DbSet<Taker> Takers { get; set; }

        public DbSet<AnswerType> AnswerTypes { get; set; }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Option> Options { get; set; }

        public DbSet<ABC> ABCs { get; set; }


    }
}
