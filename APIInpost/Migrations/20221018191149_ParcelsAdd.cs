using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIInpost.Migrations
{
    public partial class ParcelsAdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ParcelLockers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParcelLockers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Parcels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Weight = table.Column<int>(type: "int", nullable: false),
                    SourceLockerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DestinationLockerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SenderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReciverId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parcels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Parcels_ParcelLockers_DestinationLockerId",
                        column: x => x.DestinationLockerId,
                        principalTable: "ParcelLockers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Parcels_ParcelLockers_SourceLockerId",
                        column: x => x.SourceLockerId,
                        principalTable: "ParcelLockers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Parcels_Users_ReciverId",
                        column: x => x.ReciverId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Parcels_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "ParcelLockers",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("97808418-1ad7-4092-8f50-062ee13d4b4e"), "Warszawska" },
                    { new Guid("b366ff28-9316-4c1d-a480-43817ef9226e"), "Lodzka" },
                    { new Guid("d159e481-5737-4368-b18b-ea5ac8ae14a3"), "Krakowska" },
                    { new Guid("f113942e-d82b-4ac2-a5c1-35c5cff7053a"), "Sopocka" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "UserName" },
                values: new object[,]
                {
                    { new Guid("675bc66b-2f0f-426d-822c-e04c9ada8280"), "Ziemowit" },
                    { new Guid("7e58ea70-72da-4987-ab33-6827aa05ab38"), "Anna" },
                    { new Guid("c3f5ffa5-fc8a-4190-8521-8a75af4dea02"), "Jan" },
                    { new Guid("f4bb757e-d638-4b8c-bf8d-74ce9581ad15"), "Tomasz" }
                });

            migrationBuilder.InsertData(
                table: "Parcels",
                columns: new[] { "Id", "DestinationLockerId", "Name", "ReciverId", "SenderId", "SourceLockerId", "Weight" },
                values: new object[] { new Guid("32954d68-2ff6-4608-acaa-122760ab71c6"), new Guid("f113942e-d82b-4ac2-a5c1-35c5cff7053a"), "Duza paczka", new Guid("f4bb757e-d638-4b8c-bf8d-74ce9581ad15"), new Guid("c3f5ffa5-fc8a-4190-8521-8a75af4dea02"), new Guid("97808418-1ad7-4092-8f50-062ee13d4b4e"), 20 });

            migrationBuilder.InsertData(
                table: "Parcels",
                columns: new[] { "Id", "DestinationLockerId", "Name", "ReciverId", "SenderId", "SourceLockerId", "Weight" },
                values: new object[] { new Guid("84f4e618-8c77-4b51-bd04-8cf831f52073"), new Guid("d159e481-5737-4368-b18b-ea5ac8ae14a3"), "Mala paczka", new Guid("7e58ea70-72da-4987-ab33-6827aa05ab38"), new Guid("675bc66b-2f0f-426d-822c-e04c9ada8280"), new Guid("b366ff28-9316-4c1d-a480-43817ef9226e"), 5 });

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_DestinationLockerId",
                table: "Parcels",
                column: "DestinationLockerId");

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_ReciverId",
                table: "Parcels",
                column: "ReciverId");

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_SenderId",
                table: "Parcels",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_SourceLockerId",
                table: "Parcels",
                column: "SourceLockerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Parcels");

            migrationBuilder.DropTable(
                name: "ParcelLockers");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
