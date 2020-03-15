import Population from "./Population";

export default class GreedyPopulation extends Population {
    protected initialize(): void {
        const randomArray = new Array(this.size)
            .fill(0)
            .map(() => ~~(Math.random() * this.tsp.towns.length));

        this.individuals.forEach((individual, index) => {
            individual.makeGreedy(individual.towns[randomArray[index]]);
        });
    }
}
