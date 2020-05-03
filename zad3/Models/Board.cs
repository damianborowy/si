using System;
using System.Linq;
using System.Text;

namespace zad3.Models
{
    public class Board
    {
        public int[,] Fields { get; }

        private int Rows { get; }
        private int? _winner;
        private bool _changed;

        public int Columns { get; }

        public int? Winner
        {
            get
            {
                if (!_changed)
                    return _winner;

                _changed = false;
                for (var i = 0; i < Rows; i++)
                {
                    for (var j = 0; j < Columns; j++)
                    {
                        if (Fields[i, j] == 0) continue;

                        var horizontal = i + 3 < Rows;
                        var vertical = j + 3 < Columns;

                        if (!horizontal && !vertical) continue;

                        var forwardDiagonal = horizontal && vertical;
                        var backwardDiagonal = vertical && i - 3 >= 0;

                        for (var k = 1; k < 4; k++)
                        {
                            horizontal = horizontal && Fields[i, j] == Fields[i + k, j];
                            vertical = vertical && Fields[i, j] == Fields[i, j + k];
                            forwardDiagonal = forwardDiagonal && Fields[i, j] == Fields[i + k, j + k];
                            backwardDiagonal = backwardDiagonal && Fields[i, j] == Fields[i - k, j + k];

                            if (!horizontal && !vertical && !forwardDiagonal && !backwardDiagonal) break;
                        }

                        if (!horizontal && !vertical && !forwardDiagonal && !backwardDiagonal) continue;

                        _winner = Fields[i, j];
                        return _winner;
                    }
                }

                _winner = null;
                return _winner;
            }
        }

        public bool IsFull
        {
            get
            {
                for (var i = 0; i < Rows; i++)
                    if (Fields[i, 0] == 0)
                        return false;

                return true;
            }
        }

        private Board(int[,] fields)
        {
            Fields = fields;
            Rows = fields.GetLength(0);
            Columns = fields.GetLength(1);
        }

        public static Board FromJaggedArray(int[][] board)
        {
            return new Board(To2d(board));
        }

        private static T[,] To2d<T>(T[][] source)
        {
            try
            {
                var firstDim = source.Length;
                var secondDim = source.GroupBy(row => row.Length).Single().Key;

                var result = new T[firstDim, secondDim];

                for (var i = 0; i < firstDim; ++i)
                for (var j = 0; j < secondDim; ++j)
                    result[i, j] = source[i][j];

                return result;
            }
            catch (InvalidOperationException)
            {
                throw new InvalidOperationException("The given jagged array is not rectangular.");
            }
        }

        public bool DropCoin(int playerId, int column)
        {
            var row = 0;
            while (row < Rows && Fields[row, column] == 0) row++;

            if (row == 0) return false;

            Fields[row - 1, column] = playerId;
            _changed = true;
            return true;
        }

        public void RemoveTopCoin(int column)
        {
            var row = 0;
            while (row < Rows && Fields[row, column] == 0) row++;

            if (row == Rows) return;

            Fields[row, column] = 0;
            _changed = true;
        }
    }
}