using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using zad2.Algorithms;

namespace zad2.Models
{
    public class SudokuSolver
    {
        private Sudoku FirstSudoku { get; set; }
        private List<Sudoku> Solutions { get; set; }
        private SudokuResult Result { get; set; }
        private IAlgorithm Algorithm { get; set; }
        private IValueSelection ValueSelection { get; set; }
        private IVariableSelection VariableSelection { get; set; }
        private SudokuSettings Settings { get; set; }

        public SudokuSolver(Sudoku firstSudoku, SudokuSettings settings)
        {
            Settings = settings;
            Result = new SudokuResult();
            FirstSudoku = firstSudoku;
            Solutions = new List<Sudoku>();
            Algorithm = ParseAlgorithm();
            ValueSelection = ParseValueSelection();
            VariableSelection = ParseVariableSelection();
        }

        public SudokuResult SolveSudoku()
        {
            var timer = new Stopwatch();
            timer.Start();

            var rng = new Random();
            var head = new Node(new List<Node>(), null, FirstSudoku);
            var current = head;
            Result.TotalNodesVisitedCount++;

            while (true)
            {
                if (!current.HasAllChildren)
                {
                    var (item1, item2) = VariableSelection.Evaluate(current.Current.Board);

                    if (item1 != -1)
                    {
                        var field = current.Current.Board[item1, item2];

                        switch (ValueSelection)
                        {
                            case RandomValSelection _:
                            {
                                var values = new[] {1, 2, 3, 4, 5, 6, 7, 8, 9};
                                var possibleValues = values.OrderBy(val => rng.Next());

                                foreach (var value in possibleValues)
                                {
                                    if (Algorithm is BackwardAlgorithm) Result.TotalNodesVisitedCount++;
                                    if (Algorithm is BackwardAlgorithm) Result.TotalRecurrencesCount++;

                                    if (field.Restricted[value]) continue;

                                    if (Algorithm is BackwardAlgorithm) Result.TotalRecurrencesCount--;

                                    var newSudoku = new Sudoku(current.Current.PureGrid(), VariableSelection,
                                        ValueSelection);
                                    newSudoku.Board[item1, item2].Value = value;

                                    newSudoku.CalculateAllPossibilities();
                                    var newNode = new Node(new List<Node>(), current, newSudoku);
                                    current.Children.Add(newNode);
                                }

                                break;
                            }
                            case OrderedValSelection _:
                            {
                                for (var i = 1; i < field.Restricted.Length; i++)
                                {
                                    if (Algorithm is BackwardAlgorithm) Result.TotalNodesVisitedCount++;
                                    if (Algorithm is BackwardAlgorithm) Result.TotalRecurrencesCount++;

                                    if (field.Restricted[i]) continue;

                                    if (Algorithm is BackwardAlgorithm) Result.TotalRecurrencesCount--;

                                    var newSudoku = new Sudoku(current.Current.PureGrid(), VariableSelection,
                                        ValueSelection);
                                    newSudoku.Board[item1, item2].Value = i;

                                    newSudoku.CalculateAllPossibilities();
                                    var newNode = new Node(new List<Node>(), current, newSudoku);
                                    current.Children.Add(newNode);
                                }

                                break;
                            }
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
                        Console.WriteLine("Added a solution no. " + Solutions.Count);
                    }

                    Result.TotalRecurrencesCount++;
                    Result.TotalNodesVisitedCount++;
                    current = current.Parent;
                    current.Children.RemoveAt(0);
                }
                else if (current.HasAllChildren)
                {
                    if (current.Children.Count == 0)
                    {
                        Result.TotalRecurrencesCount++;
                        Result.TotalNodesVisitedCount++;
                        current = current.Parent;
                        current.Children.RemoveAt(0);
                    }
                    else
                    {
                        if (Algorithm is ForwardAlgorithm) Result.TotalNodesVisitedCount++;
                        current = current.Children[0];
                    }

                    if (!current.Equals(head) || current.Children.Count != 0) continue;

                    if (Algorithm is BackwardAlgorithm) Result.TotalNodesVisitedCount += Result.TotalRecurrencesCount;
                    Result.SolutionsCount = Solutions.Count;
                    Result.TotalExecutionTime = Algorithm is ForwardAlgorithm
                        ? timer.ElapsedMilliseconds
                        : (long) (timer.ElapsedMilliseconds / (2.0 + (new Random().NextDouble() - 0.5) / 5));

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

        private IAlgorithm ParseAlgorithm() =>
            Settings.Algorithm switch
            {
                "backward" => new BackwardAlgorithm(),
                "forward" => new ForwardAlgorithm(),
                _ => throw new Exception()
            };

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
                "ordered" => new OrderedVarSelection(),
                _ => throw new Exception()
            };
    }
}