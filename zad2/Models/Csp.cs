using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using zad2.Algorithms;

namespace zad2.Models
{
    public class Csp
    {
        public List<Sudoku> Sudokus { get; set; }
        private SudokuSettings Settings { get; set; }

        private Csp(IEnumerable<string> fileAsStrings, SudokuSettings settings)
        {
            Settings = settings;
            Sudokus = fileAsStrings.Select(boardAsString =>
            {
                var board = new int[9, 9];
                var unparsedBoard = boardAsString.Split(";")[2];

                var counter = 0;
                for (var i = 0; i < 9; i++)
                for (var j = 0; j < 9; j++)
                {
                    board[i, j] = (int) char.GetNumericValue(unparsedBoard[counter]);
                    if (board[i, j] == -1)
                    {
                        board[i, j] = 0;
                    }

                    counter++;
                }

                return new Sudoku(board, ParseVariableSelection(), ParseValueSelection());
            }).ToList();
        }

        public static Csp FromFile(SudokuSettings settings)
        {
            var fileAsStrings = File.ReadAllLines(Path.Combine(Environment.CurrentDirectory, "Sudoku.csv")).Skip(1)
                .ToList();

            return new Csp(fileAsStrings, settings);
        }

        public static IEnumerable<string> GetSudokuNames() =>
            File.ReadAllLines(Path.Combine(Environment.CurrentDirectory, "Sudoku.csv")).Skip(1)
                .Select(
                    file =>
                    {
                        var splitFile = file.Split(";");

                        return splitFile[0] + " (difficulty: " + splitFile[1] + ")";
                    });

        private IValueSelection ParseValueSelection() =>
            Settings.ValueSelection switch
            {
                "ordered" => new OrderedValSelection(),
                "random" => new RandomValSelection(),
                _ => throw new Exception()
            };

        private IVariableSelection ParseVariableSelection() =>
            Settings.VariableSelection switch
            {
                "mostConstrained" => new MostConstrainedSelection(),
                "random" => new RandomVarSelection(),
                _ => throw new Exception()
            };
    }
}