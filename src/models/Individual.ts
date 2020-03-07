import Town from "./Town";

export default class Individual {
    public towns: Town[];

    constructor(towns: Town[]) {
        this.towns = [...towns];
    }

    public shuffle() {
        for (let i = this.towns.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.towns[i], this.towns[j]] = [this.towns[j], this.towns[i]];
        }
    }

    public makeGreedy(startingTown: Town) {}

    public calculateTotalDistance() {
        let sum = 0;

        for (let i = 0; i < this.towns.length - 1; i++)
            sum += this.towns[i].calculateDistance(this.towns[i + 1]);

        return sum;
    }
}
