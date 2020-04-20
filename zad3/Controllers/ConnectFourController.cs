using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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