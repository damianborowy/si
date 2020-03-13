import React from "react";
import styles from "./style.module.scss";
import { InputNumber, Select, Button } from "antd";
import { SelectValue } from "antd/lib/select";

interface ISidebarProps {
    filenamesList: string[];
    isWorking: boolean;
    toggleWorkingState: () => void;
    onFilenameChange: (filename: string) => void;
}

export interface ISidebarState {
    selectedFilename: string;
}

export default class Sidebar extends React.Component<ISidebarProps> {
    state: Readonly<ISidebarState> = {
        selectedFilename: this.props.filenamesList[0]
    };

    onFilenameChange = (value: SelectValue) => {
        if (!value) throw new Error("Incorrect filename");

        this.setState({ selectedFilename: value });
        this.props.onFilenameChange(value.toString());
    };

    startCalculations = () => {
        this.props.toggleWorkingState();
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
                        defaultValue={this.state.selectedFilename}
                    >
                        {this.props.filenamesList.map(filename => (
                            <Option value={filename}>{filename}</Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <b>Algorytm selekcji:</b>
                    <br />
                    <Select className={styles.select}>
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
                    <Select className={styles.select}>
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
                        defaultValue={500}
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
                        defaultValue={500}
                    />
                </div>
                <div>
                    <b>Px:</b>
                    <br />
                    <InputNumber
                        className={styles.input}
                        min={0}
                        max={1}
                        step={0.1}
                        defaultValue={0.7}
                    />
                </div>
                <div>
                    <b>PM:</b>
                    <br />
                    <InputNumber
                        className={styles.input}
                        min={0}
                        max={1}
                        step={0.1}
                        defaultValue={0.1}
                    />
                </div>
                <Button
                    className={styles.button}
                    type="primary"
                    loading={isWorking}
                    onClick={this.startCalculations}
                    block
                >
                    {isWorking ? "Calculating..." : "Start"}
                </Button>
            </div>
        );
    }
}
