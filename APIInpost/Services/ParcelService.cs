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

            return parcel;
        }

        public IEnumerable<ParcelDto> GetUserParcels(Guid id)
        {
            var parcels = _dbContext.Parcels.Include(x => x.DestinationLocker).Include(x => x.SourceLocker).Include(x => x.Reciver).Include(x => x.Sender).ToList();
            var userParcels = parcels.Where(x=> x.ReciverId == id || x.SenderId ==id );
            var userParcelsDtos = _mapper.Map<List<ParcelDto>>(userParcels);

            return userParcelsDtos;
        }

        public IEnumerable<ParcelDto> GetParcelsUserSent(Guid id)
        {
            var parcels = _dbContext.Parcels.Include(x => x.DestinationLocker).Include(x => x.SourceLocker).Include(x => x.Reciver).Include(x => x.Sender).ToList();
            var userParcels = parcels.Where(x=> x.SenderId ==id );
            var userParcelsDtos = _mapper.Map<List<ParcelDto>>(userParcels);

            return userParcelsDtos;
        }

        public IEnumerable<ParcelDto> GetParcelsUserGet(Guid id)
        {
            var parcels = _dbContext.Parcels.Include(x => x.DestinationLocker).Include(x => x.SourceLocker).Include(x => x.Reciver).Include(x => x.Sender).ToList();
            var userParcels = parcels.Where(x=> x.ReciverId ==id );
            var userParcelsDtos = _mapper.Map<List<ParcelDto>>(userParcels);

            return userParcelsDtos;
        }

        // public void DeleteParcel(Guid id)
        // {
        //     var parcel = _dbContext.Parcels.FirstOrDefault(p => p.Id == id);
        //     if (parcel is null)
        //        throw new NullReferenceException("Parcel to delete found");

        //     _dbContext.Parcels.Remove(parcel);
        //     _dbContext.SaveChanges();
        // }

        public Guid CreateParcel(CreateParcelDto dto)
        {
            check(dto.SenderId,dto.ReciverId,dto.SourceLockerId,dto.DestinationLockerId);
            var parcel = _mapper.Map<Parcel>(dto);
            _dbContext.Parcels.Add (parcel);
            _dbContext.SaveChanges();
            return parcel.Id;
        }

        private void check(Guid senderId, Guid receiverId, Guid sourceLockerId, Guid destinationLockerId){
            if(_dbContext.Users.FirstOrDefault(x => x.Id == senderId) is null){
                throw new NullReferenceException("Sender not found");
            }
            if(_dbContext.Users.FirstOrDefault(x => x.Id == receiverId) is null){
                throw new NullReferenceException("Receiver not found");
            }
            if(_dbContext.ParcelLockers.FirstOrDefault(x => x.Id == sourceLockerId) is null){
                throw new NullReferenceException("Source Locker not found");
            }
            if(_dbContext.ParcelLockers.FirstOrDefault(x => x.Id == destinationLockerId) is null){
                throw new NullReferenceException("Destination Locker not found");
            }

            if(sourceLockerId.Equals(destinationLockerId)){
                throw new ArgumentException("Source Locker and Destination Locker cannot be the same");
            }
        }




    }
}
