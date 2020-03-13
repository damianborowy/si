import React from "react";
import styles from "./style.module.scss";
import TSP from "../../models/TSP";
import CanvasJSReact from "../../canvasjs/canvasjs.react";
import OrderedCrossover from "../../models/crossing/OrderedCrossover";
import SwapMutation from "../../models/mutation/SwapMutation";
import ICrossing from "../../models/crossing/ICrossing";
import IMutation from "../../models/mutation/IMutation";
import ISelection from "../../models/selection/ISelection";
import RandomPopulation from "../../models/population/RandomPopulation";
import DataPoints from "../../models/DataPoints";
import Point from "../../models/Point";
import Population from "../../models/population/Population";
import GeneticPopulation from "../../models/population/GeneticPopulation";
import RouletteSelection from "../../models/selection/RouletteSelection";
import TournamentSelection from "../../models/selection/TournamentSelection";
import GreedyPopulation from "../../models/population/GreedyPopulation";
import PartiallyMatchedCrossover from "../../models/crossing/PartiallyMatchedCrossover";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface IContentProps {
    tsp: TSP;
    isWorking: boolean;
    toggleWorkingState: () => void;
}

interface IContentState {
    currentChartFilename: string;
    dataPoints: DataPoints;
}

export default class Content extends React.Component<
    IContentProps,
    IContentState
> {
    state: Readonly<IContentState> = {
        currentChartFilename: null,
        dataPoints: new DataPoints()
    };

    run(
        crossing: ICrossing,
        mutation: IMutation,
        selection: ISelection,
        popSize: number,
        generations: number,
        Px: number,
        PM: number
    ) {
        const dataPoints = new DataPoints();
        let population: Population = new RandomPopulation(
            popSize,
            this.props.tsp
        );

        this.evaluate(population, dataPoints);

        for (let i = 1; i < generations; i++) {
            const selectedPopulation = this.select(population, selection);
            const crossedPopulation = this.cross(
                selectedPopulation,
                crossing,
                Px
            );
            const mutatedPopulation = this.mutate(
                crossedPopulation,
                mutation,
                PM
            );

            this.evaluate(mutatedPopulation, dataPoints);
            population = mutatedPopulation;
        }

        this.setState({ dataPoints });
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

    componentDidUpdate(prevProps: IContentProps, prevState: IContentState) {
        if (
            this.state.currentChartFilename !== this.props.tsp.name &&
            this.props.isWorking
        ) {
            this.run(
                new PartiallyMatchedCrossover(),
                new SwapMutation(),
                new TournamentSelection(3),
                100,
                1000,
                0.75,
                0.15
            );

            this.setState({
                currentChartFilename: this.props.tsp.name
            });

            this.props.toggleWorkingState();
        }
    }

    calculateDataPoints = (size: number): DataPoints => {
        const best: Point[] = [];
        const worst: Point[] = [];
        const average: Point[] = [];

        for (let i = 0; i < this.props.tsp.dimension; i++) {
            best.push(new Point(i, i));
            worst.push(new Point(i, i + 5));
            average.push(new Point(i, i + 2));
        }

        return new DataPoints(best, worst, average);
    };

    render() {
        return (
            <div className={styles.content}>
                {this.props.tsp && this.state.dataPoints.best.length > 0 ? (
                    <CanvasJSChart
                        options={{
                            theme: "light2",
                            title: {
                                text: this.state.currentChartFilename
                            },
                            data: [
                                {
                                    type: "line",
                                    dataPoints: this.state.dataPoints.best,
                                    name: "Best",
                                    showInLegend: true
                                },
                                {
                                    type: "line",
                                    dataPoints: this.state.dataPoints.worst,
                                    name: "Worst",
                                    showInLegend: true
                                },
                                {
                                    type: "line",
                                    dataPoints: this.state.dataPoints.average,
                                    name: "Average",
                                    showInLegend: true
                                }
                            ]
                        }}
                    />
                ) : (
                    ""
                )}
            </div>
        );
    }
}
