using System;
using System.Linq;
using zad1.Models;

namespace zad1.Algorithms.Selection
{
    public class RouletteSelection : ISelection
    {
        public Individual Evaluate(Population population)
        {
            var sumFitness =
                population.Individuals.Sum(individual => 1 / Math.Pow(individual.CalculateTotalDistance(), 10));

            var rng = new Random();
            var random = rng.NextDouble() * sumFitness;

            double sum = 0;
            Individual result = null;

            foreach (var individual in population.Individuals)
            {
                sum += 1 / Math.Pow(individual.CalculateTotalDistance(), 10);

                if (sum >= random) result = individual;
            }

            if (result is null) throw new Exception("Roulette selection algorithm couldn't find the proper individual");

            return result;
        }
    }
}