using System;
using Microsoft.AspNetCore.Mvc;
using zad3.Algorithms;
using zad3.Models;

namespace zad3.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConnectFourController : ControllerBase
    {
        [HttpPost]
        public int SelectColumn([FromBody] Game game)
        {
            var board = Board.FromJaggedArray(game.Board);
            var heuristic = ParseValueHeuristic(game);
            var selection = ParseColumnSelection(game, board, heuristic);

            return selection.Evaluate();
        }

        private static IValueHeuristic ParseValueHeuristic(Game game) =>
            game.Heuristic switch
            {
                "simple" => new SimpleHeuristic(),
                "advanced" => new AdvancedHeuristic(),
                _ => throw new Exception("A proper heuristic name was not provided")
            };


        private static IColumnSelection ParseColumnSelection(Game game, Board board, IValueHeuristic heuristic) =>
            game.Algorithm switch
            {
                "minmax" => new MinMaxSelection(board, game.Depth, heuristic, game.Player),
                "alpha-beta" => new AlphaBetaSelection(board, game.Depth, heuristic, game.Player),
                _ => throw new Exception("A proper algorithm name was not provided")
            };
    }
}