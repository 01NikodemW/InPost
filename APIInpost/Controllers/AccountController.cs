using APIInpost.models;
using APIInpost.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APIInpost.Controllers
{
    [ApiController]
    [Route("account")]
    public class AccountController : ControllerBase
    {
  
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        public ActionResult<Guid> GetLoggedInUserId([FromBody] CreateUserDto userDto)
        {
           var guid = _accountService.CreateNewUser(userDto);
           return guid;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Test()
        {
            return Ok();
        }
    }
}
