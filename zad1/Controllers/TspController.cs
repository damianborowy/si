using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TspController : ControllerBase
    {
        private static readonly string[] Files =
        {
            "berlin11_modified",
            "berlin52",
            "kroA100",
            "kroA150",
            "kroA200",
            "fl417",
            "ali535",
            "gr666",
            "nrw1379",
            "pr2392"
        };

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return Files;
        }

        [HttpPost]
        public IEnumerable<string> CalculateDataPoints()
        {
            return new[] {"lala", "lele"};
        }
    }
}