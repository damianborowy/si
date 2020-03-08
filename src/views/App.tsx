import React from "react";
import Agglomeration from "../models/Agglomeration";
import styles from "./App.module.scss";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Individual from "../models/Individual";

interface IAppState {
    agglomerations: Agglomeration[];
    selectedAgglomeration: Agglomeration;
}

class App extends React.Component<{}, IAppState> {
    state: Readonly<IAppState> = {
        agglomerations: [],
        selectedAgglomeration: null!
    };

    async componentDidMount() {
        const fetchedFiles = await Promise.all(
            files.map(
                async file =>
                    await fetch(`tsp/${file}.tsp`).then(res => res.text())
            )
        );

        const agglomerations = fetchedFiles.map(fetchedFile =>
            Agglomeration.fromTSP(fetchedFile)
        );

        this.setState({
            agglomerations,
            selectedAgglomeration: agglomerations[0]
        });
    }

    onSidebarButtonClick = (filename: string) => {
        const agglomeration = this.state.agglomerations.find(
            agglomeration => agglomeration.name === filename
        );

        if (!agglomeration) throw new Error("Incorrect agglomeration name");

        this.setState({ selectedAgglomeration: agglomeration });
    };

    componentDidUpdate() {
        const individual = new Individual(
            this.state.selectedAgglomeration.towns
        );

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
                <Content agglomeration={this.state.selectedAgglomeration} />
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
