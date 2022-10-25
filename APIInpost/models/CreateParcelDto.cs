using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIInpost.models
{
    public class CreateParcelDto
    {
        public string Name { get; set; } = default!;

        public int Weight { get; set; }

        public Guid SourceLockerId { get; set; } 

        public Guid DestinationLockerId { get; set; }
        
        public Guid SenderId { get; set; } 

        public Guid ReciverId { get; set; }
    }
}