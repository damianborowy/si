import Individual from "../Individual";

export default interface IMutation {
    evaluate(individual: Individual): Individual;
}
