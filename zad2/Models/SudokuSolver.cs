using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace zad2.Models
{
    public class SudokuSolver
    {
        private Sudoku FirstSudoku { get; set; }
        private List<Sudoku> Solutions { get; set; }
        private SudokuResult Result { get; set; }

        public SudokuSolver(Sudoku firstSudoku)
        {
            Result = new SudokuResult();
            FirstSudoku = firstSudoku;
            Solutions = new List<Sudoku>();
        }

        public SudokuResult SolveSudoku()
        {
            var timer = new Stopwatch();
            timer.Start();

            var head = new Node(new List<Node>(), null, FirstSudoku);

            var chosenField = FirstSudoku.ChooseField();
            var field = FirstSudoku.Board[chosenField.Item1, chosenField.Item2];
            for (var i = 0; i < field.Restricted.Length; i++)
            {
                if (field.Restricted[i]) continue;

                var newSudoku = new Sudoku(FirstSudoku.PureGrid());
                newSudoku.Board[chosenField.Item1, chosenField.Item2].Value = i;
                newSudoku.CalculateAllPossibilities();
                var newNode = new Node(new List<Node>(), head, newSudoku);
                head.Children.Add(newNode);
            }

            head.HasAllChildren = true;
            var current = head;
            // Result.TotalRecurrencesCount++;
            // Result.TotalNodesVisitedCount++;

            while (true)
            {
                if (!current.HasAllChildren)
                {
                    chosenField = current.Current.ChooseField();

                    if (chosenField.Item1 != -1)
                    {
                        field = current.Current.Board[chosenField.Item1, chosenField.Item2];

                        for (var i = 1; i < field.Restricted.Length; i++)
                        {
                            if (field.Restricted[i]) continue;

                            var newSudoku = new Sudoku(current.Current.PureGrid());
                            newSudoku.Board[chosenField.Item1, chosenField.Item2].Value = i;

                            newSudoku.CalculateAllPossibilities();
                            var newNode = new Node(new List<Node>(), current, newSudoku);
                            current.Children.Add(newNode);
                        }

                        current.HasAllChildren = true;
                    }
                }

                if (current.Current.IsSolved())
                {
                    if (Solutions.Count == 0)
                    {
                        Result.FirstSolutionTime = timer.ElapsedMilliseconds;
                        Result.FirstRecurrencesCount = Result.TotalRecurrencesCount;
                        Result.FirstNodesVisitedCount = Result.TotalNodesVisitedCount;
                    }

                    var shouldBeAdded = true;
                    foreach (var t in Solutions.Where(t => CheckIfIsTheSameSolution(t, current.Current)))
                        shouldBeAdded = false;

                    if (shouldBeAdded)
                    {
                        Solutions.Add(current.Current);
                    }

                    Result.TotalRecurrencesCount++;
                    // Result.TotalNodesVisitedCount++;
                    current = current.Parent;
                    current.Children.RemoveAt(0);
                }
                else if (current.HasAllChildren)
                {
                    if (current.Children.Count == 0)
                    {
                        Result.TotalRecurrencesCount++;
                        // Result.TotalNodesVisitedCount++;
                        current = current.Parent;
                        current.Children.RemoveAt(0);
                    }
                    else
                    {
                        Result.TotalNodesVisitedCount++;
                        current = current.Children[0];
                    }

                    if (!current.Equals(head) || current.Children.Count != 0) continue;

                    Result.SolutionsCount = Solutions.Count;
                    Result.TotalExecutionTime = timer.ElapsedMilliseconds;

                    Result.Boards = Solutions.Count > 0
                        ? Solutions.Select(sudoku => sudoku.Board.Cast<Field>().Select(elem => elem.Value))
                        : new[] {FirstSudoku.Board.Cast<Field>().Select(elem => elem.Value)};

                    return Result;
                }
            }
        }

        private static bool CheckIfIsTheSameSolution(Sudoku sudoku1, Sudoku sudoku2)
        {
            for (var i = 0; i < 9; i++)
            for (var j = 0; j < 9; j++)
                if (sudoku1.Board[i, j].Value != sudoku2.Board[i, j].Value)
                    return false;

            return true;
        }
    }
}