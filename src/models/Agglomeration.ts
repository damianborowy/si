import Town from "./Town";

export default class Agglomeration {
    constructor(
        public name: string,
        public type: string,
        public comment: string,
        public dimension: number,
        public edgeWeightType: string,
        public displayDataType: string,
        public towns: Town[]
    ) {}

    public static fromTSP(fileAsText: string): Agglomeration {
        const linesArray: string[] = fileAsText.split("\n");

        const dimension = parseInt(linesArray[3].split(": ")[1]);

        return new Agglomeration(
            linesArray[0].split(": ")[1],
            linesArray[1].split(": ")[1],
            linesArray[2].split(": ")[1],
            dimension,
            linesArray[4].split(": ")[1],
            linesArray[5].split(": ")[1],
            this.createTowns(linesArray.slice(6, 6 + dimension))
        );
    }

    static createTowns = (lines: string[]): Town[] => {
        const towns: Town[] = [];

        lines.forEach(line => {
            towns.push(Town.fromTSPString(line));
        });

        return towns;
    };
}
