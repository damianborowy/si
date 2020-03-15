import Individual from "../Individual";

export default interface ICrossing {
    evaluate(first: Individual, second: Individual): Individual;
}
