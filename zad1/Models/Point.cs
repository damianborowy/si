using System;

namespace zad1.Models
{
    public class Point : IComparable
    {
        public double X { get; }
        public double Y { get; set; }

        public Point(double x, double y)
        {
            X = x;
            Y = y;
        }

        public int CompareTo(object? obj)
        {
            if (obj is Point otherPoint)
                return Y.CompareTo(otherPoint.Y);
            return 1;
        }
    }
}