import { Pieces } from "./Pieces.js"

export class Knight extends Pieces {
    #whiteKnight = "images/whiteKnight.png";
    #blackKnight = "images/blackKnight.png";

    constructor(color) {
        super(color);
    }

    getImage() {
        if (this.getColor() == "white") {
            return this.#whiteKnight;
        } else {
            return this.#blackKnight;
        }
    }
}