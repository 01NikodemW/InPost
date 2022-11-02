using APIInpost.Entities;
using APIInpost.Services;
using APIInpost.models;
using Microsoft.AspNetCore.Mvc;

namespace APIInpost.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        private readonly IParcelService _parcelService;

        public UserController(
            IUserService userService,
            IParcelService parcelService
        )
        {
            _userService = userService;
            _parcelService = parcelService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ShortUserDto>> GetAllUsersByList()
        {
            var users = _userService.GetAllUserByList();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public ActionResult<ShortUserDto> GetUserById([FromRoute] Guid id)
        {
            var user = _userService.GetUserById(id);
            return Ok(user);
        }

        [HttpGet("{id}/parcels")]
        public ActionResult<IEnumerable<ParcelDto>>
        GetUsersParcels([FromRoute] Guid id)
        {
            var allParcels = _parcelService.GetUserParcels(id);

            return Ok(allParcels);
        }

        [HttpPut("{receiverId}/parcels/{parcelId}")]
        public ActionResult<Guid>
        CollectParcel([FromRoute] Guid receiverId, [FromRoute] Guid parcelId)
        {
            _parcelService.ReceiveParcel (receiverId, parcelId);

            return Ok();
        }

        [HttpGet("{id}/parcels/sent")]
        public ActionResult<IEnumerable<ParcelDto>>
        GetParcelsUserSent([FromRoute] Guid id)
        {
            var sentParcels = _parcelService.GetParcelsUserSent(id);

            return Ok(sentParcels);
        }

        [HttpGet("{id}/parcels/get")]
        public ActionResult<IEnumerable<ParcelDto>>
        GetParcelsUserGet([FromRoute] Guid id)
        {
            var sentParcels = _parcelService.GetParcelsUserGet(id);

            return Ok(sentParcels);
        }
    }
}
