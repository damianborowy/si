using System.Collections.Generic;
using System.Linq;

namespace zad1.Models
{
    public abstract class Population
    {
        public List<Individual> Individuals { get; set; }
        protected int Size { get; }
        private TSP Tsp { get; }

        protected Population(int size, TSP tsp)
        {
            Size = size;
            Tsp = tsp;

            Individuals = new List<Individual>();

            for (var i = 0; i < size; i++)
                Individuals.Add(new Individual(tsp.Towns));

            Initialize();
        }

        protected abstract void Initialize();

        public double CalculateBestDistance()
        {
            return Individuals.Select(individual => individual.CalculateTotalDistance()).Min();
        }

        public double CalculateAverageDistance()
        {
            return Individuals.Select(individual => individual.CalculateTotalDistance()).Average();
        }

        public double CalculateWorstDistance()
        {
            return Individuals.Select(individual => individual.CalculateTotalDistance()).Max();
        }
    }
}