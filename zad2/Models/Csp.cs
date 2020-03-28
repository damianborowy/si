using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace zad2.Models
{
    public class Csp
    {
        public List<Sudoku> Sudokus { get; set; }

        private Csp(IEnumerable<string> fileAsStrings)
        {
            Sudokus = fileAsStrings.Select(boardAsString => new Sudoku(boardAsString)).ToList();
        }

        public static Csp FromFile()
        {
            var fileAsStrings = File.ReadAllLines(Path.Combine(Environment.CurrentDirectory, "Sudoku.csv")).Skip(1)
                .ToList();

            return new Csp(fileAsStrings);
        }
    }
}