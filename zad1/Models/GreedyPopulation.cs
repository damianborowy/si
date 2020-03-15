using System;
using System.Collections.Generic;
using System.Linq;

namespace back.Models.Population
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
            var rng = new Random();
            var randomIndicesList = new List<int>(Size).Select(individual => rng.Next(Size)).ToList();

            Individuals = Individuals.AsParallel()
                .Select((individual, i) => individual.MakeGreedy(individual.Towns[randomIndicesList[i]])).ToList();
        }
    }
}