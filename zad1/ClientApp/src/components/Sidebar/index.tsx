import React from "react";
import styles from "./style.module.scss";
import { InputNumber, Select, Button } from "antd";
import { SelectValue } from "antd/lib/select";
import ICrossing from "../../models/crossing/ICrossing";
import IMutation from "../../models/mutation/IMutation";
import TournamentSelection from "../../models/selection/TournamentSelection";
import OrderedCrossover from "../../models/crossing/OrderedCrossover";
import SwapMutation from "../../models/mutation/SwapMutation";
import ISelection from "../../models/selection/ISelection";

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
        filename: null,
        selectionAlgorithm: "Tournament",
        crossingAlgorithm: "Ordered",
        mutationAlgorithm: "Swap",
        tour: 5,
        populationSize: 100,
        generations: 1000,
        Px: 0.05,
        Pm: 0.2
    };

    componentDidMount() {
        this.updateSettings();
    }

    updateSettings = () => {
        this.props.updateSettings(this.state);
    };

    onFilenameChange = (value: SelectValue) => {
        this.setState({ filename: value }, this.updateSettings);
    };

    onSelectionAlgorithmChange = (value: SelectValue) => {
        this.setState({ selectionAlgorithm: value }, this.updateSettings);
    };

    onCrossingAlgorithmChange = (value: SelectValue) => {
        this.setState({ crossingAlgorithm: value }, this.updateSettings);
    };

    onMutationAlgorithmChange = (value: SelectValue) => {
        this.setState({ mutationAlgorithm: value }, this.updateSettings);
    };

    onTourChange = (value: number) => {
        this.setState({ tour: value }, this.updateSettings);
    };

    onPopulationSizeChange = (value: number) => {
        this.setState({ populationSize: value }, this.updateSettings);
    };

    onGenerationsChange = (value: number) => {
        this.setState({ generations: value }, this.updateSettings);
    };

    onPxChange = (value: number) => {
        this.setState({ Px: value }, this.updateSettings);
    };

    onPmChange = (value: number) => {
        this.setState({ Pm: value }, this.updateSettings);
    };

    render() {
        const { Option } = Select;
        const { isWorking, files } = this.props;

        if (!files) return <b>Loading...</b>;

        return (
            <div className={styles.sidebar}>
                <div>
                    <b>Plik:</b>
                    <Select
                        className={styles.select}
                        onChange={this.onFilenameChange}
                    >
                        {this.props.files.map(filename => (
                            <Option value={filename}>{filename}</Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <b>Algorytm selekcji:</b>
                    <br />
                    <Select
                        className={styles.select}
                        onChange={this.onSelectionAlgorithmChange}
                        defaultValue="Tournament"
                    >
                        <Option value="Tournament">Tournament</Option>
                        <Option value="Roulette">Roulette</Option>
                    </Select>
                </div>
                <div>
                    <b>Algorytm krzyżowania:</b>
                    <br />
                    <Select
                        className={styles.select}
                        onChange={this.onCrossingAlgorithmChange}
                        defaultValue="Ordered"
                    >
                        <Option value="Ordered">Ordered</Option>
                    </Select>
                </div>
                <div>
                    <b>Algorytm mutowania:</b>
                    <br />
                    <Select
                        className={styles.select}
                        onChange={this.onMutationAlgorithmChange}
                        defaultValue="Swap"
                    >
                        <Option value="Swap">Swap</Option>
                        <Option value="Inversion">Inversion</Option>
                    </Select>
                </div>
                <div>
                    <b>Tour:</b>
                    <br />
                    <InputNumber
                        className={styles.input}
                        min={0}
                        max={50}
                        defaultValue={5}
                        onChange={this.onTourChange}
                    />
                </div>
                <div>
                    <b>Rozmiar populacji:</b>
                    <br />
                    <InputNumber
                        className={styles.input}
                        min={0}
                        max={2500}
                        step={10}
                        defaultValue={100}
                        onChange={this.onPopulationSizeChange}
                    />
                </div>
                <div>
                    <b>Generacje:</b>
                    <br />
                    <InputNumber
                        className={styles.input}
                        min={0}
                        max={2500}
                        step={10}
                        defaultValue={1000}
                        onChange={this.onGenerationsChange}
                    />
                </div>
                <div>
                    <b>Px:</b>
                    <br />
                    <InputNumber
                        className={styles.input}
                        min={0}
                        max={1}
                        step={0.01}
                        defaultValue={0.75}
                        onChange={this.onPxChange}
                    />
                </div>
                <div>
                    <b>Pm:</b>
                    <br />
                    <InputNumber
                        className={styles.input}
                        min={0}
                        max={1}
                        step={0.01}
                        defaultValue={0.15}
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
