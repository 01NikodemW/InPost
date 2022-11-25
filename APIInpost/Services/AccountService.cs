using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIInpost.Entities;
using APIInpost.models;
using AutoMapper;

namespace APIInpost.Services
{
    public class AccountService : IAccountService
    {
        private readonly InpostDbContext _dbContext;


        public readonly IMapper _mapper;

        public AccountService(InpostDbContext dbContext,IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public Guid CreateNewUser(CreateUserDto userDto)
        {
            var user = _dbContext.Users.FirstOrDefault(x =>x.UserName == userDto.UserName);
            if(user is null){
            var userToAdd = _mapper.Map<User>(userDto);
            _dbContext.Users.Add (userToAdd);
            _dbContext.SaveChanges();
                return userToAdd.Id;
            }
            
            return user.Id;
        }
    }
}
