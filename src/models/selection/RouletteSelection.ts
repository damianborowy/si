import ISelection from "./ISelection";
import Population from "../population/Population";
import Individual from "../Individual";

export default class RouletteSelection implements ISelection {
    evaluate(population: Population): Individual {
        let sum = 0;

        population.individuals.forEach(
            individual =>
                (sum += 1 / Math.pow(individual.calculateTotalDistance(), 10))
        );

        const random = Math.random() * sum;
        let sum2 = 0;

        population.individuals.forEach(individual => {
            sum2 += 1 / Math.pow(individual.calculateTotalDistance(), 10);

            if (sum2 >= random) return individual;
        });

        return null;
    }
}
