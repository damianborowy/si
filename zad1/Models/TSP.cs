﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using zad1.Algorithms.Crossing;
using zad1.Algorithms.Mutation;
using zad1.Algorithms.Selection;

namespace zad1.Models
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

        private const int IterationsCount = 10;
        private const double GreedyFraction = 0.15;

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
            var dataPointsList = new List<DataPoints>();

            for (var iteration = 0; iteration < IterationsCount; iteration++)
            {
                var population = CreateStartingPopulation(settings);
                var dataPoints = new DataPoints();
                dataPoints.AddPoints(population);

                for (var generation = 1; generation < settings.Generations; generation++)
                {
                    var selectedPopulation = Select(population, settings);
                    var crossedPopulation = Cross(selectedPopulation, settings);
                    var mutatedPopulation = Mutate(crossedPopulation, settings);

                    population = mutatedPopulation;
                    dataPoints.AddPoints(population);
                }

                dataPointsList.Add(dataPoints);
            }

            return CalculateAverageDataPoints(dataPointsList);
        }

        private static DataPoints CalculateAverageDataPoints(List<DataPoints> dataPointsList)
        {
            var bestValues = dataPointsList.Select(dataPoints => dataPoints.Best.Min()).ToList();
            var bestDataPointsIndex =
                dataPointsList.FindIndex(points => Math.Abs(points.Best[^1].Y - bestValues.Min().Y) < 0.1);

            var resultDataPoints = dataPointsList[bestDataPointsIndex];
            resultDataPoints.Average =
                Enumerable.Range(0, resultDataPoints.Average.Count).Select(index => new Point(index, 0)).ToList();

            foreach (var best in dataPointsList.SelectMany(dataPoints => dataPoints.Best))
            {
                resultDataPoints.Average[Convert.ToInt32(best.X)].Y += best.Y / dataPointsList.Count;
            }

            return resultDataPoints;
        }

        private Population CreateStartingPopulation(AlgorithmSettings settings)
        {
            var greedyPopulationSize = (int) Math.Floor(settings.PopulationSize * GreedyFraction);
            var randomPopulationSize = settings.PopulationSize - greedyPopulationSize;

            var greedyPopulation = new GreedyPopulation(greedyPopulationSize, this);
            var randomPopulation = new RandomPopulation(randomPopulationSize, this);

            randomPopulation.Individuals.AddRange(greedyPopulation.Individuals);

            return randomPopulation;
        }

        private GeneticPopulation Select(Population population, AlgorithmSettings settings)
        {
            var selectionAlgorithm = ParseSelectionAlgorithm(settings);

            return new GeneticPopulation
            {
                Individuals = population.Individuals.AsParallel()
                    .Select(individual => selectionAlgorithm.Evaluate(population)).ToList()
            };
        }

        private GeneticPopulation Cross(Population selectedPopulation, AlgorithmSettings settings)
        {
            var crossingAlgorithm = ParseCrossingAlgorithm(settings);
            var rng = new Random();
            var randomDoubles = Enumerable.Repeat(0, selectedPopulation.Individuals.Count)
                .Select(_ => rng.NextDouble()).ToArray();
            var randomInts = Enumerable.Repeat(0, selectedPopulation.Individuals.Count)
                .Select(_ => rng.Next(selectedPopulation.Individuals.Count)).ToArray();

            return new GeneticPopulation
            {
                Individuals = selectedPopulation.Individuals.AsParallel().Select((individual, index) =>
                    randomDoubles[index] > settings.Px
                        ? individual
                        : crossingAlgorithm.Evaluate(individual, selectedPopulation.Individuals[randomInts[index]])
                ).ToList()
            };
        }

        private GeneticPopulation Mutate(Population crossedPopulation, AlgorithmSettings settings)
        {
            var mutationAlgorithm = ParseMutationAlgorithm(settings);
            var rng = new Random();
            var randomDoubles = Enumerable.Repeat(0, crossedPopulation.Individuals.Count)
                .Select(_ => rng.NextDouble()).ToArray();

            return new GeneticPopulation
            {
                Individuals = crossedPopulation.Individuals.AsParallel().Select((individual, index) =>
                    randomDoubles[index] < settings.Pm ? mutationAlgorithm.Evaluate(individual) : individual
                ).ToList()
            };
        }

        private static ISelection ParseSelectionAlgorithm(AlgorithmSettings settings) =>
            settings.SelectionAlgorithm switch
            {
                "Tournament" => new TournamentSelection(settings.Tour),
                "Roulette" => new RouletteSelection(),
                _ => throw new Exception("Incorrect selection algorithm name")
            };

        private static ICrossing ParseCrossingAlgorithm(AlgorithmSettings settings) =>
            settings.CrossingAlgorithm switch
            {
                "Ordered" => new OrderedCrossover(),
                "PartiallyMatched" => new PartiallyMatchedCrossover(),
                "Cycle" => new CycleCrossover(),
                _ => throw new Exception("Incorrect crossing algorithm name")
            };

        private static IMutation ParseMutationAlgorithm(AlgorithmSettings settings) =>
            settings.MutationAlgorithm switch
            {
                "Swap" => new SwapMutation(),
                "Inversion" => new InversionMutation(),
                _ => throw new Exception("Incorrect mutation algorithm name")
            };

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