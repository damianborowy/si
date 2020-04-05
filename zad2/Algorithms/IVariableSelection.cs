using System;
using zad2.Models;

namespace zad2.Algorithms
{
    public interface IVariableSelection
    {
        Tuple<int, int> Evaluate(Field[,] board);
    }
}