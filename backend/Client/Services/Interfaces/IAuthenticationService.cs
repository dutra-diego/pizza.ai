namespace Client.Services.Interfaces
{
    public interface IAuthenticationService
    {
        string GenerateToken(Guid userId, string email);
    }
}
