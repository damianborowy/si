import TSP from "./TSP";
import Individual from "./Individual";

export default class Population {
    public individuals: Individual[];

    constructor(public size: number, public tsp: TSP) {
        this.individuals = new Array<Individual>(this.size)
            .fill(undefined!)
            .map(() => new Individual(this.tsp.towns));
    }

    public makeRandom() {
        this.individuals.forEach(individual => individual.shuffle());
    }

    public makeGreedy() {
        const randomArray = new Array(this.size)
            .fill(0)
            .map(() => Math.floor(Math.random() * this.tsp.towns.length));

        this.individuals.forEach((individual, index) => {
            individual.makeGreedy(individual.towns[randomArray[index]]);
        });
    }

    public calculateBestDistance(): number {
        const distances = this.individuals.map(individual =>
            individual.calculateTotalDistance()
        );

        return Math.min(...distances);
    }

    public calculateAverageDistance(): number {
        const distances = this.individuals.map(individual =>
            individual.calculateTotalDistance()
        );

        return distances.reduce((a, b) => a + b, 0) / distances.length;
    }

    public calculateWorstDistance(): number {
        const distances = this.individuals.map(individual =>
            individual.calculateTotalDistance()
        );

        return Math.max(...distances);
    }
}
