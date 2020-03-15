using System;
using System.Collections.Generic;
using back.Models;
using back.Models.Population;

namespace zad1.Algorithms.Selection
{
    public class TournamentSelection : ISelection
    {
        public int N { get; }

        public TournamentSelection(int n)
        {
            N = n;
        }

        public Individual Evaluate(Population population)
        {
            var chosenIndividualIndices = new List<int>();
            var rng = new Random();

            for (var i = 0; i < N; i++)
                chosenIndividualIndices.Add(rng.Next(population.Individuals.Count));

            var chosenIndex = chosenIndividualIndices[0];
            var individual = population.Individuals[chosenIndex];
            var minDistance = individual.CalculateTotalDistance();

            foreach (var individualIndex in chosenIndividualIndices)
            {
                individual = population.Individuals[individualIndex];
                var distance = individual.CalculateTotalDistance();

                if (distance < minDistance)
                {
                    chosenIndex = individualIndex;
                    minDistance = distance;
                }
            }

            return (Individual) population.Individuals[chosenIndex].Clone();
        }
    }
}