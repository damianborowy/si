namespace back.Models
{
    public class AlgorithmSettings
    {
        public string Filename { get; }
        public string SelectionAlgorithm { get; }
        public string CrossingAlgorithm { get; }
        public string MutationAlgorithm { get; }
        public int Tour { get; }
        public int PopulationSize { get; }
        public int Generations { get; }
        public double Px { get; }
        public double Pm { get; }
    }
}