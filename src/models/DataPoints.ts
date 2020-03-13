import Point from "./Point";

export default class DataPoints {
    constructor(
        public best: Point[] = [],
        public worst: Point[] = [],
        public average: Point[] = []
    ) {}
}
