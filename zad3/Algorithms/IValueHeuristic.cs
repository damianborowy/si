using zad3.Models;

namespace zad3.Algorithms
{
    public interface IValueHeuristic
    {
        bool IsBoardTerminal(Board board);
        int GetHeuristicValue(Board board, int depth, int player);
    }
}