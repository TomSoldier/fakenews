using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FakeNews.Dal.Migrations
{
    public partial class AddColorCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ColorCode",
                schema: "dbo",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5edaaf3b-9908-4864-8700-5d20f4a0abd0",
                column: "ConcurrencyStamp",
                value: "0e7db708-19fc-45d8-a33e-f50f5fa15861");

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b7c62976-02e6-4bef-b03d-84f9551e82e1",
                column: "ConcurrencyStamp",
                value: "7ce8fb27-5d5f-4c09-880d-04cb16cadba3");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ColorCode",
                schema: "dbo",
                table: "Categories");

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5edaaf3b-9908-4864-8700-5d20f4a0abd0",
                column: "ConcurrencyStamp",
                value: "fc8f371d-fbcc-4bf2-bae1-31949d5007ec");

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b7c62976-02e6-4bef-b03d-84f9551e82e1",
                column: "ConcurrencyStamp",
                value: "1915e87f-ba4f-44ed-b563-037b71b10d2c");
        }
    }
}
