import React from "react";
import TSP from "../models/TSP";
import styles from "./App.module.scss";
import Sidebar, {ISidebarState} from "./Sidebar";
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

        console.log(files);

        this.setState({files});
    }

    updateSettings = (settings: ISidebarState) => {
        this.setState({settings});
    };

    startCalculations = async () => {
        // const {
        //     populationSize,
        //     generations,
        //     selectionAlgorithm,
        //     crossingAlgorithm,
        //     mutationAlgorithm,
        //     Px,
        //     Pm
        // } = this.state.settings;

        // const dataPoints = new DataPoints();
        // let population: Population = new RandomPopulation(
        //     populationSize,
        //     this.state.selectedTSP
        // );

        // this.evaluate(population, dataPoints);

        // for (let i = 1; i < generations; i++) {
        //     const selectedPopulation = this.select(
        //         population,
        //         selectionAlgorithm
        //     );
        //     const crossedPopulation = this.cross(
        //         selectedPopulation,
        //         crossingAlgorithm,
        //         Px
        //     );
        //     const mutatedPopulation = this.mutate(
        //         crossedPopulation,
        //         mutationAlgorithm,
        //         Pm
        //     );

        //     this.evaluate(mutatedPopulation, dataPoints);
        //     population = mutatedPopulation;
        // }

        // this.setState({ dataPoints });

        const dataPoints = await fetch("tsp", {
            method: "POST",
            body: JSON.stringify(this.state.settings)
        }).then(res => res.json());

        this.setState({dataPoints});
    };

    select(population: Population, selectionAlgorithm: ISelection): Population {
        const selectedPopulation = new GeneticPopulation();

        population.individuals.forEach(() => {
            selectedPopulation.individuals.push(
                selectionAlgorithm.evaluate(population)
            );
        });

        return selectedPopulation;
    }

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

            if (Math.random() <= Px)
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
            if (Math.random() <= PM)
                mutatedPopulation.individuals.push(
                    mutationAlgorithm.evaluate(individual)
                );
            else mutatedPopulation.individuals.push(individual);
        });

        return mutatedPopulation;
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
                Math.round(
                    (population.calculateAverageDistance() + Number.EPSILON) *
                    100
                ) / 100
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
