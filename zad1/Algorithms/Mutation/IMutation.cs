using zad1.Models;

namespace zad1.Algorithms.Mutation
{
    public interface IMutation
    {
        Individual Evaluate(Individual individual);
    }
}