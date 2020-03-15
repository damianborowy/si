using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.Models;
using back.Models.Population;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace zad1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var tsp = TSP.FromFile("berlin52");
            var greedyPopulation = new GreedyPopulation(tsp);

            Console.WriteLine("Best individual: " + greedyPopulation.CalculateBestDistance() + "km");

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}