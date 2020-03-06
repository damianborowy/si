export default class Town {
    constructor(public index: number, public x: number, public y: number) {}

    public static fromTSPString(townLine: string): Town {
        const line = townLine.split(/[ ]+/);

        return new Town(
            parseInt(line[0]),
            parseFloat(line[1]),
            parseFloat(line[2])
        );
    }
}
