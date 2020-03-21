using System.Linq;

namespace zad1.Models
{
    public class RandomPopulation : Population
    {
        public RandomPopulation(int size, TSP tsp) : base(size, tsp)
        {
        }

        protected override void Initialize()
        {
            Individuals = Individuals.Select(individual => individual.Shuffle()).ToList();
        }
    }
}