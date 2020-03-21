using System;
using System.Linq;
using zad1.Models;

namespace zad1.Algorithms.Crossing
{
    public class OrderedCrossover : ICrossing
    {
        public Individual Evaluate(Individual first, Individual second)
        {
            var rng = new Random();

            var firstIndex = rng.Next(first.Towns.Count);
            var secondIndex = rng.Next(second.Towns.Count);

            if (firstIndex > secondIndex)
            {
                var temp = firstIndex;
                firstIndex = secondIndex;
                secondIndex = temp;
            }

            var firstTowns = first.Towns.GetRange(firstIndex, secondIndex - firstIndex);
            var firstIndices = firstTowns.Select(town => town.Index).ToHashSet();
            var secondTowns = second.Towns.FindAll(town => !firstIndices.Contains(town.Index));

            var towns = secondTowns.Take(firstIndex).ToList();
            towns.AddRange(firstTowns);
            towns.AddRange(secondTowns.Skip(firstIndex));

            return new Individual(towns);
        }
    }
}