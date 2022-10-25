using APIInpost.Entities;
using APIInpost.models;
using AutoMapper;

namespace APIInpost
{
    public class ParcelMappingProfile : Profile
    {
        public ParcelMappingProfile()
        {
            CreateMap<Parcel, ParcelDto>();
            CreateMap<ParcelLocker, ParcelLockerDto>();
            CreateMap<User, UserDto>();
            CreateMap<ParcelLockerDto, ParcelLocker>();
            CreateMap<CreateParcelDto, Parcel>();
            CreateMap<Parcel, CreateParcelDto>();
        }
    }
}
