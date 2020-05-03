using System;
using zad3.Models;

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
            return depth;
        }
    }
}