import { Pieces } from "./Pieces.js"

export class Rook extends Pieces {
    #whiteRook = "images/whiteRook.png";
    #blackRook = "images/blackRook.png";

    constructor(color) {
        super(color);
    }

    getImage() {
        if (this.getColor() == "white") {
            return this.#whiteRook;
        } else {
            return this.#blackRook;
        }
    }
}