import { Pieces } from "./Pieces.js"

export class Pawn extends Pieces {
    #whitePawn = "images/whitePawn.png";
    #blackPawn = "images/blackPawn.png";

    constructor(color, chessboard) {
        super(color, chessboard);
    }

    getImage() {
        if (this.getColor() == "white") {
            return this.#whitePawn;
        } else {
            return this.#blackPawn;
        }
    }

    getMoves() {
        let moves = [];
        let direction = this.getColor() === "white" ? -1 : 1;

        let board = this.getBoard();
        let x = this.getX();
        let y = this.getY();

        //Normaler Zug
        if (board.getPiece(x + direction, y) === null) {
            moves.push({ x: x + direction, y: y });
        }

        // Erster Zug: Zwei Felder vorwärts
        if (this.getColor() === "white" && x == 6 || (this.getColor() === "black" && x === 1)) {
            if (board.getPiece(x + direction * 2, y) === null && board.getPiece(x + direction, y) === null) {
                moves.push({ x: x + direction * 2, y: y });
            }
        }

        // Schräge Züge für das Schlagen gegnerischer Figuren
        if (y > 0 && board.getPiece(x + direction, y - 1) !== null && board.getPiece(x + direction, y - 1).getColor() !== this.getColor()) {
            moves.push({ x: x + direction, y: y - 1 });
        }
        if (y < 7 && board.getPiece(x + direction, y + 1) !== null && board.getPiece(x + direction, y + 1).getColor() !== this.getColor()) {
            moves.push({ x: x + direction, y: y + 1 });
        }

        return moves;
    }


}