using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIInpost.Entities
{
    public class User
    {
        public Guid Id { get; set; }

        public string UserName { get; set; } = default!;

        public virtual IEnumerable<Parcel> SentParcels { get; set; }
        public virtual IEnumerable<Parcel> RecievedParcels { get; set; }
    }
}
