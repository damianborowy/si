using System;

namespace back.Models
{
    public class Town
    {
        public int Index { get; }
        private float X { get; }
        private float Y { get; }
        private string EdgeWeightType { get; }

        public Town(int index, float x, float y, string edgeWeightType)
        {
            Index = index;
            X = x;
            Y = y;
            EdgeWeightType = edgeWeightType;
        }

        public float CalculateDistance(Town otherTown)
        {
            if (EdgeWeightType.Equals("EUC_2D")) return CalculateEuc2D(otherTown);
            if (EdgeWeightType.Equals("GEO")) return CalculateGeo(otherTown);
            throw new Exception("Invalid EdgeWeightType");
        }

        private float CalculateEuc2D(Town otherTown)
        {
            return (float) Math.Sqrt(Math.Pow(X - otherTown.X, 2) + Math.Pow(Y - otherTown.Y, 2));
        }

        private float CalculateGeo(Town otherTown)
        {
            var latitudeI = 2 * Math.PI * X / 180;
            var longitudeI = 2 * Math.PI * Y / 180;
            var latitudeJ = 2 * Math.PI * otherTown.X / 180;
            var longitudeJ = 2 * Math.PI * otherTown.Y / 180;

            var R = (float) 6378.388;
            var q1 = (float) Math.Cos(longitudeI - longitudeJ);
            var q2 = (float) Math.Cos(latitudeI - latitudeJ);
            var q3 = (float) Math.Cos(latitudeI + latitudeJ);

            return (float) (R * Math.Acos(0.5 * ((1.0 + q1) * q2 - (1.0 - q1) * q3)) + 1.0);

            // var deg = Math.Floor(X);
            // var min = X - deg;
            // var latitudeI = Math.PI * (deg + 5.0 * min / 3.0) / 180.0;
            //
            // deg = Math.Floor(Y);
            // min = Y - deg;
            // var longitudeI = Math.PI * (deg + 5.0 * min / 3.0) / 180.0;
            //
            // deg = Math.Floor(otherTown.X);
            // min = otherTown.X - deg;
            // var latitudeJ = Math.PI * (deg + 5.0 * min / 3.0) / 180.0;
            //
            // deg = Math.Floor(otherTown.Y);
            // min = otherTown.Y - deg;
            // var longitudeJ = Math.PI * (deg + 5.0 * min / 3.0) / 180.0;
            //
            // var RRR = 6378.388;
            // var q1 = Math.Cos(longitudeI - longitudeJ);
            // var q2 = Math.Cos(latitudeI - latitudeJ);
            // var q3 = Math.Cos(latitudeI + latitudeJ);
            // return Math.Round(
            //     RRR * Math.Acos(0.5 * ((1.0 + q1) * q2 - (1.0 - q1) * q3)) + 1.0);
        }
    }
}