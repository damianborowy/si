import Population from "../population/Population";
import Individual from "../Individual";

export default interface ISelection {
    evaluate(population: Population): Individual;
}
