using APIInpost.models;

namespace APIInpost.Services
{
    public interface IUserService
    {
        IEnumerable<ShortUserDto> GetAllUserByList();
        ShortUserDto GetUserById(Guid id);
        void DeleteUser(Guid userId);
    }
}