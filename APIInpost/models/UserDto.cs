using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIInpost.models
{
    public class UserDto
    {
        public Guid Id { get; set; }

        public string UserName { get; set; } = default!;
    }
}