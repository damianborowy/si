import Agglomeration from "./Agglomeration";
import Specimen from "./Specimen";

export default class Population {
    constructor(
        public size: number,
        public agglomeration: Agglomeration,
        public specimens: Specimen[] = []
    ) {
        if (!specimens) this.specimens = new Array<Specimen>();
        this.createNewGeneration();
    }

    public createNewGeneration() {
        for (let i = 0; i < this.size; i++) {
            const specimen = new Specimen(this.agglomeration.towns);
            specimen.shuffle();
            this.specimens.push(specimen);
        }
    }
}
