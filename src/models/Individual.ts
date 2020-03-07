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

    public makeGreedy(startingTown: Town) {
        const visitedTowns = new Array<Town>();
        visitedTowns.push(startingTown);
        let currentTown = startingTown;

        while (visitedTowns.length < this.towns.length) {
            let minDistance = Number.MAX_VALUE;
            let minTown;

            for (let town of this.towns) {
                if (visitedTowns.includes(town)) continue;

                const distance = currentTown.calculateDistance(town);
                if (distance < minDistance) {
                    minDistance = distance;
                    minTown = town;
                }
            }

            if (!minTown) throw new Error("Haven't found the closest town");

            visitedTowns.push(minTown);
            currentTown = minTown;
        }

        this.towns = visitedTowns;
    }

    public calculateTotalDistance() {
        let sum = 0;

        for (let i = 0; i < this.towns.length - 1; i++)
            sum += this.towns[i].calculateDistance(this.towns[i + 1]);

        sum += this.towns[0].calculateDistance(
            this.towns[this.towns.length - 1]
        );

        return sum;
    }
}
