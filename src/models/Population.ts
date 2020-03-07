import Agglomeration from "./Agglomeration";
import Individual from "./Individual";

export default class Population {
    constructor(
        public size: number,
        public agglomeration: Agglomeration,
        public specimens: Individual[] = []
    ) {
        if (!specimens) this.specimens = new Array<Individual>();
        this.createNewGeneration();
    }

    public createNewGeneration() {
        for (let i = 0; i < this.size; i++) {
            const specimen = new Individual(this.agglomeration.towns);
            specimen.shuffle();
            this.specimens.push(specimen);
        }
    }
}
