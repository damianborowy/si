using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualBasic;
using zad1.Models;

namespace zad1.Algorithms.Mutation
{
    public class InversionMutation : IMutation
    {
        public Individual Evaluate(Individual individual)
        {
            var newIndividual = new Individual(new List<Town>(individual.Towns));

            var rng = new Random();
            var firstIndex = rng.Next(0, newIndividual.Towns.Count);
            var secondIndex = rng.Next(0, newIndividual.Towns.Count);

            if (firstIndex > secondIndex)
            {
                var temp = firstIndex;
                firstIndex = secondIndex;
                secondIndex = temp;
            }

            var tempList = new List<Town>();

            for (var i = firstIndex; i <= secondIndex; i++) tempList.Add(newIndividual.Towns[i]);

            tempList.Reverse();

            for (var i = firstIndex; i <= secondIndex; i++) newIndividual.Towns[i] = tempList[i - firstIndex];

            return newIndividual;
        }
    }
}