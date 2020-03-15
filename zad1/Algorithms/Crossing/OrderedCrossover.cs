using System;
using System.Linq;
using back.Models;

namespace zad1.Algorithms.Crossing
{
    public class OrderedCrossover : ICrossing
    {
        public Individual Evaluate(Individual first, Individual second)
        {
            var rng = new Random();

            var firstindex = rng.Next(first.Towns.Count);
            var secondIndex = rng.Next(second.Towns.Count);

            if (firstindex > secondIndex)
            {
                var temp = firstindex;
                firstindex = secondIndex;
                secondIndex = temp;
            }

            var firstTowns = first.Towns.GetRange(firstindex, secondIndex - firstindex);
            var firstIndices = firstTowns.Select(town => town.Index).ToHashSet();
            var secondTowns = second.Towns.FindAll(town => !firstIndices.Contains(town.Index));

            var towns = secondTowns.Take(firstindex).ToList();
            towns.AddRange(firstTowns);
            towns.AddRange(secondTowns.Skip(firstindex));

            return new Individual(towns);
        }
    }
}