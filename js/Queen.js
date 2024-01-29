import { Pieces } from "./Pieces.js"

export class Queen extends Pieces {
    #whiteQueen = "images/whiteQueen.png";
    #blackQueen = "images/blackQueen.png";

    constructor(color) {
        super(color);
    }

    getImage() {
        if (this.getColor() == "white") {
            return this.#whiteQueen;
        } else {
            return this.#blackQueen;
        }
    }
}