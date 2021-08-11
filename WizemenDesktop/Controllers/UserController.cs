using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Wizemen.NET.Clients;
using Wizemen.NET.Models;
using WizemenDesktop.Dtos;
using WizemenDesktop.Services;

namespace WizemenDesktop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private static WizemenClient _client;
        private readonly IFileService _fileService;
        private const string _credentialsPath = "user.auth.file";

        public UserController(IFileService fileService)
        {
            _fileService = fileService;
            var credentialsData = _fileService.GetData(_credentialsPath);
            if (string.IsNullOrWhiteSpace(credentialsData)) return;
            var credentials = JsonConvert.DeserializeObject<Credentials>(credentialsData);

            try
            {
                _client = WizemenClient.NewClientAsync(credentials).Result;
            }
            catch
            {
                Console.WriteLine("Invalid saved credentials");
                _fileService.DeleteData(_credentialsPath);
            }
        }

        [Route("start")]
        [HttpPost]
        public async Task<IActionResult> StartAsync(LoginDto loginDto)
        {
            if (_client != null) return Conflict(new {message = "Already Initialized!"});
            if (loginDto.Credentials == null) return Conflict(new {message = "No credentials provided"});
            
            try
            {
                _client = await WizemenClient.NewClientAsync(loginDto.Credentials);
            }
            catch
            {
                return Unauthorized();
            }

            if (loginDto.RememberMe)
            {
                _fileService.SaveData(_credentialsPath, JsonConvert.SerializeObject(loginDto.Credentials));
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

        [Route("masterAttendance")]
        [HttpGet]
        public async Task<IActionResult> GetMasterAttendanceAsync()
        {
            if (_client == null) return Unauthorized();

            var attendance = await _client.GetMasterAttendanceAsync();
            return Ok(attendance);
        }
    }
}