using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using zad1.Models;

namespace zad1.Controllers
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
        public IEnumerable<string> GetFiles()
        {
            return Files;
        }

        [HttpPost]
        public DataPoints CalculateDataPoints([FromBody] AlgorithmSettings settings)
        {
            var tsp = TSP.FromFile(settings.Filename);

            return tsp.SolveTsp(settings);
        }
    }
}