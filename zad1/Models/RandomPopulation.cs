namespace back.Models.Population
{
    public class RandomPopulation : Population
    {
        public RandomPopulation(int size, TSP tsp) : base(size, tsp)
        {
        }

        protected override void Initialize()
        {
            Individuals.ForEach(individual => individual.Shuffle());
        }
    }
}