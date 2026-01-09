using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Client.Migrations
{
    /// <inheritdoc />
    public partial class flavorsorders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Flavors",
                schema: "client",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    ProductId = table.Column<Guid>(type: "uuid", nullable: false),
                    EnterpriseId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flavors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Flavors_Enterprises_EnterpriseId",
                        column: x => x.EnterpriseId,
                        principalSchema: "client",
                        principalTable: "Enterprises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Flavors_Products_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "client",
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                schema: "client",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    DeliveryAddress = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EnterpriseId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Enterprises_EnterpriseId",
                        column: x => x.EnterpriseId,
                        principalSchema: "client",
                        principalTable: "Enterprises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderProducts",
                schema: "client",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    OrderId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProductId = table.Column<Guid>(type: "uuid", nullable: false),
                    Size = table.Column<string>(type: "text", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderProducts_Orders_OrderId",
                        column: x => x.OrderId,
                        principalSchema: "client",
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "client",
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderProductFlavors",
                schema: "client",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    OrderProductId = table.Column<Guid>(type: "uuid", nullable: false),
                    FlavorId = table.Column<Guid>(type: "uuid", nullable: false),
                    SliceCount = table.Column<int>(type: "integer", nullable: false),
                    FlavorPriceAtTime = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProductFlavors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderProductFlavors_Flavors_FlavorId",
                        column: x => x.FlavorId,
                        principalSchema: "client",
                        principalTable: "Flavors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderProductFlavors_OrderProducts_OrderProductId",
                        column: x => x.OrderProductId,
                        principalSchema: "client",
                        principalTable: "OrderProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Flavors_EnterpriseId",
                schema: "client",
                table: "Flavors",
                column: "EnterpriseId");

            migrationBuilder.CreateIndex(
                name: "IX_Flavors_ProductId",
                schema: "client",
                table: "Flavors",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProductFlavors_FlavorId",
                schema: "client",
                table: "OrderProductFlavors",
                column: "FlavorId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProductFlavors_OrderProductId",
                schema: "client",
                table: "OrderProductFlavors",
                column: "OrderProductId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProducts_OrderId",
                schema: "client",
                table: "OrderProducts",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProducts_ProductId",
                schema: "client",
                table: "OrderProducts",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_EnterpriseId",
                schema: "client",
                table: "Orders",
                column: "EnterpriseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderProductFlavors",
                schema: "client");

            migrationBuilder.DropTable(
                name: "Flavors",
                schema: "client");

            migrationBuilder.DropTable(
                name: "OrderProducts",
                schema: "client");

            migrationBuilder.DropTable(
                name: "Orders",
                schema: "client");
        }
    }
}
