using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Client.Migrations
{
    /// <inheritdoc />
    public partial class RemoveClientUserNavigation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enterprises_ClientUsers_ClientUserId",
                schema: "client",
                table: "Enterprises");

            migrationBuilder.DropIndex(
                name: "IX_Enterprises_ClientUserId",
                schema: "client",
                table: "Enterprises");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Enterprises_ClientUserId",
                schema: "client",
                table: "Enterprises",
                column: "ClientUserId",
                unique: true);

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
    }
}
