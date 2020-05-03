namespace zad3.Models
{
    public class Game
    {
        public int[][] Board { get; set; }
        public string Algorithm { get; set; }
        public int Depth { get; set; }
        public string Heuristic { get; set; }
        public int Player { get; set; }
    }
}