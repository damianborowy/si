import React from "react";
import "./App.css";
import {Button} from "antd";
import 'antd/dist/antd.css';

export default class App extends React.Component {
    state = {
        player1: 1,
        player2: 2,
        currentPlayer: null,
        board: [],
        gameOver: false,
        message: ''
    };

    componentWillMount() {
        this.initBoard();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        console.log({board: this.state.board});

        if (this.state.currentPlayer === 2) {
            const aiSelectedColumn = await fetch("ConnectFour", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({board: this.state.board})
            }).then(res => res.text());

            this.play(parseInt(aiSelectedColumn));
        }
    }

    initBoard = () => {
        let board = [];

        for (let r = 0; r < 6; r++) {
            let row = [];

            for (let c = 0; c < 7; c++) row.push(0);

            board.push(row);
        }

        this.setState({
            board,
            currentPlayer: this.state.player1,
            gameOver: false,
            message: ''
        });
    };

    togglePlayer = () => this.state.currentPlayer === this.state.player1 ? this.state.player2 : this.state.player1;

    play = (col) => {
        if (!this.state.gameOver) {
            let board = this.state.board;
            for (let row = 5; row >= 0; row--) {
                if (!board[row][col]) {
                    board[row][col] = this.state.currentPlayer;
                    break;
                }
            }

            let result = this.checkAll(board);

            if (result === this.state.player1)
                this.setState({board, gameOver: true, message: 'Player 1 (red) wins!'});
            else if (result === this.state.player2)
                this.setState({board, gameOver: true, message: 'Player 2 (yellow) wins!'});
            else if (result === 'draw')
                this.setState({board, gameOver: true, message: 'Draw game.'});
            else
                this.setState({board, currentPlayer: this.togglePlayer()});
        } else {
            this.setState({message: 'Game over. Please start a new game.'});
        }
    };

    checkVertical(board) {
        for (let r = 3; r < 6; r++) {
            for (let c = 0; c < 7; c++) {
                if (board[r][c]) {
                    if (board[r][c] === board[r - 1][c] &&
                        board[r][c] === board[r - 2][c] &&
                        board[r][c] === board[r - 3][c]) {
                        return board[r][c];
                    }
                }
            }
        }
    }

    checkHorizontal(board) {
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 4; c++) {
                if (board[r][c]) {
                    if (board[r][c] === board[r][c + 1] &&
                        board[r][c] === board[r][c + 2] &&
                        board[r][c] === board[r][c + 3]) {
                        return board[r][c];
                    }
                }
            }
        }
    }

    checkDiagonalRight(board) {
        for (let r = 3; r < 6; r++) {
            for (let c = 0; c < 4; c++) {
                if (board[r][c]) {
                    if (board[r][c] === board[r - 1][c + 1] &&
                        board[r][c] === board[r - 2][c + 2] &&
                        board[r][c] === board[r - 3][c + 3]) {
                        return board[r][c];
                    }
                }
            }
        }
    }

    checkDiagonalLeft(board) {
        for (let r = 3; r < 6; r++) {
            for (let c = 3; c < 7; c++) {
                if (board[r][c]) {
                    if (board[r][c] === board[r - 1][c - 1] &&
                        board[r][c] === board[r - 2][c - 2] &&
                        board[r][c] === board[r - 3][c - 3]) {
                        return board[r][c];
                    }
                }
            }
        }
    }

    checkDraw(board) {
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 7; c++) {
                if (board[r][c] === 0) {
                    return null;
                }
            }
        }

        return 'draw';
    }

    checkAll(board) {
        return this.checkVertical(board) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
    }

    render() {
        return (
            <div>
                <div className="button">
                    <Button onClick={this.initBoard}>New Game</Button>
                </div>

                <table cellSpacing={0} cellPadding={0}>
                    <thead>
                    </thead>
                    <tbody>
                    {this.state.board.map((row, i) => (<Row key={i} row={row} play={this.play}/>))}
                    </tbody>
                </table>

                <p className="message">{this.state.message}</p>
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
                play(columnIndex)
            }}>
                <div className={color}/>
            </div>
        </td>
    );
};