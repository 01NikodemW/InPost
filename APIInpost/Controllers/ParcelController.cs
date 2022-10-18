using APIInpost.Entities;
using APIInpost.Services;
using Microsoft.AspNetCore.Mvc;

namespace APIInpost.Controllers
{
    [Route("api/parcel")]
    [ApiController]
    public class ParcelController : ControllerBase
    {
        private readonly IParcelService _parcelService;

        public ParcelController(IParcelService parcelService)
        {
            _parcelService = parcelService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Parcel>> GetAll()
        {
            var parcels = _parcelService.GetAllParcels();
            return Ok(parcels);
        }

        [HttpGet("{id}")]
        public ActionResult<Parcel> GetById([FromRoute] Guid id)
        {
            var parcel = _parcelService.GetParcelById(id);
            return Ok(parcel);
        }

        [HttpPost]
        public ActionResult<Guid> CreateParcel([FromBody] Parcel parcel)
        {
            var id = _parcelService.CreateNewParcel(parcel);

            return Created($"/api/parcel/{id}", null);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] Guid id)
        {
            _parcelService.DeleteParcel (id);

            return Ok();
        }
    }
}
