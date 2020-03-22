using System.Collections.Generic;

namespace zad1.Models
{
    public class DataPoints
    {
        public List<Point> Best { get; }
        public List<Point> Worst { get; }
        public List<Point> Average { get; set; }

        public DataPoints()
        {
            Best = new List<Point>();
            Worst = new List<Point>();
            Average = new List<Point>();
        }

        public void AddPoints(Population population)
        {
            Best.Add(new Point(Best.Count, population.CalculateBestDistance()));
            Worst.Add(new Point(Worst.Count, population.CalculateWorstDistance()));
            Average.Add(new Point(Average.Count, population.CalculateAverageDistance()));
        }
    }
}