using APIInpost.models;

namespace APIInpost.Services
{
    public interface IUserService
    {
        IEnumerable<UserDto> GetAllUserByList();
        UserDto GetUserById(Guid id);
    }
}