using System;
using System.Collections.Generic;

namespace zad1.Models
{
    public class Individual : ICloneable, IComparable
    {
        public List<Town> Towns { get; set; }

        private double? TotalDistance { get; set; }

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
            if (TotalDistance.HasValue) return TotalDistance.Value;

            var sum = Towns[0].CalculateDistance(Towns[^1]);

            for (var i = 0; i < Towns.Count - 1; i++)
                sum += Towns[i].CalculateDistance(Towns[i + 1]);

            TotalDistance = Math.Round(sum, 2);

            return TotalDistance.Value;
        }

        public object Clone()
        {
            return MemberwiseClone();
        }

        public int CompareTo(object? obj)
        {
            if (obj is Individual otherIndividual)
                return CalculateTotalDistance().CompareTo(otherIndividual.CalculateTotalDistance());
            return 1;
        }
    }
}