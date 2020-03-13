import ICrossing from "./ICrossing";
import Individual from "../Individual";

export default class OrderedCrossover implements ICrossing {
    evaluate(first: Individual, second: Individual): Individual {
        let firstIndex = ~~(Math.random() * first.towns.length);
        let secondIndex = ~~(Math.random() * second.towns.length);

        if (firstIndex > secondIndex)
            [firstIndex, secondIndex] = [secondIndex, firstIndex];

        const firstTowns = first.towns.slice(firstIndex, secondIndex);
        const firstTownsIndices = firstTowns.map(town => town.index);

        const towns = second.towns.filter(
            town => !firstTownsIndices.includes(town.index)
        );

        towns.splice(firstIndex, 0, ...firstTowns);

        return new Individual(towns);
    }
}
