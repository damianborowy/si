import TSP from "../TSP";
import Individual from "../Individual";

export default abstract class Population {
    public individuals: Individual[];

    constructor(public size: number, public tsp: TSP) {
        if (!tsp) {
            this.individuals = [];
            return;
        }

        if (size > tsp.dimension) this.size = tsp.dimension;

        this.individuals = new Array<Individual>(this.size)
            .fill(undefined!)
            .map(() => new Individual(this.tsp.towns));

        this.initialize();
    }

    protected abstract initialize(): void;

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
