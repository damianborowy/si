import React from "react";
import TSP from "../models/TSP";
import styles from "./App.module.scss";
import Sidebar, { ISidebarState } from "./Sidebar";
import Content from "./Content";
import DataPoints from "../models/DataPoints";
import Population from "../models/population/Population";
import RandomPopulation from "../models/population/RandomPopulation";
import GeneticPopulation from "../models/population/GeneticPopulation";
import Point from "../models/Point";
import ICrossing from "../models/crossing/ICrossing";
import IMutation from "../models/mutation/IMutation";
import ISelection from "../models/selection/ISelection";

interface IAppState {
    tsps: TSP[];
    selectedTSP: TSP;
    isWorking: boolean;
    settings: ISidebarState;
    dataPoints: DataPoints;
    currentChartFilename: string;
}

class App extends React.Component<{}, IAppState> {
    state: Readonly<IAppState> = {
        tsps: [],
        selectedTSP: null!,
        isWorking: false,
        settings: null,
        dataPoints: new DataPoints(),
        currentChartFilename: null
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

    updateSettings = (settings: ISidebarState) => {
        this.setState({ settings });
    };

    onSidebarButtonClick = (filename: string) => {
        const tsp = this.state.tsps.find(tsp => tsp.name === filename);

        if (!tsp) throw new Error("Incorrect agglomeration name");

        this.setState({ selectedTSP: tsp });
    };

    startCalculations = () => {
        const {
            populationSize,
            generations,
            selectionAlgorithm,
            crossingAlgorithm,
            mutationAlgorithm,
            Px,
            Pm
        } = this.state.settings;

        const dataPoints = new DataPoints();
        let population: Population = new RandomPopulation(
            populationSize,
            this.state.selectedTSP
        );

        this.evaluate(population, dataPoints);

        for (let i = 1; i < generations; i++) {
            const selectedPopulation = this.select(
                population,
                selectionAlgorithm
            );
            const crossedPopulation = this.cross(
                selectedPopulation,
                crossingAlgorithm,
                Px
            );
            const mutatedPopulation = this.mutate(
                crossedPopulation,
                mutationAlgorithm,
                Pm
            );

            this.evaluate(mutatedPopulation, dataPoints);
            population = mutatedPopulation;
            console.log(population);
        }

        this.setState({ dataPoints });
    };

    cross(
        population: Population,
        crossingAlgorithm: ICrossing,
        Px: number
    ): Population {
        const crossedPopulation = new GeneticPopulation();

        population.individuals.forEach(individual => {
            const randomIndex = ~~(
                Math.random() * population.individuals.length
            );

            if (Math.random() > Px)
                crossedPopulation.individuals.push(
                    crossingAlgorithm.evaluate(
                        individual,
                        population.individuals[randomIndex]
                    )
                );
            else crossedPopulation.individuals.push(individual);
        });

        return crossedPopulation;
    }

    mutate(
        population: Population,
        mutationAlgorithm: IMutation,
        PM: number
    ): Population {
        const mutatedPopulation = new GeneticPopulation();

        population.individuals.forEach(individual => {
            if (Math.random() > PM)
                mutatedPopulation.individuals.push(individual);
            else
                mutatedPopulation.individuals.push(
                    mutationAlgorithm.evaluate(individual)
                );
        });

        return mutatedPopulation;
    }

    select(population: Population, selectionAlgorithm: ISelection): Population {
        const selectedPopulation = new GeneticPopulation();

        population.individuals.forEach(() => {
            selectedPopulation.individuals.push(
                selectionAlgorithm.evaluate(population)
            );
        });

        return selectedPopulation;
    }

    evaluate(population: Population, dataPoints: DataPoints) {
        dataPoints.best.push(
            new Point(
                dataPoints.best.length,
                population.calculateBestDistance()
            )
        );
        dataPoints.average.push(
            new Point(
                dataPoints.average.length,
                population.calculateAverageDistance()
            )
        );
        dataPoints.worst.push(
            new Point(
                dataPoints.worst.length,
                population.calculateWorstDistance()
            )
        );
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <Sidebar
                    filenamesList={files}
                    isWorking={this.state.isWorking}
                    updateSettings={this.updateSettings}
                    startCalculations={this.startCalculations}
                />
                {this.state.selectedTSP ? (
                    <Content
                        currentChartFilename={this.state.currentChartFilename}
                        dataPoints={this.state.dataPoints}
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
