using System;
using System.Collections.Generic;

namespace back.Models
{
    public class Individual : ICloneable
    {
        public List<Town> Towns { get; private set; }

        public Individual(IEnumerable<Town> towns)
        {
            Towns = new List<Town>(towns);
        }

        public Individual Shuffle()
        {
            var rng = new Random();

            for (var i = Towns.Count - 1; i > 0; i--)
            {
                var j = rng.Next(i + 1);

                var temp = Towns[i];
                Towns[i] = Towns[j];
                Towns[j] = temp;
            }

            return this;
        }

        public Individual MakeGreedy(Town startingTown)
        {
            var visitedTowns = new HashSet<Town> {startingTown};
            var currentTown = startingTown;

            while (visitedTowns.Count < Towns.Count)
            {
                var minDistance = double.MaxValue;
                Town minTown = null;

                foreach (var town in Towns)
                {
                    if (visitedTowns.Contains(town)) continue;
                    var distance = currentTown.CalculateDistance(town);

                    if (distance < minDistance)
                    {
                        minDistance = distance;
                        minTown = town;
                    }
                }

                if (minTown is null) throw new Exception("Haven't found the closest town");

                visitedTowns.Add(minTown);
                currentTown = minTown;
            }

            Towns = new List<Town>(visitedTowns);
            return this;
        }

        public double CalculateTotalDistance()
        {
            double sum = 0;

            for (var i = 0; i < Towns.Count - 1; i++)
                sum += Towns[i].CalculateDistance(Towns[i + 1]);

            sum += Towns[0].CalculateDistance(Towns[^1]);

            return Math.Round(sum, 2);
        }

        public object Clone()
        {
            return MemberwiseClone();
        }
    }
}