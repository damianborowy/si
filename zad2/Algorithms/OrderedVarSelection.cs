using System;
using zad2.Models;

namespace zad2.Algorithms
{
    public class OrderedVarSelection : IVariableSelection
    {
        public Tuple<int, int> Evaluate(Field[,] board)
        {
            var result = new Tuple<int, int>(-1, -1);

            for (var i = 0; i < board.GetLength(0); i++)
            for (var j = 0; j < board.GetLength(1); j++)
                if (board[i, j].Value == 0)
                {
                    result = new Tuple<int, int>(i, j);
                    i = 10;
                    break;
                }

            return result;
        }
    }
}