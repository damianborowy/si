using System;
using System.Collections.Generic;
using System.Linq;
using zad3.Models;

namespace zad3.Algorithms
{
    public class MinMaxSelection : IColumnSelection
    {
        private readonly Board _board;
        private readonly int _depth;
        private readonly IValueHeuristic _valueHeuristic;
        private readonly int _player;

        public MinMaxSelection(Board board, int depth, IValueHeuristic valueHeuristic, int player)
        {
            _board = board;
            _depth = depth;
            _valueHeuristic = valueHeuristic;
            _player = player;
        }

        private int MinMax(int depth, Board board, bool maximizingPlayer)
        {
            if (depth <= 0 || _valueHeuristic.IsBoardTerminal(board))
                return _valueHeuristic.GetHeuristicValue(board, depth, _player);

            var bestValue = maximizingPlayer ? -1 : 1;
            for (var i = 0; i < board.Columns; i++)
            {
                if (!board.DropCoin(maximizingPlayer ? 2 : 1, i)) continue;

                var value = MinMax(depth - 1, board, !maximizingPlayer);
                bestValue = maximizingPlayer ? Math.Max(bestValue, value) : Math.Min(bestValue, value);
                board.RemoveTopCoin(i);
            }

            return bestValue;
        }

        public int Evaluate()
        {
            var random = new Random();
            var moves = new List<Tuple<int, int>>();

            for (var i = 0; i < _board.Columns; i++)
            {
                if (!_board.DropCoin(2, i)) continue;

                moves.Add(Tuple.Create(i, MinMax(_depth, _board, _player == 1)));
                _board.RemoveTopCoin(i);
            }

            var maxMoveScore = moves.Max(t => t.Item2);
            var bestMoves = moves.Where(t => t.Item2 == maxMoveScore).ToList();
            return bestMoves[random.Next(0, bestMoves.Count)].Item1;
        }
    }
}