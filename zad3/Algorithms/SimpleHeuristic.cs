using System;
using System.Linq;
using zad3.Models;

namespace zad3.Algorithms
{
    public class SimpleHeuristic : IValueHeuristic
    {
        public bool IsBoardTerminal(Board board)
        {
            var winner = board.Winner;

            return winner == 1 || winner == 2 || board.IsFull;
        }

        public int GetHeuristicValue(Board board, int depth, int player)
        {
            var winner = board.Winner;

            if (winner == (player == 2 ? 1 : 2)) return depth;
            if (winner == (player == 2 ? 2 : 1)) return -depth;

            return board.IsFull ? 0 : int.MinValue;
        }
    }
}