import { Pieces } from "./Pieces.js"

export class King extends Pieces {
    #whiteKing = "images/whiteKing.png";
    #blackKing = "images/blackKing.png";

    constructor(color) {
        super(color);
    }

    getImage() {
        if (this.getColor() == "white") {
            return this.#whiteKing;
        } else {
            return this.#blackKing;
        }
    }
}