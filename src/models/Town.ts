export default class Town {
    constructor(
        public index: number,
        public x: number,
        public y: number,
        public type: string
    ) {}

    public static fromTSPString(townLine: string, type: string): Town {
        let line = townLine.split(/[ ]+/).filter(elem => /\S/.test(elem));

        return new Town(
            parseInt(line[0]),
            parseFloat(line[1]),
            parseFloat(line[2]),
            type
        );
    }

    public calculateDistance(otherTown: Town): number {
        if (this.type === "EUC_2D") return this.calculateEuc2D(otherTown);
        else if (this.type === "GEO") return this.calculateGeo(otherTown);
        else throw new TypeError("Invalid agglomeration type");
    }

    private calculateEuc2D(otherTown: Town) {
        const minX = Math.min(this.x, otherTown.x);
        const maxX = Math.max(this.x, otherTown.x);
        const minY = Math.min(this.y, otherTown.y);
        const maxY = Math.min(this.y, otherTown.y);
        return Math.sqrt((maxX - minX) ** 2 + (maxY - minY) ** 2);
    }

    private calculateGeo(otherTown: Town) {
        let deg = Math.floor(this.x);
        let min = this.x - deg;
        const latitudeI = (Math.PI * (deg + (5.0 * min) / 3.0)) / 180.0;

        deg = Math.floor(this.y);
        min = this.y - deg;
        const longitudeI = (Math.PI * (deg + (5.0 * min) / 3.0)) / 180.0;

        deg = Math.floor(otherTown.x);
        min = otherTown.x - deg;
        const latitudeJ = (Math.PI * (deg + (5.0 * min) / 3.0)) / 180.0;

        deg = Math.floor(otherTown.y);
        min = otherTown.y - deg;
        const longitudeJ = (Math.PI * (deg + (5.0 * min) / 3.0)) / 180.0;

        const RRR = 6378.388;
        const q1 = Math.cos(longitudeI - longitudeJ);
        const q2 = Math.cos(latitudeI - latitudeJ);
        const q3 = Math.cos(latitudeI + latitudeJ);
        return Math.round(
            RRR * Math.acos(0.5 * ((1.0 + q1) * q2 - (1.0 - q1) * q3)) + 1.0
        );
    }
}
