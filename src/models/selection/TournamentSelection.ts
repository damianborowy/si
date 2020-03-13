import ISelection from "./ISelection";
import Population from "../population/Population";
import Individual from "../Individual";
import _ from "lodash";

export default class TournamentSelection implements ISelection {
    constructor(public n: number) {}

    evaluate(population: Population): Individual {
        if (this.n > population.individuals.length)
            this.n = population.individuals.length;

        // const randomIndividuals = new Array<Individual>(this.n)
        //     .fill(null)
        //     .map(
        //         () => population.individuals[~~(Math.random() * this.n)]
        //     );

        // const distances = randomIndividuals.map(individual =>
        //     individual.calculateTotalDistance()
        // );

        // const bestDistance = Math.min(...distances);
        // const bestIndividualIndex = distances.findIndex(
        //     distance => bestDistance === distance
        // );

        // return _.cloneDeep(randomIndividuals[bestIndividualIndex]);

        const chosenIndividualIndices = [];
        for (let i = 0; i < this.n; i++)
            chosenIndividualIndices.push(
                ~~(Math.random() * population.individuals.length)
            );

        let chosenIndex = chosenIndividualIndices[0];
        let individual = population.individuals[chosenIndex];
        let minDistance = individual.calculateTotalDistance();

        for (let i = 0; i < chosenIndividualIndices.length; i++) {
            let individualIndex = chosenIndividualIndices[i];
            individual = population.individuals[individualIndex];
            const distance = individual.calculateTotalDistance();

            if (distance < minDistance) {
                chosenIndex = individualIndex;
                minDistance = distance;
            }
        }

        return _.cloneDeep(population.individuals[chosenIndex]);
    }
}
