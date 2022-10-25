using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIInpost.models
{
    public class ShortUserDto
    {
        public Guid Id { get; set; }

        public string UserName { get; set; } = default!;
    }
}