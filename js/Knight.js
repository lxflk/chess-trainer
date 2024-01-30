import { Pieces } from "./Pieces.js";

export class Knight extends Pieces {
    #whiteKnight = "images/whiteKnight.png";
    #blackKnight = "images/blackKnight.png";

    constructor(color, board) {
        super(color, board);
    }

    getImage() {
        if (this.getColor() === "white") {
            return this.#whiteKnight;
        } else {
            return this.#blackKnight;
        }
    }

    getMoves() {
        let moves = [];
        let board = this.getBoard();
        let x = this.getX();
        let y = this.getY();

        // Alle möglichen Richtungen, die ein Springer nehmen kann
        const directions = [
            { dx: -2, dy: -1 }, { dx: -2, dy: 1 },
            { dx: -1, dy: -2 }, { dx: -1, dy: 2 },
            { dx: 1, dy: -2 }, { dx: 1, dy: 2 },
            { dx: 2, dy: -1 }, { dx: 2, dy: 1 }
        ];

        directions.forEach(({ dx, dy }) => {
            let newX = x + dx;
            let newY = y + dy;

            // Überprüfen, ob der neue Standort innerhalb des Bretts liegt
            if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                let potentialTarget = board.getPiece(newX, newY);

                // Überprüfen, ob das Zielfeld leer ist oder eine gegnerische Figur enthält
                if (potentialTarget === null || potentialTarget.getColor() !== this.getColor()) {
                    moves.push({ x: newX, y: newY });
                }
            }
        });

        return moves;
    }
}
