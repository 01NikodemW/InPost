using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIInpost.models
{
    public class ParcelDto
    {

        public Guid Id { get; set; }

        public string Name { get; set; } = default!;

        public int Weight { get; set; }

        public Guid SourceLockerId { get; set; } 

        public Guid DestinationLockerId { get; set; }
        
        public Guid SenderId { get; set; } 

        public Guid ReciverId { get; set; }

        public virtual UserDto Sender { get; set; }
        public virtual UserDto Reciver { get; set; }
        public virtual ParcelLockerDto SourceLocker { get; set; }
        public virtual ParcelLockerDto DestinationLocker { get; set; }

    
    }
}