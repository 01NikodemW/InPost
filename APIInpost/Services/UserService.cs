using APIInpost.Entities;
using APIInpost.models;
using AutoMapper;

namespace APIInpost.Services
{
    public class UserService : IUserService
    {
        private readonly InpostDbContext _dbContext;

        public readonly IMapper _mapper;

        public UserService(InpostDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public IEnumerable<UserDto> GetAllUserByList()
        {
            var users = _dbContext.Users.ToList();
            var usersDtos = _mapper.Map<List<UserDto>>(users);

            return usersDtos;
        }

        public UserDto GetUserById(Guid id)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
            var userDto = _mapper.Map<UserDto>(user);

            return userDto;
        }
    }
}
