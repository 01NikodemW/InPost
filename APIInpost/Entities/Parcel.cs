using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIInpost.Enum;

namespace APIInpost.Entities
{
    public class Parcel
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = default!;

        public int Weight { get; set; }
        public DeliveryStatus DeliveryStatus { get; set; }

        public Guid SourceLockerId { get; set; } 

        public Guid DestinationLockerId { get; set; }
        
        public Guid SenderId { get; set; } 

        public Guid ReciverId { get; set; }

        public virtual User Sender { get; set; }
        public virtual User Reciver { get; set; }
        public virtual ParcelLocker SourceLocker { get; set; }
        public virtual ParcelLocker DestinationLocker { get; set; }


    }
}
