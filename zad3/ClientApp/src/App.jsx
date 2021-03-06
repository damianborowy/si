import React from "react";
import "./App.css";
import {Button, InputNumber, Select} from "antd";
import 'antd/dist/antd.css';

const ROWS = 6;
const COLUMNS = 7;

export default class App extends React.Component {
    state = {
        player1: 1,
        player2: 2,
        currentPlayer: null,
        board: [],
        gameOver: false,
        message: '',
        gameMode: "PvSI",
        startingTime: null,
        endingTime: null,
        depth: 6,
        algorithm: "minmax",
        heuristic: "simple",
        player1steps: 0,
        player2steps: 0
    };

    componentWillMount() {
        this.initBoard();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.gameOver) return;

        if (this.state.gameMode === "PvSI") {
            if (this.state.currentPlayer === 2) {
                await this._getColumnFromSi();
            }
        } else if (this.state.gameMode === "SIvSI") {
            await this._getColumnFromSi();
        }
    }

    async _getColumnFromSi() {
        const algorithm = this.state.algorithm,
            board = this.state.board,
            depth = this.state.depth,
            heuristic = this.state.heuristic,
            currentPlayer = this.state.currentPlayer;

        const aiSelectedColumn = await fetch("ConnectFour", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({board, algorithm, depth, heuristic, currentPlayer})
        }).then(res => res.text());

        this.play(parseInt(aiSelectedColumn), currentPlayer);
    }

    initBoard = () => {
        let board = [];

        for (let r = 0; r < ROWS; r++) {
            let row = [];

            for (let c = 0; c < COLUMNS; c++) row.push(0);

            board.push(row);
        }

        this.setState({
            board,
            currentPlayer: this.state.player1,
            gameOver: false,
            message: '',
            startingTime: performance.now(),
            endingTime: null,
            player1steps: 0,
            player2steps: 0
        });
    };

    togglePlayer = () => this.state.currentPlayer === this.state.player1 ? this.state.player2 : this.state.player1;

    play = (col, player) => {
        if (!this.state.gameOver) {
            let board = this.state.board,
                player1steps = this.state.player1steps,
                player2steps = this.state.player2steps;

            for (let row = ROWS - 1; row >= 0; row--) {
                if (!board[row][col]) {
                    board[row][col] = player;
                    break;
                }
            }

            if (player === 1) player1steps++;
            if (player === 2) player2steps++;

            let result = this.checkAll(board);

            if (result === this.state.player1)
                this.setState({
                    board,
                    gameOver: true,
                    message: 'Player 1 (red) wins!',
                    endingTime: performance.now(),
                    player1steps,
                    player2steps
                });
            else if (result === this.state.player2)
                this.setState({
                    board,
                    gameOver: true,
                    message: 'Player 2 (yellow) wins!',
                    endingTime: performance.now(),
                    player1steps,
                    player2steps
                });
            else if (result === 'draw')
                this.setState({
                    board, gameOver: true, message: 'Draw game.', endingTime: performance.now(),
                    player1steps,
                    player2steps
                });
            else
                this.setState({
                    board, currentPlayer: this.togglePlayer(),
                    player1steps,
                    player2steps
                });
        } else this.setState({message: 'Game over. Please start a new game.'});
    };

    _calculateGameDuration() {
        const duration = this.state.endingTime - this.state.startingTime;
        return Math.round(duration);
    }

    checkVertical(board) {
        for (let r = 3; r < ROWS; r++)
            for (let c = 0; c < COLUMNS; c++)
                if (board[r][c])
                    if (board[r][c] === board[r - 1][c] &&
                        board[r][c] === board[r - 2][c] &&
                        board[r][c] === board[r - 3][c])
                        return board[r][c];
    }

    checkHorizontal(board) {
        for (let r = 0; r < ROWS; r++)
            for (let c = 0; c < COLUMNS - 3; c++)
                if (board[r][c])
                    if (board[r][c] === board[r][c + 1] &&
                        board[r][c] === board[r][c + 2] &&
                        board[r][c] === board[r][c + 3])
                        return board[r][c];
    }

    checkDiagonalRight(board) {
        for (let r = 3; r < ROWS; r++)
            for (let c = 0; c < COLUMNS - 3; c++)
                if (board[r][c])
                    if (board[r][c] === board[r - 1][c + 1] &&
                        board[r][c] === board[r - 2][c + 2] &&
                        board[r][c] === board[r - 3][c + 3])
                        return board[r][c];
    }

    checkDiagonalLeft(board) {
        for (let r = 3; r < ROWS; r++)
            for (let c = 3; c < COLUMNS; c++)
                if (board[r][c])
                    if (board[r][c] === board[r - 1][c - 1] &&
                        board[r][c] === board[r - 2][c - 2] &&
                        board[r][c] === board[r - 3][c - 3])
                        return board[r][c];
    }

    checkDraw(board) {
        for (let r = 0; r < ROWS; r++)
            for (let c = 0; c < COLUMNS; c++)
                if (board[r][c] === 0)
                    return null;

        return 'draw';
    }

    checkAll(board) {
        return this.checkVertical(board) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
    }

    onChange = (value) => {
        this.setState({gameMode: value})
    };

    onAlgorithmChange = (value) => {
        this.setState({algorithm: value});
    };

    onHeuristicChange = (value) => {
        this.setState({heuristic: value})
    };

    onDepthChange = (value) => {
        this.setState({depth: value});
    };

    render() {
        const {Option} = Select;

        return (
            <div style={{display: "flex", width: "100%"}}>
                <div style={{width: "200px", margin: "20px"}}>
                    <h4>Tryb gry:</h4>
                    <Select className="select" defaultValue="PvSI" onChange={this.onChange}>
                        <Option value="PvSI">PvSI</Option>
                        <Option value="SIvSI">SIvSI</Option>
                        <Option value="PvP">PvP</Option>
                    </Select><br/>
                    <h4>Algorytm:</h4>
                    <Select className="select" defaultValue="minmax" onChange={this.onAlgorithmChange}>
                        <Option value="minmax">MinMax</Option>
                        <Option value="alpha-beta">Alpha-Beta</Option>
                    </Select><br/>
                    <h4>Heurystyka:</h4>
                    <Select className="select" defaultValue="simple" onChange={this.onHeuristicChange}>
                        <Option value="simple">Prosta</Option>
                        <Option value="advanced">Zaawansowana</Option>
                    </Select><br/>
                    <h4>Głębokość:</h4>
                    <InputNumber
                        defaultValue={6}
                        min={1}
                        max={10}
                        onChange={this.onDepthChange}
                        style={{width: "100%"}}
                    /><br/><br/>
                    <Button onClick={this.initBoard} type="primary" block>New Game</Button>
                </div>
                <div style={{
                    flex: 1,
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                    <table cellSpacing={0} cellPadding={0}>
                        <thead>
                        </thead>
                        <tbody>
                        {this.state.board.map((row, i) => (<Row key={i} row={row} play={this.play}/>))}
                        </tbody>
                    </table>

                    <p
                        className="message"
                        style={{color: this.state.currentPlayer === 1 ? "red" : "orange"}}
                    >
                        Player {this.state.currentPlayer === 1 ? "RED" : "YELLOW"} turn.
                    </p>

                    <p className="message">{this.state.message}</p>
                </div>
                <div style={{width: 200, margin: 20}}>
                    {this.state.endingTime && <>
                        <h4>Czas trwania gry: {this._calculateGameDuration()}ms</h4>
                        <h4>Ilość kroków do
                            wygrania: {this.state.currentPlayer === 1 ? this.state.player1steps : this.state.player2steps}</h4>
                    </>}
                </div>
            </div>
        );
    }
}

const Row = ({row, play}) => {
    return (
        <tr>
            {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} play={play}/>)}
        </tr>
    );
};

const Cell = ({value, columnIndex, play}) => {
    let color = 'white';

    if (value === 1) color = 'red';
    else if (value === 2) color = 'yellow';

    return (
        <td>
            <div className="cell" onClick={() => {
                play(columnIndex, 1)
            }}>
                <div className={color}/>
            </div>
        </td>
    );
};