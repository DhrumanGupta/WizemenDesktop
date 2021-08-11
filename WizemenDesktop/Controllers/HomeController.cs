using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wizemen.NET.Clients;
using Wizemen.NET.Models;

namespace WizemenDesktop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private static WizemenClient _client;

        public HomeController()
        {
            
        }

        [Route("start")]
        [HttpPost]
        public async Task<IActionResult> StartAsync(Credentials credentials)
        {
            if (_client != null) return Conflict(new {message = "Already Initialized!"});

            try
            {
                _client = await WizemenClient.NewClientAsync(credentials);
            }
            catch
            {
                return Unauthorized();
            }

            return Ok();
        }

        [Route("loggedIn")]
        [HttpGet]
        public IActionResult IsLoggedIn()
        {
            return Ok(_client != null);
        }

        [Route("meetings")]
        [HttpGet]
        public async Task<IActionResult> GetMeetingsAsync()
        {
            if (_client == null) return Unauthorized();
            
            var meetings = await _client.GetMeetingsAsync(MeetingType.Teams);
            meetings.AddRange(await _client.GetMeetingsAsync(MeetingType.Zoom));
            return Ok(meetings);
        }
    }
}