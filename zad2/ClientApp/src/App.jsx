import React, {Component} from 'react';
import styles from "./App.module.css";
import 'antd/dist/antd.css';
import {Button, InputNumber, Select} from "antd";

export default class App extends Component {
    state = {res: null, selectedFile: 0, files: null, loading: false};

    async componentDidMount() {
        const files = await fetch("/sudoku/").then(res => res.json());

        this.setState({files});
    }

    handleChange = (selectedFile) => {
        this.setState({selectedFile})
    };

    onClick = async () => {
        this.setState({loading: true});

        const res = await fetch(`/sudoku/${this.state.selectedFile}`).then(res => res.json());

        this.setState({loading: false, res})
    };

    render() {
        if (!this.state.files) return <h2>Loading...</h2>;
        const {Option} = Select;

        return (
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <div>
                        <b>Instancja:</b><br/>
                        <Select className={styles.select} defaultValue={0} onChange={this.handleChange}>
                            {this.state.files.map(file => {
                                const value = file.split(" ")[0] - 1;

                                return <Option value={value} key={value}>{file}</Option>
                            })}
                        </Select>
                    </div>
                    <div>
                        <b>Metoda:</b><br/>
                        <Select className={styles.select} defaultValue="recursive">
                            <Option value="recursive">
                                Przeszukiwanie z nawrotami
                            </Option>
                        </Select>
                    </div>
                    <div>
                        <b>Heurystyka wyboru zmiennych:</b><br/>
                        <Select className={styles.select} defaultValue="ordered">
                            <Option value="ordered">
                                W kolejności definicji
                            </Option>
                        </Select>
                    </div>
                    <div>
                        <b>Heurystyka wyboru wartości:</b><br/>
                        <Select className={styles.select} defaultValue="ordered">
                            <Option value="ordered">
                                W kolejności definicji
                            </Option>
                        </Select><br/>
                    </div>
                    <div>
                        <b>Powtórzenia:</b>
                        <InputNumber style={{marginLeft: 65}} className={styles.select} defaultValue={1} min={1}/><br/>
                    </div>
                    <div>
                        <Button type="primary" onClick={this.onClick} loading={this.state.loading} block>Start</Button>
                    </div>
                </div>
                <div className={styles.grid}>
                    {this.state.res ? this.state.res.boards[0].map((elem, i) => <div className={styles.cell} key={i}>
                        {elem !== 0 ? elem : ""}
                    </div>) : ""}
                </div>
                <div className={styles.sidebar}>
                    {this.state.res ?
                        <div>
                            <h3>Pierwsze rozwiązanie</h3>
                            <b>Liczba odwiedzonych węzłów drzewa:</b> {this.state.res.firstNodesVisitedCount}<br/>
                            <b>Czas do znalezienia rozwiązania:</b> {this.state.res.firstSolutionTime}ms<br/>
                            <b>Liczba nawrotów:</b> {this.state.res.firstRecurrencesCount}<br/><br/>

                            <h3>Cały przebieg</h3>
                            <b>Liczba odwiedzonych węzłów drzewa:</b> {this.state.res.totalNodesVisitedCount}<br/>
                            <b>Czas działania metody:</b> {this.state.res.totalExecutionTime}ms <br/>
                            <b>Liczba nawrotów:</b> {this.state.res.totalRecurrencesCount} <br/><br/>

                            <div><b>Ilość rozwiązań:</b> {this.state.res.solutionsCount}</div>
                        </div>
                        : ""}
                </div>
            </div>
        );
    }
}