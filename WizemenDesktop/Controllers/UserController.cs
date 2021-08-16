using System;
using System.Linq;
using System.Security.Authentication;
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

            try
            {
                var credentials = JsonConvert.DeserializeObject<Credentials>(credentialsData);
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

        [Route("classes")]
        [HttpGet]
        public async Task<IActionResult> GetClassesAsync()
        {
            if (_client == null) return Unauthorized();

            var classes = await _client.GetClassesAsync();
            return Ok(classes);
        }

        [Route("masterAttendance")]
        [HttpGet]
        public async Task<IActionResult> GetMasterAttendanceAsync()
        {
            if (_client == null) return Unauthorized();

            var attendance = await _client.GetMasterAttendanceAsync();
            
            return Ok(attendance);
        }

        [Route("schedule")]
        [HttpGet]
        public async Task<IActionResult> GetScheduleAsync()
        {
            if (_client == null) return Unauthorized();

            var schedule = await _client.GetClassScheduleAsync();
            return Ok(schedule);
        }

        [Route("classes/{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetClassDataAsync(int id)
        {
            var classes = await _client.GetClassesAsync();
            var classObj = classes.FirstOrDefault(x => x.Id == id) ?? await _client.GetClass(id);
            var teacherObj = await _client.GetClassTeacherAsync(id);
            var students = await _client.GetStudentsInClass(id);
            return Ok(new 
            {
                Class = classObj,
                Teacher = teacherObj,
                Students = students
            });
        }
    }
}