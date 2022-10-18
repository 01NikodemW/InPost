using APIInpost.Entities;
using APIInpost.models;

namespace APIInpost.Services
{
    public interface IParcelService
    {
        IEnumerable<ParcelDto> GetAllParcels();

        ParcelDto GetParcelById(Guid id);

        Guid CreateNewParcel(Parcel parcel);

        void DeleteParcel(Guid id);
    }
}
