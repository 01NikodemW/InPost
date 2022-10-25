using APIInpost.Entities;
using APIInpost.models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

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

        public IEnumerable<ShortUserDto> GetAllUserByList()
        {
            var users = _dbContext.Users.ToList();
            var usersDtos = _mapper.Map<List<ShortUserDto>>(users);

            return usersDtos;
        }

        public ShortUserDto GetUserById(Guid id)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
            var userDto = _mapper.Map<ShortUserDto>(user);

            return userDto;
        }

        // public IEnumerable<NormalUserDto> GetAllUsers()
        // {
        //     var users = _dbContext.Users.Include(x => x.RecievedParcels).Include(x => x.SentParcels).ToList();
        //     var usersDto = _mapper.Map<List<NormalUserDto>>(users);
        //     return usersDto;
        // }
    }
}
