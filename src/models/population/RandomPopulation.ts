import Population from "./Population";

export default class RandomPopulation extends Population {
    protected initialize(): void {
        this.individuals.forEach(individual => individual.shuffle());
    }
}
