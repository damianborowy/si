using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using zad2.Algorithms;

namespace zad2.Models
{
    public class Sudoku
    {
        public Field[,] Board { get; set; }
        private IVariableSelection VariableSelection { get; set; }
        private IValueSelection ValueSelection { get; set; }

        public Sudoku(int[,] board, IVariableSelection variableSelection, IValueSelection valueSelection)
        {
            Board = new Field[9, 9];
            VariableSelection = variableSelection;
            ValueSelection = valueSelection;

            for (var i = 0; i < 9; i++)
            for (var j = 0; j < 9; j++)
                Board[i, j] = new Field {Value = board[i, j]};

            CalculateAllPossibilities();
        }

        public void CalculateAllPossibilities()
        {
            for (var i = 0; i < 9; i++)
            for (var j = 0; j < 9; j++)
                CalculatePossibilities(i, j);
        }

        public int[,] PureGrid()
        {
            var gridVal = new int[9, 9];

            for (var i = 0; i < 9; i++)
            for (var j = 0; j < 9; j++)
                gridVal[i, j] = Board[i, j].Value;

            return gridVal;
        }

        public bool IsSolved()
        {
            for (var i = 0; i < 9; i++)
            for (var j = 0; j < 9; j++)
                if (Board[i, j].Value == 0)
                    return false;

            return true;
        }

        private void CalculatePossibilities(int x, int y)
        {
            for (var i = 0; i < 9; i++)
            {
                if (Board[i, y].Value != 0)
                    Board[x, y].Restricted[Board[i, y].Value] = true;

                if (Board[x, i].Value != 0)
                    Board[x, y].Restricted[Board[x, i].Value] = true;
            }

            var boxRowStart = x - x % 3;
            var boxColStart = y - y % 3;

            for (var r = boxRowStart; r < boxRowStart + 3; r++)
            for (var c = boxColStart; c < boxColStart + 3; c++)
                if (Board[r, c].Value != 0)
                    Board[x, y].Restricted[Board[r, c].Value] = true;
        }

        private int CalculateOrder(int x, int y) =>
            Board[x, y].Value != 0 ? 0 : Board[x, y].Restricted.Count(t => t == false);

        public Tuple<int, int> ChooseField()
        {
            var bestX = -1;
            var bestY = -1;
            var best = int.MaxValue;
            for (var i = 0; i < 9; i++)
            {
                for (var j = 0; j < 9; j++)
                {
                    var order = CalculateOrder(i, j);
                    if (order == 0) continue;
                    if (order >= best) continue;

                    bestX = i;
                    bestY = j;
                    best = CalculateOrder(i, j);
                }
            }

            var tuple = new Tuple<int, int>(bestX, bestY);
            return tuple;
        }
    }
}