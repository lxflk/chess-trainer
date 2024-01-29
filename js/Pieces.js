export class Pieces {
    #color;
    #x;
    #y;
    #chessboard;
    constructor(color, chessboard) {
        this.#color = color;
        this.#chessboard = chessboard;
    }

    getMoves() {

    }

    move() {

    }

    getImage() {

    }

    getColor() {
        return this.#color;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    getBoard() {
        return this.#chessboard;
    }

    setPosition(x, y) {
        this.#x = x;
        this.#y = y;
    }
}