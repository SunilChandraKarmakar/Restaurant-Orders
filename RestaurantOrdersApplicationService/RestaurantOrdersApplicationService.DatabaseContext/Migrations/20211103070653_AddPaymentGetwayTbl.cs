using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantOrdersApplicationService.DatabaseContext.Migrations
{
    public partial class AddPaymentGetwayTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PaymentGetways",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentGetways", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PaymentGetways_Name",
                table: "PaymentGetways",
                column: "Name",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PaymentGetways");
        }
    }
}
