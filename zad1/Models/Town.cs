using System;

namespace zad1.Models
{
    public class Town
    {
        public int Index { get; }
        private double X { get; }
        private double Y { get; }
        private string EdgeWeightType { get; }

        public Town(int index, double x, double y, string edgeWeightType)
        {
            Index = index;
            X = x;
            Y = y;
            EdgeWeightType = edgeWeightType;
        }

        public double CalculateDistance(Town otherTown)
        {
            if (EdgeWeightType.Equals("EUC_2D")) return CalculateEuc2D(otherTown);
            if (EdgeWeightType.Equals("GEO")) return CalculateGeo(otherTown);
            throw new Exception("Invalid EdgeWeightType");
        }

        private double CalculateEuc2D(Town otherTown)
        {
            return Math.Sqrt(Math.Pow(X - otherTown.X, 2) + Math.Pow(Y - otherTown.Y, 2));
        }

        private double CalculateGeo(Town otherTown)
        {
            var latitudeI = 2 * Math.PI * X / 180;
            var longitudeI = 2 * Math.PI * Y / 180;
            var latitudeJ = 2 * Math.PI * otherTown.X / 180;
            var longitudeJ = 2 * Math.PI * otherTown.Y / 180;

            var R = 6378.388;
            var q1 = Math.Cos(longitudeI - longitudeJ);
            var q2 = Math.Cos(latitudeI - latitudeJ);
            var q3 = Math.Cos(latitudeI + latitudeJ);

            return R * Math.Acos(0.5 * ((1.0 + q1) * q2 - (1.0 - q1) * q3)) + 1.0;
        }
    }
}