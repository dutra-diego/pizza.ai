using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Client.Migrations
{
    /// <inheritdoc />
    public partial class uniqueClientUserIdInEnterprise : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                schema: "client",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    Available = table.Column<bool>(type: "boolean", nullable: false),
                    EnterpriseId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Enterprises_EnterpriseId",
                        column: x => x.EnterpriseId,
                        principalSchema: "client",
                        principalTable: "Enterprises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Enterprises_ClientUserId",
                schema: "client",
                table: "Enterprises",
                column: "ClientUserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_EnterpriseId",
                schema: "client",
                table: "Products",
                column: "EnterpriseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enterprises_ClientUsers_ClientUserId",
                schema: "client",
                table: "Enterprises",
                column: "ClientUserId",
                principalSchema: "client",
                principalTable: "ClientUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enterprises_ClientUsers_ClientUserId",
                schema: "client",
                table: "Enterprises");

            migrationBuilder.DropTable(
                name: "Products",
                schema: "client");

            migrationBuilder.DropIndex(
                name: "IX_Enterprises_ClientUserId",
                schema: "client",
                table: "Enterprises");
        }
    }
}
