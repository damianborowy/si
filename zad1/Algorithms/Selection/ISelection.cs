using zad1.Models;

namespace zad1.Algorithms.Selection
{
    public interface ISelection
    {
        Individual Evaluate(Population population);
    }
}