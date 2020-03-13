import React from "react";
import TSP from "../models/TSP";
import styles from "./App.module.scss";
import Sidebar, { ISidebarState } from "./Sidebar";
import Content from "./Content";

interface IAppState {
    tsps: TSP[];
    selectedTSP: TSP;
    isWorking: boolean;
    settings: ISidebarState;
}

class App extends React.Component<{}, IAppState> {
    state: Readonly<IAppState> = {
        tsps: [],
        selectedTSP: null!,
        isWorking: false,
        settings: null
    };

    async componentDidMount() {
        const fetchedFiles = await Promise.all(
            files.map(
                async file =>
                    await fetch(`tsp/${file}.tsp`).then(res => res.text())
            )
        );

        const tsps = fetchedFiles.map(fetchedFile => TSP.fromFile(fetchedFile));

        this.setState({
            tsps: tsps,
            selectedTSP: tsps[0]
        });
    }

    onSidebarButtonClick = (filename: string) => {
        const tsp = this.state.tsps.find(tsp => tsp.name === filename);

        if (!tsp) throw new Error("Incorrect agglomeration name");

        this.setState({ selectedTSP: tsp });
    };

    toggleWorkingState = () => {
        this.setState({ isWorking: !this.state.isWorking });
    };

    render() {
        return (
            <div className={styles.wrapper}>
                <Sidebar
                    filenamesList={files}
                    isWorking={this.state.isWorking}
                    toggleWorkingState={this.toggleWorkingState}
                    onFilenameChange={this.onSidebarButtonClick}
                />
                {this.state.selectedTSP ? (
                    <Content
                        tsp={this.state.selectedTSP}
                        isWorking={this.state.isWorking}
                        toggleWorkingState={this.toggleWorkingState}
                    />
                ) : (
                    ""
                )}
            </div>
        );
    }
}

const files: string[] = [
    "berlin11_modified",
    "berlin52",
    "kroA100",
    "kroA150",
    "kroA200",
    "fl417",
    "ali535",
    "gr666",
    "nrw1379",
    "pr2392"
];

export default App;
