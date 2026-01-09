namespace Client.DTOs.Enterprise
{
    public record EnterpriseResponseDto(
        string Name,
        string Address,
        int OrdersLast7Days,
        int OrdersLast14Days,
        int OrdersLast30Days,
        decimal TotalRevenueLast30Days
    );
}
