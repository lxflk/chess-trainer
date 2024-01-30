import { Pieces } from "./Pieces.js";

export class Pawn extends Pieces {
    #whitePawn = "images/whitePawn.png";
    #blackPawn = "images/blackPawn.png";

    constructor(color, chessboard) {
        super(color, chessboard);
    }

    getImage() {
        if (this.getColor() === "white") {
            return this.#whitePawn;
        } else {
            return this.#blackPawn;
        }
    }

    getMoves() {
        let moves = [];
        let direction = this.getColor() === "white" ? -1 : 1; // Weiß bewegt sich nach oben, Schwarz nach unten

        let board = this.getBoard();
        let x = this.getX();
        let y = this.getY();

        // Normaler Zug
        if (board.getPiece(x, y + direction) === null) {
            moves.push({ x: x, y: y + direction });
        }

        // Erster Zug: Zwei Felder vorwärts
        if ((this.getColor() === "white" && y === 6) || (this.getColor() === "black" && y === 1)) {
            if (board.getPiece(x, y + direction * 2) === null && board.getPiece(x, y + direction) === null) {
                moves.push({ x: x, y: y + direction * 2 });
            }
        }

        // Schräge Züge für das Schlagen gegnerischer Figuren
        if (x > 0 && board.getPiece(x - 1, y + direction) !== null && board.getPiece(x - 1, y + direction).getColor() !== this.getColor()) {
            moves.push({ x: x - 1, y: y + direction });
        }
        if (x < 7 && board.getPiece(x + 1, y + direction) !== null && board.getPiece(x + 1, y + direction).getColor() !== this.getColor()) {
            moves.push({ x: x + 1, y: y + direction });
        }

        return moves;
    }
}
