using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using zad1.Models;

namespace zad1
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var files = new List<string> {"berlin52", "kroA100", "kroA150", "kroA200", "fl417"};
            var stopwatch = new Stopwatch();

            Console.WriteLine("");

            files.ForEach(file =>
            {
                var tsp = TSP.FromFile(file);

                stopwatch.Start();
                var randomPopulation = new RandomPopulation(10000, tsp);
                stopwatch.Stop();
                Console.WriteLine("Random for " + file);
                Console.WriteLine("Best: " + randomPopulation.CalculateBestDistance());
                Console.WriteLine("Worst: " + randomPopulation.CalculateWorstDistance());
                Console.WriteLine("Average: " + randomPopulation.CalculateAverageDistance());
                Console.WriteLine("Time elapsed: " + stopwatch.ElapsedMilliseconds / 1000.0 + " s\n");

                stopwatch.Start();
                var greedyPopulation = new GreedyPopulation(tsp);
                stopwatch.Stop();
                Console.WriteLine("Greedy for " + file);
                Console.WriteLine("Best: " + greedyPopulation.CalculateBestDistance());
                Console.WriteLine("Worst: " + greedyPopulation.CalculateWorstDistance());
                Console.WriteLine("Average: " + greedyPopulation.CalculateAverageDistance());
                Console.WriteLine("Time elapsed: " + stopwatch.ElapsedMilliseconds / 1000.0 + " s\n");

                Console.WriteLine("----------------------------\n");
            });

            CreateHostBuilder(args).Build().Run();
        }

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}