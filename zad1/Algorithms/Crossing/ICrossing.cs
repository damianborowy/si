using zad1.Models;

namespace zad1.Algorithms.Crossing
{
    public interface ICrossing
    {
        Individual Evaluate(Individual first, Individual second);
    }
}