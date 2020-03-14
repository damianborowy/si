import React from "react";
import styles from "./style.module.scss";
import { InputNumber, Select, Button } from "antd";
import { SelectValue } from "antd/lib/select";
import ICrossing from "../../models/crossing/ICrossing";
import IMutation from "../../models/mutation/IMutation";
import TournamentSelection from "../../models/selection/TournamentSelection";
import OrderedCrossover from "../../models/crossing/OrderedCrossover";
import SwapMutation from "../../models/mutation/SwapMutation";
import InversionMutation from "../../models/mutation/InversionMutation";
import RouletteSelection from "../../models/selection/RouletteSelection";
import ISelection from "../../models/selection/ISelection";

interface ISidebarProps {
    filenamesList: string[];
    isWorking: boolean;
    updateSettings: (settings: ISidebarState) => void;
    startCalculations: () => void;
}

export interface ISidebarState {
    filename: string;
    selectionAlgorithm: ISelection;
    crossingAlgorithm: ICrossing;
    mutationAlgorithm: IMutation;
    tour: number;
    populationSize: number;
    generations: number;
    Px: number;
    Pm: number;
}

export default class Sidebar extends React.Component<ISidebarProps> {
    state: Readonly<ISidebarState> = {
        filename: this.props.filenamesList[0],
        selectionAlgorithm: new TournamentSelection(5),
        crossingAlgorithm: new OrderedCrossover(),
        mutationAlgorithm: new SwapMutation(),
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
        console.log(this.state);
    };

    onFilenameChange = (value: SelectValue) => {
        this.setState({ filename: value }, this.updateSettings);
    };

    onSelectionAlgorithmChange = (value: SelectValue) => {
        let selectionAlgorithm: ISelection;

        switch (value) {
            case "Tournament":
                selectionAlgorithm = new TournamentSelection(this.state.tour);
                break;
            case "Roulette":
                selectionAlgorithm = new RouletteSelection();
                break;
            default:
                throw new Error("Selected incorrect selection algorithm");
        }

        this.setState({ selectionAlgorithm }, this.updateSettings);
    };

    onCrossingAlgorithmChange = (value: SelectValue) => {
        let crossingAlgorithm: ICrossing;

        switch (value) {
            case "Ordered":
                crossingAlgorithm = new OrderedCrossover();
                break;
            default:
                throw new Error("Selected incorrect crossing algorithm");
        }

        this.setState({ crossingAlgorithm }, this.updateSettings);
    };

    onMutationAlgorithmChange = (value: SelectValue) => {
        let mutationAlgorithm: IMutation;

        switch (value) {
            case "Swap":
                mutationAlgorithm = new SwapMutation();
                break;
            case "Inversion":
                mutationAlgorithm = new InversionMutation();
                break;
            default:
                throw new Error("Selected incorrect mutation algorithm");
        }

        this.setState({ mutationAlgorithm }, this.updateSettings);
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
        const { isWorking } = this.props;

        return (
            <div className={styles.sidebar}>
                <div>
                    <b>Plik:</b>
                    <Select
                        className={styles.select}
                        onChange={this.onFilenameChange}
                        defaultValue={this.state.filename}
                    >
                        {this.props.filenamesList.map(filename => (
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
