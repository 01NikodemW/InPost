using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIInpost.Services;
using APIInpost.models;
using Microsoft.AspNetCore.Mvc;

namespace APIInpost.Controllers
{
    [Route("parcellocker")]
    [ApiController]
    public class ParcelLockerController : ControllerBase
    {
        private readonly IParcelLockerService _parcelLockerService;

        public ParcelLockerController(IParcelLockerService parcelLockerService)
        {
            _parcelLockerService = parcelLockerService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ShortParcelLockerDto>>
        GetAllParcelLockersByList()
        {
            var parcelLockers =
                _parcelLockerService.GetAllParcelLockersByList();
            return Ok(parcelLockers);
        }

        [HttpPost]
        public ActionResult<ShortParcelLockerDto>
        CreateParcelLocker([FromBody] ShortParcelLockerDto dto)
        {
            var newParcelLockerId =
                _parcelLockerService.CreateParcelLocker(dto);

            return Created($"api/parcellocker/{newParcelLockerId}", null);
        }
    }
}
