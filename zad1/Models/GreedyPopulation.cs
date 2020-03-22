using System;
using System.Collections.Generic;
using System.Linq;

namespace zad1.Models
{
    public class GreedyPopulation : Population
    {
        public GreedyPopulation(TSP tsp) : base(tsp.Towns.Count, tsp)
        {
        }

        public GreedyPopulation(int size, TSP tsp) : base(size, tsp)
        {
        }

        protected override void Initialize()
        {
            if (Size == Tsp.Towns.Count) InitializeBest();
            else InitializeRandom();
        }

        private void InitializeRandom()
        {
            var rng = new Random();
            var randomIndicesList = Enumerable.Repeat(0, Size).Select(index => rng.Next(Individuals[0].Towns.Count))
                .ToList();

            Individuals = Individuals.AsParallel()
                .Select((individual, i) => individual.MakeGreedy(individual.Towns[randomIndicesList[i]])).ToList();
        }

        private void InitializeBest()
        {
            Individuals = Individuals.AsParallel()
                .Select((individual, i) => individual.MakeGreedy(individual.Towns[i])).ToList();
        }
    }
}