using APIInpost.Entities;
using APIInpost.models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace APIInpost.Services
{
    public class ParcelService : IParcelService
    {
        private readonly InpostDbContext _dbContext;
        public readonly IMapper _mapper;

        public ParcelService(InpostDbContext dbContext,IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public IEnumerable<ParcelDto> GetAllParcels()
        {
            
            var parcels = _dbContext.Parcels.Include(x => x.DestinationLocker).Include(x => x.SourceLocker).Include(x => x.Reciver).Include(x => x.Sender).ToList();
            var parcelsDtos = _mapper.Map<List<ParcelDto>>(parcels);
            return parcelsDtos;
        }

        public ParcelDto GetParcelById(Guid id)
        {
            var parcel = _dbContext.Parcels.ProjectTo<ParcelDto>(_mapper.ConfigurationProvider)
                .FirstOrDefault(x =>x.Id ==id);
            if(parcel is null){
                throw new NullReferenceException("Parcel not found");
            }

            var parcelDto = _mapper.Map<ParcelDto>(parcel);

            return parcelDto;
        }

        public Guid CreateNewParcel(Parcel parcel){

            if(parcel is null)
               throw new NullReferenceException("Passed parcel is null");

            if(parcel.Id != Guid.Empty)
                throw new ArgumentException("Passed parcel should not have id");

            _dbContext.Parcels.Add (parcel);
            _dbContext.SaveChanges();

            return parcel.Id;
        }

        public void DeleteParcel(Guid id)
        {
            var parcel = _dbContext.Parcels.FirstOrDefault(p => p.Id == id);
            if (parcel is null)
               throw new NullReferenceException("Parcel to delete found");

            _dbContext.Parcels.Remove(parcel);
            _dbContext.SaveChanges();
        }
    }
}
