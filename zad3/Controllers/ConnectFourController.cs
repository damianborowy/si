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
            var selection = ParseColumnSelection(game, board);

            return selection.Evaluate();
        }

        private static IColumnSelection ParseColumnSelection(Game game, Board board) =>
            game.Algorithm switch
            {
                "minmax" => new MinMaxSelection(board, game.Depth),
                "alpha-beta" => new AlphaBetaSelection(board, game.Depth),
                _ => throw new Exception("A proper algorithm name was not provided")
            };
    }
}