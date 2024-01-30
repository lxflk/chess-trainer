export class Pieces {
    #color;
    #x;
    #y;
    #chessboard;
    #hasMoved = false; // Zusätzliche Eigenschaft, um zu überprüfen, ob das Stück bereits bewegt wurde

    constructor(color, chessboard) {
        this.#color = color;
        this.#chessboard = chessboard;
        this.#x = -1; // Initialwert, wird durch setPosition gesetzt
        this.#y = -1; // Initialwert, wird durch setPosition gesetzt
    }

    getMoves() {
        // Diese Methode sollte in den abgeleiteten Klassen überschrieben werden
        throw new Error("getMoves() muss in abgeleiteten Klassen implementiert werden.");
    }

    getImage() {
        // Diese Methode sollte in den abgeleiteten Klassen überschrieben werden
        throw new Error("getImage() muss in abgeleiteten Klassen implementiert werden.");
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

    canMoveTo(x, y) {
        let moves = this.getMoves();
        return moves.some(move => move.x === x && move.y === y);
    }

    movePiece(x, y) {
        this.#hasMoved = true;
        this.setPosition(x, y);
    }

    getHasMoved() {
        return this.#hasMoved;
    }

    // Weitere allgemeine Methoden oder Eigenschaften für Schachfiguren können hier hinzugefügt werden
}
