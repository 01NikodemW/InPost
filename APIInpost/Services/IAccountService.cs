using APIInpost.models;

namespace APIInpost.Services
{
    public interface IAccountService
    {
        Guid CreateNewUser(CreateUserDto name);
    }
}
