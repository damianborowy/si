import Agglomeration from "./Agglomeration";
import Individual from "./Individual";

export default class Population {
    constructor(
        public size: number,
        public agglomeration: Agglomeration,
        public specimens: Individual[] = []
    ) {}
}
