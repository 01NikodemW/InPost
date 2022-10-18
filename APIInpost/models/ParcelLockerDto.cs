using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIInpost.models
{
    public class ParcelLockerDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
    }
}