using back.Models;
using back.Models.Population;

namespace zad1.Algorithms.Selection
{
    public interface ISelection
    {
        Individual Evaluate(Population population);
    }
}