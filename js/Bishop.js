import { Pieces } from "./Pieces.js"

export class Bishop extends Pieces {
    #whiteBishop = "images/whiteBishop.png";
    #blackBishop = "images/blackBishop.png";

    constructor(color) {
        super(color);
    }

    getImage() {
        if (this.getColor() == "white") {
            return this.#whiteBishop;
        } else {
            return this.#blackBishop;
        }
    }
}