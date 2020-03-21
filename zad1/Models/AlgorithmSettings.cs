namespace zad1.Models
{
    public class AlgorithmSettings
    {
        public string Filename { get; set; }
        public string SelectionAlgorithm { get; set; }
        public string CrossingAlgorithm { get; set; }
        public string MutationAlgorithm { get; set; }
        public int Tour { get; set; }
        public int PopulationSize { get; set; }
        public int Generations { get; set; }
        public double Px { get; set; }
        public double Pm { get; set; }
    }
}