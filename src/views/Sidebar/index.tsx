import React from "react";
import styles from "./style.module.scss";
import { InputNumber, Select, Button } from "antd";
import { SelectValue } from "antd/lib/select";
import ISelection from "../../models/selection/ISelection";
import ICrossing from "../../models/crossing/ICrossing";
import IMutation from "../../models/mutation/IMutation";
import TournamentSelection from "../../models/selection/TournamentSelection";
import OrderedCrossover from "../../models/crossing/OrderedCrossover";
import SwapMutation from "../../models/mutation/SwapMutation";

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
        Px: 0.75,
        Pm: 0.15
    };

    componentDidMount() {
        this.updateSettings();
    }

    updateSettings = () => {
        this.props.updateSettings(this.state);
    };

    onFilenameChange = (value: SelectValue) => {
        if (!value) throw new Error("Incorrect filename");

        this.setState({ selectedFilename: value });
        this.updateSettings();
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
                    <Select className={styles.select} defaultValue="Tournament">
                        <Option value="Tournament">Tournament</Option>
                        <Option value="Roulette">Roulette</Option>
                    </Select>
                </div>
                <div>
                    <b>Algorytm krzyżowania:</b>
                    <br />
                    <Select className={styles.select} defaultValue="Ordered">
                        <Option value="Ordered">Ordered</Option>
                    </Select>
                </div>
                <div>
                    <b>Algorytm mutowania:</b>
                    <br />
                    <Select className={styles.select} defaultValue="Swap">
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
