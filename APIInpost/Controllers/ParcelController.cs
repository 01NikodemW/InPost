using APIInpost.Entities;
using APIInpost.Services;
using APIInpost.models;
using Microsoft.AspNetCore.Mvc;

namespace APIInpost.Controllers
{
    [Route("parcel")]
    [ApiController]
    public class ParcelController : ControllerBase
    {
        private readonly IParcelService _parcelService;

        public ParcelController(IParcelService parcelService)
        {
            _parcelService = parcelService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ParcelDto>> GetAll()
        {
            var parcels = _parcelService.GetAllParcels();
            return Ok(parcels);
        }

        [HttpGet("{id}")]
        public ActionResult<ParcelDto> GetById([FromRoute] Guid id)
        {
            var parcel = _parcelService.GetParcelById(id);
            return Ok(parcel);
        }

        [HttpDelete("{id}")]
        public ActionResult<ParcelDto> DeleteParcel([FromRoute] Guid id)
        {
            _parcelService.DeleteParcel (id);
            return Ok();
        }

        [HttpPost]
        public ActionResult<Guid>
        CreateParcel([FromBody] CreateParcelDto parceldto)
        {
            var parcelId = _parcelService.CreateParcel(parceldto);

            return Created($"/api/parcel/{parcelId}", null);
        }
    }
}
