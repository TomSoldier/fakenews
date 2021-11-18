using FakeNews.Dal.Entites;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FakeNews.Dal.Context
{
    public class FakeNewsDbContext : IdentityDbContext<User>
    {
        public DbSet<Article> Articles { get; set; }
        public DbSet<Category> Categories { get; set; }

        public FakeNewsDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasDefaultSchema("dbo");

            modelBuilder.Entity<Article>(entity =>
            {
                entity.HasKey(a => a.Id);

                entity.HasOne(a => a.CreatedByUser)
                .WithMany(u => u.Articles)
                .HasForeignKey(a => a.CreatedByUserId)
                .HasConstraintName("FkArticleUser");

                entity.HasOne(a => a.Category)
                .WithMany(c => c.Articles)
                .HasForeignKey(a => a.CategoryId)
                .HasConstraintName("FkArticleCategory");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(a => a.Id);
            });
        }
    }
}
