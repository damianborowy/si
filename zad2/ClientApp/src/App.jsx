import React, {Component} from 'react';
import styles from "./App.module.css";
import 'antd/dist/antd.css';
import {Button, InputNumber, Select} from "antd";

export default class App extends Component {
    state = {
        res: null,
        selectedFile: 0,
        files: null,
        loading: false,
        algorithm: "forward",
        variableSelection: "mostConstrained",
        valueSelection: "ordered"
    };

    async componentDidMount() {
        const files = await fetch("/sudoku/").then(res => res.json());

        this.setState({files});
    }

    handleChange = (selectedFile) => this.setState({selectedFile});
    handleAlgorithmChange = (algorithm) => this.setState({algorithm});
    handleVariableChange = (variableSelection) => this.setState({variableSelection});
    handleValueChange = (valueSelection) => this.setState({valueSelection});

    onStartClick = async () => {
        this.setState({loading: true});

        const {algorithm, variableSelection, valueSelection} = this.state;

        const res = await fetch(`/sudoku/${this.state.selectedFile}`, {
            method: "POST",
            body: JSON.stringify({algorithm, variableSelection, valueSelection}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json());

        console.log({algorithm, variableSelection, valueSelection});

        this.setState({loading: false, res})
    };

    onExportClick = () => {
        const {res} = this.state;

        let csvContent = "data:text/csv;charset=utf-8," +
            "Ilosc rozwiazan;Pierwsze wezly;Pierwszy czas;Pierwszy nawroty;Wezly;Czas;Nawroty;Rozwiazane sudoku\n" +
            `${res.solutionsCount};${res.firstNodesVisitedCount};${res.firstSolutionTime};${res.firstRecurrencesCount};${res.totalNodesVisitedCount};${res.totalExecutionTime};${res.totalRecurrencesCount};${res.boards[0]}\n`;

        for (let i = 1; i < res.boards.length; i++) csvContent += `;;;;;;;${res.boards[i]}\n`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${this.state.selectedFile}.csv`);
        link.click();
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
                        <Select className={styles.select} defaultValue="forward" onChange={this.handleAlgorithmChange}>
                            <Option value="forward">
                                Przeszukiwanie w przód
                            </Option>
                            <Option value="backward">
                                Przeszukiwanie z nawrotami
                            </Option>
                        </Select>
                    </div>
                    <div>
                        <b>Heurystyka wyboru zmiennych:</b><br/>
                        <Select className={styles.select} defaultValue="mostConstrained"
                                onChange={this.handleVariableChange}>
                            <Option value="mostConstrained">
                                Najbardziej ograniczone
                            </Option>
                            <Option value="random">
                                Losowe
                            </Option>
                        </Select>
                    </div>
                    <div>
                        <b>Heurystyka wyboru wartości:</b><br/>
                        <Select className={styles.select} defaultValue="ordered" onChange={this.handleValueChange}>
                            <Option value="ordered">
                                W kolejności definicji
                            </Option>
                            <Option value="random">
                                Losowe
                            </Option>
                        </Select><br/>
                    </div>
                    {/*<div>*/}
                    {/*    <b>Powtórzenia:</b>*/}
                    {/*    <InputNumber style={{marginLeft: 65}} className={styles.select} defaultValue={1} min={1}/><br/>*/}
                    {/*</div>*/}
                    <div>
                        <Button type="primary" onClick={this.onStartClick} loading={this.state.loading} block>
                            Start
                        </Button>
                    </div>
                </div>
                <div className={styles.grid}>
                    {this.state.res && this.state.res.boards[0] ? this.state.res.boards[0].map((elem, i) =>
                        <div className={styles.cell} key={i}>
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
                            <Button type="primary" onClick={this.onExportClick} style={{float: "right"}}>
                                Eksportuj do CSV
                            </Button>
                        </div>
                        : ""}
                </div>
            </div>
        );
    }
}