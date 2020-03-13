import IMutation from "./IMutation";
import Individual from "../Individual";
import _ from "lodash";

export default class SwapMutation implements IMutation {
    evaluate(individual: Individual): Individual {
        let firstIndex = ~~(Math.random() * individual.towns.length);
        let secondIndex = ~~(Math.random() * individual.towns.length);

        const clone = _.cloneDeep(individual);

        const temp = clone.towns[firstIndex];
        clone.towns[firstIndex] = clone.towns[secondIndex];
        clone.towns[secondIndex] = temp;

        return clone;
    }
}
