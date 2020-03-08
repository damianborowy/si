import React from "react";
import TSP from "../models/TSP";
import styles from "./App.module.scss";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Individual from "../models/Individual";

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

    componentDidUpdate() {
        const individual = new Individual(this.state.selectedTSP.towns);

        const distances = individual.towns.map(town => {
            individual.makeGreedy(town);
            return individual.calculateTotalDistance();
        });

        const minDistance = Math.min(...distances);
        console.log(
            `Found minimum distance of ${minDistance} for town's index ${distances.indexOf(
                minDistance
            )}`
        );
    }

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
    "fl417",
    "ali535",
    "gr666",
    "kroA100",
    "kroA150",
    "kroA200",
    "nrw1379",
    "pr2392"
];

export default App;
