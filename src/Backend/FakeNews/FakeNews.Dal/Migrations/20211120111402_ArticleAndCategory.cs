using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FakeNews.Dal.Migrations
{
    public partial class ArticleAndCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CreatedByUserId",
                schema: "dbo",
                table: "Articles",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                schema: "dbo",
                table: "Articles",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                schema: "dbo",
                table: "Articles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "Categories",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "4e359e0f-ec49-49ea-bd49-c14795089d89", "2b9d1fe1-2372-4d8b-b9e0-ed2620dd9d46", "User", "USER" });

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "aad0edbf-7ac0-465c-aee4-153c46383a63", "b718117f-97e6-4b07-9a8f-c784164e848d", "Admin", "ADMIN" });

            migrationBuilder.CreateIndex(
                name: "IX_Articles_CategoryId",
                schema: "dbo",
                table: "Articles",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Articles_CreatedByUserId",
                schema: "dbo",
                table: "Articles",
                column: "CreatedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FkArticleCategory",
                schema: "dbo",
                table: "Articles",
                column: "CategoryId",
                principalSchema: "dbo",
                principalTable: "Categories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FkArticleUser",
                schema: "dbo",
                table: "Articles",
                column: "CreatedByUserId",
                principalSchema: "dbo",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FkArticleCategory",
                schema: "dbo",
                table: "Articles");

            migrationBuilder.DropForeignKey(
                name: "FkArticleUser",
                schema: "dbo",
                table: "Articles");

            migrationBuilder.DropTable(
                name: "Categories",
                schema: "dbo");

            migrationBuilder.DropIndex(
                name: "IX_Articles_CategoryId",
                schema: "dbo",
                table: "Articles");

            migrationBuilder.DropIndex(
                name: "IX_Articles_CreatedByUserId",
                schema: "dbo",
                table: "Articles");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4e359e0f-ec49-49ea-bd49-c14795089d89");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aad0edbf-7ac0-465c-aee4-153c46383a63");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                schema: "dbo",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                schema: "dbo",
                table: "Articles");

            migrationBuilder.AlterColumn<int>(
                name: "CreatedByUserId",
                schema: "dbo",
                table: "Articles",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }
    }
}
