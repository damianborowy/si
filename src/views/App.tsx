import React from "react";
import TSP from "../models/TSP";
import styles from "./App.module.scss";
import Sidebar from "./Sidebar";
import Content from "./Content";

interface IAppState {
    tsps: TSP[];
    selectedTSP: TSP;
}

class App extends React.Component<{}, IAppState> {
    state: Readonly<IAppState> = {
        tsps: [],
        selectedTSP: null!
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

    render() {
        return (
            <div className={styles.wrapper}>
                <Sidebar
                    filenamesList={files}
                    onButtonClick={this.onSidebarButtonClick}
                />
                <Content tsp={this.state.selectedTSP} />
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
