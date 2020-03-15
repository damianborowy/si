import ISelection from "./ISelection";
import Population from "../population/Population";
import Individual from "../Individual";

export default class RouletteSelection implements ISelection {
    evaluate(population: Population): Individual {
        let maxLength = 0,
            minLength = Number.MAX_VALUE;

        population.individuals.forEach(individual => {
            const distance = individual.calculateTotalDistance();

            if (distance > maxLength) maxLength = distance;
            if (distance < minLength) minLength = distance;
        });

        let sumFitness = 0;
        population.individuals.forEach(
            individual =>
                (sumFitness +=
                    (minLength * 1) / individual.calculateTotalDistance())
        );

        let sum = 0;

        population.individuals.forEach(individual => {
            sum += (minLength * 1) / individual.calculateTotalDistance();

            if (Math.random() < sum) return individual;
        });

        throw new Error("Eh...");
    }
}
