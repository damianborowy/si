import React from "react";
import Agglomeration from "../models/Agglomeration";

interface IAppState {
    agglomerations: Agglomeration[];
}

class App extends React.Component<{}, IAppState> {
    state: Readonly<IAppState> = { agglomerations: [] };

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

        this.setState({ agglomerations });
    }

    render() {
        return <p>Lala</p>;
    }
}

const files: string[] = [
    "ali535",
    "berlin11_modified",
    "berlin52",
    "fl417",
    "gr666",
    "kroA100",
    "kroA150",
    "kroA200",
    "nrw1379",
    "pr2392"
];

export default App;
