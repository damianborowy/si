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

    private calculateEuc2D(otherTown: Town): number {
        return Math.sqrt(
            (this.x - otherTown.x) ** 2 + (this.y - otherTown.y) ** 2
        );
    }

    private calculateGeo(otherTown: Town): number {
        const latitudeI = (Math.PI * (2 * this.x)) / 180.0;
        const longitudeI = (Math.PI * (2 * this.y)) / 180.0;
        const latitudeJ = (Math.PI * (2 * otherTown.x)) / 180.0;
        const longitudeJ = (Math.PI * (2 * otherTown.y)) / 180.0;

        const R = 6378.388;
        const q1 = Math.cos(longitudeI - longitudeJ);
        const q2 = Math.cos(latitudeI - latitudeJ);
        const q3 = Math.cos(latitudeI + latitudeJ);
        return R * Math.acos(0.5 * ((1.0 + q1) * q2 - (1.0 - q1) * q3)) + 1.0;
    }
}
