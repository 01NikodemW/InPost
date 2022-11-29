using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIInpost.Migrations
{
    public partial class AddDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "DateOfSent",
                table: "Parcels",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateOfSent",
                table: "Parcels");
        }
    }
}
