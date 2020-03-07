import React from "react";
import Agglomeration from "../models/Agglomeration";
import Population from "../models/Population";

interface IAppState {
    agglomerations: Agglomeration[];
    selectedAgglomeration: Agglomeration;
    population: Population;
}

class App extends React.Component<{}, IAppState> {
    state: Readonly<IAppState> = {
        agglomerations: [],
        selectedAgglomeration: null!,
        population: null!
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
            selectedAgglomeration: agglomerations[0],
            population: new Population(50, agglomerations[0])
        });
    }

    render() {
        return <p>aaaa</p>;
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
