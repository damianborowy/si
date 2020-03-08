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
        const visitedTowns = new Set<Town>();
        visitedTowns.add(startingTown);
        let currentTown = startingTown;

        while (visitedTowns.size < this.towns.length) {
            let minDistance = Number.MAX_VALUE;
            let minTown;

            for (let town of this.towns) {
                if (visitedTowns.has(town)) continue;

                const distance = currentTown.calculateDistance(town);
                if (distance < minDistance) {
                    minDistance = distance;
                    minTown = town;
                }
            }

            if (!minTown) throw new Error("Haven't found the closest town");

            visitedTowns.add(minTown);
            currentTown = minTown;
        }

        this.towns = Array.from(visitedTowns);
    }

    public calculateTotalDistance() {
        let sum = 0;

        for (let i = 0; i < this.towns.length - 1; i++)
            sum += this.towns[i].calculateDistance(this.towns[i + 1]);

        sum += this.towns[0].calculateDistance(
            this.towns[this.towns.length - 1]
        );

        return Math.round((sum + Number.EPSILON) * 100) / 100;
    }
}
