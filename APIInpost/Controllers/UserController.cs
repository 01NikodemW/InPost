using APIInpost.Entities;
using APIInpost.Services;
using APIInpost.models;
using Microsoft.AspNetCore.Mvc;

namespace APIInpost.Controllers
{
    [Route("api/user")]
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
        public ActionResult<IEnumerable<UserDto>> GetAllUsersByList()
        {
            var users = _userService.GetAllUserByList();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public ActionResult<UserDto> GetUserById([FromRoute] Guid id)
        {
            var user = _userService.GetUserById(id);
            return Ok(user);
        }

        [HttpGet("{id}/parcels")]
        public ActionResult<UserDto> GetUsersParcel([FromRoute] Guid id)
        {
            var allParcels = _parcelService.GetUserParcels(id);

            return Ok(allParcels);
        }

        [HttpGet("{id}/parcels/sent")]
        public ActionResult<UserDto> GetParcelsUserSent([FromRoute] Guid id)
        {
            var sentParcels = _parcelService.GetParcelsUserSent(id);

            return Ok(sentParcels);
        }

        [HttpGet("{id}/parcels/get")]
        public ActionResult<UserDto> GetParcelsUserGet([FromRoute] Guid id)
        {
            var sentParcels = _parcelService.GetParcelsUserGet(id);

            return Ok(sentParcels);
        }
    }
}
