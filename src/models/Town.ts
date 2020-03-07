export default class Town {
    private constructor(
        public index: number,
        public x: number,
        public y: number,
        public edgeWeightType: string
    ) {}

    public static fromTSPString(
        townLine: string,
        edgeWeightType: string
    ): Town {
        let line = townLine.split(/[ ]+/).filter(elem => /\S/.test(elem));

        return new Town(
            parseInt(line[0]),
            parseFloat(line[1]),
            parseFloat(line[2]),
            edgeWeightType
        );
    }

    public calculateDistance(otherTown: Town): number {
        if (this.edgeWeightType === "EUC_2D")
            return this.calculateEuc2D(otherTown);
        else if (this.edgeWeightType === "GEO")
            return this.calculateGeo(otherTown);
        else throw new TypeError("Invalid agglomeration type");
    }

    private calculateEuc2D(otherTown: Town) {
        return Math.sqrt(
            (this.x - otherTown.x) ** 2 + (this.y - otherTown.y) ** 2
        );
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
