using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using back.Models.Population;
using zad1.Algorithms.Crossing;
using zad1.Algorithms.Mutation;
using zad1.Algorithms.Selection;

namespace back.Models
{
    public class TSP
    {
        public List<Town> Towns { get; }
        private string Name { get; }
        private string Type { get; }
        private string Comment { get; }
        private int Dimension { get; }
        private string EdgeWeightType { get; }
        private string DisplayDataType { get; }

        private readonly Random _rng = new Random();

        private TSP(string name, string type, string comment, int dimension, string edgeWeightType,
            string displayDataType, List<Town> towns)
        {
            Name = name;
            Type = type;
            Comment = comment;
            Dimension = dimension;
            EdgeWeightType = edgeWeightType;
            DisplayDataType = displayDataType;
            Towns = towns;
        }

        public static TSP FromFile(string filename)
        {
            var fileAsStrings = File.ReadAllLines(Path.Combine(Environment.CurrentDirectory, "tsp", filename + ".tsp"));

            var dimension = int.Parse(fileAsStrings[3].Split(": ")[1]);
            var edgeWeightType = fileAsStrings[4].Split(": ")[1];

            return new TSP(
                fileAsStrings[0].Split(": ")[1],
                fileAsStrings[1].Split(": ")[1],
                fileAsStrings[3].Split(": ")[1],
                dimension,
                edgeWeightType,
                fileAsStrings[5].Split(": ")[1],
                CreateTowns(fileAsStrings, edgeWeightType)
            );
        }

        public DataPoints SolveTsp(AlgorithmSettings settings)
        {
            var dataPoints = new DataPoints();
            Population.Population population = new RandomPopulation(settings.PopulationSize, this);
            dataPoints.AddPoints(population);

            for (var i = 1; i < settings.Generations; i++)
            {
                var selectedPopulation = Select(population, settings);
                var crossedPopulation = Cross(selectedPopulation, settings);
                var mutatedPopulation = Mutate(crossedPopulation, settings);

                population = mutatedPopulation;
                dataPoints.AddPoints(population);
            }

            Console.WriteLine(dataPoints.Best.Count);
            return dataPoints;
        }

        private GeneticPopulation Select(Population.Population population, AlgorithmSettings settings)
        {
            var selectionAlgorithm = ParseSelectionAlgorithm(settings);

            return new GeneticPopulation
            {
                Individuals = population.Individuals.AsParallel()
                    .Select(individual => selectionAlgorithm.Evaluate(population)).ToList()
            };
        }

        private GeneticPopulation Cross(Population.Population selectedPopulation, AlgorithmSettings settings)
        {
            var crossingAlgorithm = ParseCrossingAlgorithm(settings);
            double randomDouble;
            int randomInt;

            return new GeneticPopulation
            {
                Individuals = selectedPopulation.Individuals.AsParallel().Select(individual =>
                {
                    lock (_rng)
                    {
                        randomDouble = _rng.NextDouble();
                        randomInt = _rng.Next(selectedPopulation.Individuals.Count);
                    }

                    return randomDouble > settings.Px
                        ? individual
                        : crossingAlgorithm.Evaluate(individual, selectedPopulation.Individuals[randomInt]);
                }).ToList()
            };
        }

        private GeneticPopulation Mutate(Population.Population crossedPopulation, AlgorithmSettings settings)
        {
            var mutationAlgorithm = ParseMutationAlgorithm(settings);
            double randomDouble;

            return new GeneticPopulation
            {
                Individuals = crossedPopulation.Individuals.AsParallel().Select(individual =>
                    {
                        lock (_rng)
                            randomDouble = _rng.NextDouble();

                        return randomDouble < settings.Pm ? mutationAlgorithm.Evaluate(individual) : individual;
                    }
                ).ToList()
            };
        }

        private ISelection ParseSelectionAlgorithm(AlgorithmSettings settings)
        {
            return settings.SelectionAlgorithm switch
            {
                "Tournament" => new TournamentSelection(settings.Tour),
                _ => throw new Exception("Incorrect selection algorithm name")
            };
        }

        private ICrossing ParseCrossingAlgorithm(AlgorithmSettings settings)
        {
            return settings.CrossingAlgorithm switch
            {
                "Ordered" => new OrderedCrossover(),
                _ => throw new Exception("Incorrect crossing algorithm name")
            };
        }

        private IMutation ParseMutationAlgorithm(AlgorithmSettings settings)
        {
            return settings.MutationAlgorithm switch
            {
                "Swap" => new SwapMutation(),
                _ => throw new Exception("Incorrect mutation algorithm name")
            };
        }

        private static List<Town> CreateTowns(IReadOnlyList<string> fileAsStrings, string edgeWeightType)
        {
            var towns = new List<Town>();

            var separator = new[] {" ", "  "};
            for (var i = 7; i < fileAsStrings.Count; i++)
            {
                if (fileAsStrings[i].Equals("EOF")) break;

                var split = fileAsStrings[i].Split(separator, StringSplitOptions.RemoveEmptyEntries);

                towns.Add(new Town(int.Parse(split[0]), double.Parse(split[1], CultureInfo.InvariantCulture),
                    double.Parse(split[2], CultureInfo.InvariantCulture),
                    edgeWeightType));
            }

            return towns;
        }
    }
}