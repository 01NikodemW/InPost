using APIInpost.Entities;
using APIInpost.models;
using AutoMapper;

namespace APIInpost
{
    public class ParcelMappingProfile : Profile
    {
        public ParcelMappingProfile()
        {
            // CreateMap<User, NormalUserDto>();
            CreateMap<ParcelLocker, ShortParcelLockerDto>();
            CreateMap<User, ShortUserDto>();
            CreateMap<ShortParcelLockerDto, ParcelLocker>();
            CreateMap<CreateParcelDto, Parcel>();
            CreateMap<Parcel, CreateParcelDto>();
            CreateMap<Parcel, ParcelDto>();
                // .ForMember(p => p.SenderName, p => p.MapFrom(p => p.Sender.UserName))
                // .ForMember(p => p.ReceiverName, p => p.MapFrom(p => p.Reciver.UserName))
                // .ForMember(p => p.SourceLockerName, p => p.MapFrom(p => p.SourceLocker.Name))
                // .ForMember(p => p.DestinationLockerName, p => p.MapFrom(p => p.DestinationLocker.Name));
        }
    }
}
