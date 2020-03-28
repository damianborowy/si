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
        [HttpGet("{index:int}")]
        public SudokuResult GetTestSudoku(int index)
        {
            var csp = Csp.FromFile();
            var sudoku = csp.Sudokus[index];
            var stopwatch = new Stopwatch();

            stopwatch.Start();
            sudoku.Solve();
            stopwatch.Stop();

            return new SudokuResult(
                1,
                stopwatch.ElapsedMilliseconds / 1000,
                sudoku.Board.Cast<int>().Select(elem => elem)
            );
        }
    }
}