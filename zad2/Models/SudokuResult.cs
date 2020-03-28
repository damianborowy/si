using System.Collections.Generic;

namespace zad2.Models
{
    public class SudokuResult
    {
        public IEnumerable<int> Board { get; set; }
        public double TotalExecutionTime { get; set; }
        public int SolutionsCount { get; set; }

        public SudokuResult(int solutionsCount, double totalExecutionTime, IEnumerable<int> board)
        {
            SolutionsCount = solutionsCount;
            TotalExecutionTime = totalExecutionTime;
            Board = board;
        }
    }
}