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
            var selection = new MinMaxSelection(board, 6);

            var result = selection.Evaluate();

            return result;
        }
    }
}