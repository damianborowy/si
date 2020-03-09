import React from "react";
import styles from "./style.module.scss";
import TSP from "../../models/TSP";
import Population from "../../models/Population";

interface IContentProps {
    tsp: TSP;
}

interface IContentState {
    randomBest: string;
    randomWorst: string;
    randomAvg: string;
    greedyBest: string;
    greedyWorst: string;
    greedyAvg: string;
}

export default class Content extends React.Component<
    IContentProps,
    IContentState
> {
    state: Readonly<IContentState> = {
        randomBest: "",
        randomWorst: "",
        randomAvg: "",
        greedyBest: "",
        greedyWorst: "",
        greedyAvg: ""
    };

    componentWillReceiveProps(nextProps: IContentProps) {
        const randomsPopulation = new Population(randomsCount, nextProps.tsp);
        randomsPopulation.makeRandom();

        const greedsPopulation = new Population(greedsCount, nextProps.tsp);
        greedsPopulation.makeGreedy();

        console.log(randomsPopulation, greedsPopulation, nextProps.tsp);

        this.setState({
            randomBest: randomsPopulation.calculateBestDistance().toFixed(2),
            randomWorst: randomsPopulation.calculateWorstDistance().toFixed(2),
            randomAvg: randomsPopulation.calculateAverageDistance().toFixed(2),
            greedyBest: greedsPopulation.calculateBestDistance().toFixed(2),
            greedyWorst: greedsPopulation.calculateWorstDistance().toFixed(2),
            greedyAvg: greedsPopulation.calculateAverageDistance().toFixed(2)
        });
    }

    render() {
        return (
            <div className={styles.content}>
                <p>
                    Random population size: {randomsCount}
                    <br />
                    Shortest distance: {this.state.randomBest}
                    <br />
                    Average distance: {this.state.randomAvg}
                    <br />
                    Longest distance: {this.state.randomWorst}
                </p>
                <p>
                    Greedy population size: {greedsCount}
                    <br />
                    Shortest distance: {this.state.greedyBest}
                    <br />
                    Average distance: {this.state.greedyAvg}
                    <br />
                    Longest distance: {this.state.greedyWorst}
                </p>
            </div>
        );
    }
}

const randomsCount = 1000;
const greedsCount = 10;
