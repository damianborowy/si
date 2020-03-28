import React, {Component} from 'react';
import styles from "./App.module.css";
import 'antd/dist/antd.css';
import {Select} from "antd";

export default class App extends Component {
    state = {res: null, selectedFile: 0};

    async componentDidMount() {
        const res = await fetch("/sudoku/0").then(res => res.json());

        this.setState({res});
    }

    handleChange = (selectedFile) => {
        this.setState({selectedFile})
    };

    render() {
        if (!this.state.res) return <h2>Loading...</h2>;
        const {Option} = Select;

        return (
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <b>Plik:</b><br/>
                    <Select defaultValue={0} style={{width: "100%", fontSize: 18}} onChange={this.handleChange}>
                        {new Array(47).fill(0).map(((value, index) => index)).map(i =>
                            <Option value={i} key={i}>{i}</Option>
                        )}
                    </Select>
                </div>
                <div className={styles.grid}>
                    {this.state.res.board.map((elem, i) => <div className={styles.cell} key={i}>
                        {elem !== 0 ? elem : ""}
                    </div>)}
                </div>
                <div className={styles.sidebar}>
                    <b>Czas obliczeń:</b> {this.state.res.totalExecutionTime}s<br/>
                    <b>Ilość rozwiązań:</b> {this.state.res.solutionsCount}
                </div>
            </div>
        );
    }
}