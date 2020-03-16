import React from "react";
import styles from "./App.module.scss";
import Sidebar, {ISidebarState} from "./Sidebar";
import Content from "./Content";
import DataPoints from "../models/DataPoints";

interface IAppState {
    isWorking: boolean;
    settings: ISidebarState;
    dataPoints: DataPoints;
    currentChartFilename: string;
    files: string[];
}

class App extends React.Component<{}, IAppState> {
    state: Readonly<IAppState> = {
        isWorking: false,
        settings: null,
        dataPoints: new DataPoints(),
        currentChartFilename: null,
        files: null
    };

    async componentDidMount() {
        const files = await fetch("tsp").then(res =>
            res.json()
        );

        this.setState({files});
    }

    updateSettings = (settings: ISidebarState) => {
        this.setState({settings});
    };

    startCalculations = async () => {
        this.setState({isWorking: true});

        const dataPoints = await fetch("tsp", {
            method: "POST",
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json;charset=UTF-8"
            },
            body: JSON.stringify(this.state.settings)
        }).then(res => res.json());

        this.setState({isWorking: false, dataPoints, currentChartFilename: this.state.settings.filename});
    };

    render() {
        return (
            <div className={styles.wrapper}>
                <Sidebar
                    isWorking={this.state.isWorking}
                    files={this.state.files}
                    updateSettings={this.updateSettings}
                    startCalculations={this.startCalculations}
                />
                {this.state.files ? (
                    <Content
                        currentChartFilename={this.state.currentChartFilename}
                        dataPoints={this.state.dataPoints}
                    />
                ) : ""}
            </div>
        );
    }
}

export default App;
