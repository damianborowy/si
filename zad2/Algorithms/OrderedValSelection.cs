using System;
using zad2.Models;
using System.Linq;

namespace zad2.Algorithms
{
    public class OrderedValSelection : IValueSelection
    {
        public Tuple<int, int> Evaluate(Field[,] board)
        {
            var bestX = -1;
            var bestY = -1;
            var best = int.MaxValue;
            for (var i = 0; i < 9; i++)
            {
                for (var j = 0; j < 9; j++)
                {
                    var order = CalculateOrder(board, i, j);
                    if (order == 0) continue;
                    if (order >= best) continue;

                    bestX = i;
                    bestY = j;
                    best = CalculateOrder(board, i, j);
                }
            }

            var tuple = new Tuple<int, int>(bestX, bestY);
            return tuple;
        }

        private static int CalculateOrder(Field[,] board, int x, int y) =>
            board[x, y].Value != 0 ? 0 : board[x, y].Restricted.Count(t => t == false);
    }
}