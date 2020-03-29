using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using zad2.Models;

namespace zad2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SudokuController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> GetFiles()
        {
            return Csp.GetSudokuNames();
        }

        [HttpGet("{index:int}")]
        public SudokuResult GetTestSudoku(int index)
        {
            var csp = Csp.FromFile();
            var sudokuSolver = new SudokuSolver(csp.Sudokus[index]);
            var stopwatch = new Stopwatch();

            stopwatch.Start();
            var result = sudokuSolver.SolveSudoku();
            stopwatch.Stop();

            return result;
        }
    }
}