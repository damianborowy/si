using System;
using System.IO;
using System.Linq;

namespace zad2.Models
{
    public class Sudoku
    {
        public int[,] Board { get; }

        private const int BoardSize = 9;

        public Sudoku(string boardAsString)
        {
            Board = new int[BoardSize, BoardSize];
            var splitBoard = boardAsString.Split(";");
            var boardValues = splitBoard[2];

            var counter = 0;
            for (var i = 0; i < BoardSize; i++)
            {
                for (var j = 0; j < BoardSize; j++)
                {
                    Board[i, j] = (int) char.GetNumericValue(boardValues[counter]);

                    if (Board[i, j] == -1) Board[i, j] = 0;

                    counter++;
                }
            }
        }

        public bool Solve()
        {
            var row = -1;
            var col = -1;
            var isEmpty = true;
            for (var i = 0; i < BoardSize; i++)
            {
                for (var j = 0; j < BoardSize; j++)
                {
                    if (Board[i, j] != 0) continue;

                    row = i;
                    col = j;

                    isEmpty = false;
                    break;
                }

                if (!isEmpty)
                    break;
            }

            if (isEmpty) return true;

            for (var num = 1; num <= BoardSize; num++)
            {
                if (!IsSafe(row, col, num)) continue;

                Board[row, col] = num;

                if (Solve()) return true;

                Board[row, col] = 0;
            }

            return false;
        }

        private bool IsSafe(int row, int col, int num) =>
            CheckRow(row, num) && CheckColumn(col, num) && CheckSubGrid(row, col, num);

        private bool CheckRow(int row, int num)
        {
            for (var d = 0; d < Board.GetLength(0); d++)
                if (Board[row, d] == num)
                    return false;

            return true;
        }

        private bool CheckColumn(int col, int num)
        {
            for (var r = 0; r < Board.GetLength(0); r++)
                if (Board[r, col] == num)
                    return false;

            return true;
        }

        private bool CheckSubGrid(int row, int col, int num)
        {
            var boxRowStart = row - row % 3;
            var boxColStart = col - col % 3;

            for (var r = boxRowStart; r < boxRowStart + 3; r++)
            for (var c = boxColStart; c < boxColStart + 3; c++)
                if (Board[r, c] == num)
                    return false;

            return true;
        }
    }
}