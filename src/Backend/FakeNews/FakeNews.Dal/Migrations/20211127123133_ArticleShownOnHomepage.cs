using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FakeNews.Dal.Migrations
{
    public partial class ArticleShownOnHomepage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<bool>(
                name: "ShownOnHomepage",
                schema: "dbo",
                table: "Articles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1560ae4b-534d-4d96-8c0d-c97d89887dc4", "30e0eea8-db9c-4817-9a0b-854a8dcbffbc", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "53a46328-3b81-486f-b78f-fd30841a482e", "58bb8150-7884-4cb2-9005-0a03aeee258e", "User", "USER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1560ae4b-534d-4d96-8c0d-c97d89887dc4");

            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "53a46328-3b81-486f-b78f-fd30841a482e");

            migrationBuilder.DropColumn(
                name: "ShownOnHomepage",
                schema: "dbo",
                table: "Articles");

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
        }
    }
}
