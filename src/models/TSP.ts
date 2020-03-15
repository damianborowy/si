import Town from "./Town";

export default class TSP {
    private constructor(
        public name: string,
        public type: string,
        public comment: string,
        public dimension: number,
        public edgeWeightType: string,
        public displayDataType: string,
        public towns: Town[]
    ) {}

    public static fromFile(fileAsText: string): TSP {
        const linesArray: string[] = fileAsText.split("\n");

        const dimension = parseInt(linesArray[3].split(": ")[1]);
        const edgeWeightType = linesArray[4].split(": ")[1];

        return new TSP(
            linesArray[0].split(": ")[1],
            linesArray[1].split(": ")[1],
            linesArray[2].split(": ")[1],
            dimension,
            edgeWeightType,
            linesArray[5].split(": ")[1],
            this.createTowns(linesArray.slice(7, 7 + dimension), edgeWeightType)
        );
    }

    private static createTowns = (
        lines: string[],
        edgeWeightType: string
    ): Town[] => {
        const towns: Town[] = [];

        lines.forEach(line => {
            towns.push(Town.fromTSPString(line, edgeWeightType));
        });

        return towns;
    };
}