using FakeNews.Dal.Entites;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FakeNews.Dal.Context
{
    public class FakeNewsDbContext : IdentityDbContext<User>
    {
        public DbSet<Article> Articles { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ArticleCategory> ArticleCategories { get; set; }
        public DbSet<Comment> Comments { get; set; }

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
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(a => a.Id);
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasKey(c => c.Id);

                entity.HasOne(c => c.User)
                    .WithMany(u => u.Comments)
                    .HasForeignKey(c => c.UserId)
                    .HasConstraintName("FkCommentUser");

                entity.HasOne(c => c.Article)
                    .WithMany(a => a.Comments)
                    .HasForeignKey(c => c.ArticleId)
                    .HasConstraintName("FkArticleComment");
            });

            modelBuilder.Entity<ArticleCategory>(entity =>
            {
                entity.HasKey(ac => ac.Id);

                entity.HasOne(ac => ac.Article)
                .WithMany(a => a.ArticleCategories)
                .HasForeignKey(ac => ac.ArticleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkArticleArticleCategory");

                entity.HasOne(ac => ac.Category)
                    .WithMany(c => c.ArticleCategories)
                    .HasForeignKey(ac => ac.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fkCategoryArticleCategory");
            });

            modelBuilder.Entity<IdentityRole>()
                .HasData(
                new IdentityRole {Id= "5edaaf3b-9908-4864-8700-5d20f4a0abd0", Name = Common.Roles.UserRoles.Admin, NormalizedName = Common.Roles.UserRoles.Admin.ToUpper() },
                new IdentityRole {Id= "b7c62976-02e6-4bef-b03d-84f9551e82e1", Name = Common.Roles.UserRoles.User, NormalizedName = Common.Roles.UserRoles.User.ToUpper() });
        }
    }
}
