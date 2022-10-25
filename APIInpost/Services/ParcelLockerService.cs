using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIInpost.Entities;
using APIInpost.models;
using AutoMapper;

namespace APIInpost.Services
{
    public class ParcelLockerService : IParcelLockerService
    {
        private readonly InpostDbContext _dbContext;

        public readonly IMapper _mapper;

        public ParcelLockerService(InpostDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public IEnumerable<ShortParcelLockerDto> GetAllParcelLockersByList()
        {
            var parcelLockers = _dbContext.ParcelLockers.ToList();
            var parcelLockersDtos =
                _mapper.Map<List<ShortParcelLockerDto>>(parcelLockers);

            return parcelLockersDtos;
        }

        public Guid CreateParcelLocker(ShortParcelLockerDto dto)
        {
            var parcelLocker = _mapper.Map<ParcelLocker>(dto);
            _dbContext.ParcelLockers.Add (parcelLocker);
            _dbContext.SaveChanges();
            return parcelLocker.Id;
        }
    }
}
