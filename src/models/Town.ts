export default class Town {
    constructor(public index: number, public x: number, public y: number) {}

    public static fromTSPString(townLine: string): Town {
        let line = townLine.split(/[ ]+/).filter(elem => /\S/.test(elem));

        return new Town(
            parseInt(line[0]),
            parseFloat(line[1]),
            parseFloat(line[2])
        );
    }

    public calculateDistance(otherTown: Town): number {
        const minX = Math.min(this.x, otherTown.x);
        const maxX = Math.max(this.x, otherTown.x);
        const minY = Math.min(this.y, otherTown.y);
        const maxY = Math.min(this.y, otherTown.y);

        return Math.sqrt((maxX - minX) ** 2 + (maxY - minY) ** 2);
    }
}
