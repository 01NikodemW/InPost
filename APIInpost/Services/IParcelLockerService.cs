using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIInpost.models;

namespace APIInpost.Services
{
    public interface IParcelLockerService
    {
        IEnumerable<ParcelLockerDto> GetAllParcelLockersByList();

        Guid CreateParcelLocker(ParcelLockerDto dto);
    }
}
