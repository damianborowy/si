using System;
using back.Models;

namespace zad1.Algorithms.Mutation
{
    public class SwapMutation : IMutation
    {
        public Individual Evaluate(Individual individual)
        {
            var rng = new Random();

            var firstindex = rng.Next(individual.Towns.Count);
            var secondIndex = rng.Next(individual.Towns.Count);

            var clone = (Individual) individual.Clone();

            var temp = clone.Towns[firstindex];
            clone.Towns[firstindex] = clone.Towns[secondIndex];
            clone.Towns[secondIndex] = temp;

            return clone;
        }
    }
}