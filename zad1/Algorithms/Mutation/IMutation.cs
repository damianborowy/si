using back.Models;

namespace zad1.Algorithms.Mutation
{
    public interface IMutation
    {
        Individual Evaluate(Individual individual);
    }
}