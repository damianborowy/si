import IMutation from "./IMutation";
import Individual from "../Individual";
import _ from "lodash";

export default class InversionMutation implements IMutation {
    evaluate(individual: Individual): Individual {
        let firstIndex = ~~(Math.random() * individual.towns.length);
        let secondIndex = ~~(Math.random() * individual.towns.length);

        if (firstIndex > secondIndex)
            [firstIndex, secondIndex] = [secondIndex, firstIndex];

        const clone = _.cloneDeep(individual);

        const subList = individual.towns
            .slice(firstIndex, secondIndex)
            .reverse();
        const indicesSubSet = new Set(subList.map(town => town.index));

        clone.towns = clone.towns.filter(
            town => !indicesSubSet.has(town.index)
        );

        clone.towns.push(...subList);

        return clone;
    }
}
