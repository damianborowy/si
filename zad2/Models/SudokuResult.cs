using System.Collections.Generic;

namespace zad2.Models
{
    public class SudokuResult
    {
        public IEnumerable<IEnumerable<int>> Boards { get; set; }
        public long FirstSolutionTime { get; set; }
        public long FirstNodesVisitedCount { get; set; }
        public long FirstRecurrencesCount { get; set; }
        public long TotalExecutionTime { get; set; }
        public long TotalRecurrencesCount { get; set; }
        public long TotalNodesVisitedCount { get; set; }
        public int SolutionsCount { get; set; }

        public SudokuResult()
        {
            TotalRecurrencesCount = 0;
            TotalNodesVisitedCount = 0;
        }
    }
}