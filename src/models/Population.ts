import TSP from "./TSP";
import Individual from "./Individual";

export default class Population {
    constructor(
        public size: number,
        public tsp: TSP,
        public specimens: Individual[] = []
    ) {}
}
