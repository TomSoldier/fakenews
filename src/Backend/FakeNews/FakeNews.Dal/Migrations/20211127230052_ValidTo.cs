using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FakeNews.Dal.Migrations
{
    public partial class ValidTo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ValidTo",
                schema: "dbo",
                table: "Articles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5edaaf3b-9908-4864-8700-5d20f4a0abd0",
                column: "ConcurrencyStamp",
                value: "5be7d522-42d0-4316-bfda-d05d55e54327");

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b7c62976-02e6-4bef-b03d-84f9551e82e1",
                column: "ConcurrencyStamp",
                value: "e784f858-471d-4a7d-b364-f44a90f30f38");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValidTo",
                schema: "dbo",
                table: "Articles");

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
