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

        [HttpPost("{index:int}")]
        public SudokuResult PostSudoku(int index, [FromBody] SudokuSettings settings)
        {
            var csp = Csp.FromFile(settings);
            var sudokuSolver = new SudokuSolver(csp.Sudokus[index], settings);

            var result = sudokuSolver.SolveSudoku();

            return result;
        }
    }
}