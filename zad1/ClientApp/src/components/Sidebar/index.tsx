import React from "react";
import styles from "./style.module.scss";
import {InputNumber, Select, Button} from "antd";
import {SelectValue} from "antd/lib/select";

interface ISidebarProps {
    isWorking: boolean;
    updateSettings: (settings: ISidebarState) => void;
    startCalculations: () => void;
    files: string[];
}

export interface ISidebarState {
    filename: string;
    selectionAlgorithm: string;
    crossingAlgorithm: string;
    mutationAlgorithm: string;
    tour: number;
    populationSize: number;
    generations: number;
    Px: number;
    Pm: number;
}

export default class Sidebar extends React.Component<ISidebarProps> {
    state: Readonly<ISidebarState> = {
        filename: "kroA100",
        selectionAlgorithm: "Tournament",
        crossingAlgorithm: "Ordered",
        mutationAlgorithm: "Inversion",
        tour: 5,
        populationSize: 250,
        generations: 1000,
        Px: 0.5,
        Pm: 0.3
    };

    componentDidMount() {
        this.updateSettings();
    }

    updateSettings = () => {
        this.props.updateSettings(this.state);
    };

    onFilenameChange = (value: SelectValue) => {
        this.setState({filename: value}, this.updateSettings);
    };

    onSelectionAlgorithmChange = (value: SelectValue) => {
        this.setState({selectionAlgorithm: value}, this.updateSettings);
    };

    onCrossingAlgorithmChange = (value: SelectValue) => {
        this.setState({crossingAlgorithm: value}, this.updateSettings);
    };

    onMutationAlgorithmChange = (value: SelectValue) => {
        this.setState({mutationAlgorithm: value}, this.updateSettings);
    };

    onTourChange = (value: number) => {
        this.setState({tour: value}, this.updateSettings);
    };

    onPopulationSizeChange = (value: number) => {
        this.setState({populationSize: value}, this.updateSettings);
    };

    onGenerationsChange = (value: number) => {
        this.setState({generations: value}, this.updateSettings);
    };

    onPxChange = (value: number) => {
        this.setState({Px: value}, this.updateSettings);
    };

    onPmChange = (value: number) => {
        this.setState({Pm: value}, this.updateSettings);
    };

    render() {
        const {Option} = Select;
        const {isWorking, files} = this.props;

        if (!files) return <b>Loading...</b>;

        return (
            <div className={styles.sidebar}>
                <div>
                    <b>Plik:</b>
                    <Select
                        className={styles.select}
                        onChange={this.onFilenameChange}
                        defaultValue={this.state.filename}
                    >
                        {this.props.files.map(filename => (
                            <Option value={filename}>{filename}</Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <b>Algorytm selekcji:</b>
                    <br/>
                    <Select
                        className={styles.select}
                        onChange={this.onSelectionAlgorithmChange}
                        defaultValue={this.state.selectionAlgorithm}
                    >
                        <Option value="Tournament">Tournament</Option>
                        <Option value="Roulette">Roulette</Option>
                    </Select>
                </div>
                <div>
                    <b>Algorytm krzyżowania:</b>
                    <br/>
                    <Select
                        className={styles.select}
                        onChange={this.onCrossingAlgorithmChange}
                        defaultValue={this.state.crossingAlgorithm}
                    >
                        <Option value="Ordered">Ordered</Option>
                    </Select>
                </div>
                <div>
                    <b>Algorytm mutowania:</b>
                    <br/>
                    <Select
                        className={styles.select}
                        onChange={this.onMutationAlgorithmChange}
                        defaultValue={this.state.mutationAlgorithm}
                    >
                        <Option value="Inversion">Inversion</Option>
                        <Option value="Swap">Swap</Option>
                    </Select>
                </div>
                <div>
                    <b>Tour:</b>
                    <br/>
                    <InputNumber
                        className={styles.input}
                        min={0}
                        max={2500}
                        defaultValue={this.state.tour}
                        onChange={this.onTourChange}
                    />
                </div>
                <div>
                    <b>Rozmiar populacji:</b>
                    <br/>
                    <InputNumber
                        className={styles.input}
                        min={0}
                        max={2500}
                        step={10}
                        defaultValue={this.state.populationSize}
                        onChange={this.onPopulationSizeChange}
                    />
                </div>
                <div>
                    <b>Generacje:</b>
                    <br/>
                    <InputNumber
                        className={styles.input}
                        min={0}
                        max={2500}
                        step={10}
                        defaultValue={this.state.generations}
                        onChange={this.onGenerationsChange}
                    />
                </div>
                <div>
                    <b>Px:</b>
                    <br/>
                    <InputNumber
                        className={styles.input}
                        min={0}
                        max={1}
                        step={0.01}
                        defaultValue={this.state.Px}
                        onChange={this.onPxChange}
                    />
                </div>
                <div>
                    <b>Pm:</b>
                    <br/>
                    <InputNumber
                        className={styles.input}
                        min={0}
                        max={1}
                        step={0.01}
                        defaultValue={this.state.Pm}
                        onChange={this.onPmChange}
                    />
                </div>
                <Button
                    className={styles.button}
                    type="primary"
                    loading={isWorking}
                    onClick={this.props.startCalculations}
                    block
                >
                    {isWorking ? "Calculating..." : "Start"}
                </Button>
            </div>
        );
    }
}
