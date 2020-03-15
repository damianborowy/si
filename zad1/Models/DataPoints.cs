using System.Collections.Generic;

namespace back.Models
{
    public class DataPoints
    {
        private List<Point> Best { get; }
        private List<Point> Worst { get; }
        private List<Point> Average { get; }

        public DataPoints()
        {
            Best = new List<Point>();
            Worst = new List<Point>();
            Average = new List<Point>();
        }

        public DataPoints(List<Point> best, List<Point> worst, List<Point> average)
        {
            Best = best;
            Worst = worst;
            Average = average;
        }

        public void AddPoints(Population.Population population)
        {
            Best.Add(new Point(Best.Count, population.CalculateBestDistance()));
            Worst.Add(new Point(Worst.Count, population.CalculateWorstDistance()));
            Average.Add(new Point(Average.Count, population.CalculateAverageDistance()));
        }
    }
}