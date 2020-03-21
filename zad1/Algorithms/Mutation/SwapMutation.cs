using System;
using zad1.Models;

namespace zad1.Algorithms.Mutation
{
    public class SwapMutation : IMutation
    {
        public Individual Evaluate(Individual individual)
        {
            var rng = new Random();

            var firstIndex = rng.Next(individual.Towns.Count);
            var secondIndex = rng.Next(individual.Towns.Count);

            var clone = (Individual) individual.Clone();

            var temp = clone.Towns[firstIndex];
            clone.Towns[firstIndex] = clone.Towns[secondIndex];
            clone.Towns[secondIndex] = temp;

            return clone;
        }
    }
}