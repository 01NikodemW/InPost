using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIInpost.Entities
{
    public class ParcelLocker
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public virtual IEnumerable<Parcel> ParcelsToPickup { get; set; }
        public virtual IEnumerable<Parcel> ParcelsToSend { get; set; }
    }
}