import { Pieces } from "./Pieces.js";

export class Rook extends Pieces {
    #whiteRook = "images/whiteRook.png";
    #blackRook = "images/blackRook.png";
    #hasMoved = false;

    constructor(color, board) {
        super(color, board);
    }

    getImage() {
        if (this.getColor() === "white") {
            return this.#whiteRook;
        } else {
            return this.#blackRook;
        }
    }

    getMoves() {
        let moves = [];
        let board = this.getBoard();
        let x = this.getX();
        let y = this.getY();

        // Prüfen der Züge nach oben (y abnehmend)
        for (let j = y - 1; j >= 0; j--) {
            if (board.getPiece(x, j) === null) {
                moves.push({ x, y: j });
            } else {
                if (board.getPiece(x, j).getColor() !== this.getColor()) {
                    moves.push({ x, y: j });
                }
                break;
            }
        }

        // Prüfen der Züge nach unten (y zunehmend)
        for (let j = y + 1; j < 8; j++) {
            if (board.getPiece(x, j) === null) {
                moves.push({ x, y: j });
            } else {
                if (board.getPiece(x, j).getColor() !== this.getColor()) {
                    moves.push({ x, y: j });
                }
                break;
            }
        }

        // Prüfen der Züge nach links (x abnehmend)
        for (let i = x - 1; i >= 0; i--) {
            if (board.getPiece(i, y) === null) {
                moves.push({ x: i, y });
            } else {
                if (board.getPiece(i, y).getColor() !== this.getColor()) {
                    moves.push({ x: i, y });
                }
                break;
            }
        }

        // Prüfen der Züge nach rechts (x zunehmend)
        for (let i = x + 1; i < 8; i++) {
            if (board.getPiece(i, y) === null) {
                moves.push({ x: i, y });
            } else {
                if (board.getPiece(i, y).getColor() !== this.getColor()) {
                    moves.push({ x: i, y });
                }
                break;
            }
        }

        return moves;
    }

    movePiece(x, y) {
        this.#hasMoved = true;
        super.movePiece(x, y);
    }

    getHasMoved() {
        return this.#hasMoved;
    }
}
