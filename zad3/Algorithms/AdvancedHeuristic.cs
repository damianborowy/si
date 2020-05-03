using zad3.Models;
using System.Linq;

namespace zad3.Algorithms
{
    public class AdvancedHeuristic : IValueHeuristic
    {
        public bool IsBoardTerminal(Board board)
        {
            var winner = board.Winner;

            return winner == 1 || winner == 2 || board.IsFull;
        }

        public int GetHeuristicValue(Board board, int depth, int player)
        {
            var winner = board.Winner;

            if (!IsBoardTerminal(board)) return ScorePosition(board, player);

            if (winner == (player == 2 ? 1 : 2)) return int.MaxValue;
            return winner == (player == 2 ? 2 : 1) ? int.MinValue : 0;
        }

        private static int ScorePosition(Board board, int player)
        {
            var score = 0;

            var centerArray = GetColumn(board.Fields, board.Columns / 2);
            var centerCount = centerArray.Count(num => num == player);
            score += centerCount * 3;

            score += ScoreHorizontal(board.Fields, player);
            score += ScoreVertical(board.Fields, player);
            score += ScoreDiagonals(board.Fields, player);

            return score;
        }

        private static int ScoreHorizontal(int[,] board, int player)
        {
            var score = 0;

            for (var row = 0; row < 6; row++)
            {
                var rowArray = GetRow(board, row);

                for (var col = 0; col < 4; col++)
                {
                    var window = rowArray[col..(col + 4)];
                    score += EvaluateWindow(window, player);
                }
            }

            return score;
        }

        private static int ScoreVertical(int[,] board, int player)
        {
            var score = 0;

            for (var col = 0; col < 7; col++)
            {
                var colArray = GetColumn(board, col);

                for (var row = 0; row < 3; row++)
                {
                    var window = colArray[row..(row + 4)];
                    score += EvaluateWindow(window, player);
                }
            }

            return score;
        }

        private static int ScoreDiagonals(int[,] board, int player)
        {
            var score = 0;

            for (var row = 0; row < 3; row++)
            {
                for (var col = 0; col < 4; col++)
                {
                    var window1 = new int[4];
                    var window2 = new int[4];

                    for (var i = 0; i < 4; i++)
                    {
                        window1[i] = board[row + i, col + i];
                        window2[i] = board[row + 3 - i, col + i];
                    }

                    score += EvaluateWindow(window1, player) + EvaluateWindow(window2, player);
                }
            }

            return score;
        }

        private static int EvaluateWindow(int[] window, int player)
        {
            var score = 0;
            var opponent = player == 2 ? 1 : 2;

            var playerCount = window.Count(num => num == player);
            var opponentCount = window.Count(num => num == opponent);
            var emptyCount = window.Count(num => num == 0);

            if (playerCount == 4) score += 100;
            else if (playerCount == 3 && emptyCount == 1) score += 5;
            else if (playerCount == 2 && emptyCount == 2) score += 2;
            else if (opponentCount == 3 && emptyCount == 1) score -= 4;

            return score;
        }

        private static T[] GetColumn<T>(T[,] array, int col)
        {
            return Enumerable.Range(0, array.GetLength(0))
                .Select(x => array[x, col])
                .ToArray();
        }

        private static T[] GetRow<T>(T[,] array, int row)
        {
            return Enumerable.Range(0, array.GetLength(1))
                .Select(x => array[row, x])
                .ToArray();
        }
    }
}