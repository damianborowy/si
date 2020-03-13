import ICrossing from "./ICrossing";
import Individual from "../Individual";
import _ from "lodash";

export default class PartiallyMatchedCrossover implements ICrossing {
    evaluate(first: Individual, second: Individual): Individual {
        let firstIndex = ~~(Math.random() * first.towns.length);
        let secondIndex = ~~(Math.random() * second.towns.length);

        if (firstIndex > secondIndex)
            [firstIndex, secondIndex] = [secondIndex, firstIndex];

        const clone = _.cloneDeep(second);
        const subList = first.towns.slice(firstIndex, secondIndex);
        const cloneSubList = clone.towns.slice(firstIndex, secondIndex);

        for (let i = 0; i < subList.length; i++) {
            let j = clone.towns.indexOf(subList[i]);
            clone.towns[j] = cloneSubList[i];
            clone.towns[firstIndex + i] = subList[i];
        }

        return clone;
    }
}
