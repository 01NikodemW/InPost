using APIInpost.Entities;
using APIInpost.models;

namespace APIInpost.Services
{
    public interface IParcelService
    {
        IEnumerable<ParcelDto> GetAllParcels();

        ParcelDto GetParcelById(Guid id);

        IEnumerable<ParcelDto> GetUserParcels(Guid id);

        IEnumerable<ParcelDto> GetParcelsUserSent(Guid id);

        IEnumerable<ParcelDto> GetParcelsUserGet(Guid id);


        Guid CreateParcel(CreateParcelDto dto);
    }
}
