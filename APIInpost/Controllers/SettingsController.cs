using APIInpost.models;
using Microsoft.AspNetCore.Mvc;

namespace APIInpost.Controllers
{
    public class SettingsController
    {
        private readonly IConfiguration _configuration;

        public SettingsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("auth")]
        public ActionResult<PublicAuthSettingsModel> GetPublicAuthSettings()
        {
            try
            {
                var dto =
                    new PublicAuthSettingsModel()
                    {
                        Audience =
                            _configuration.GetValue<string>("Auth:Audience"),
                        Domain = _configuration.GetValue<string>("Auth:Domain"),
                        ClientId =
                            _configuration.GetValue<string>("Auth:ClientId")
                    };
                return dto;
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
        }
    }
}
