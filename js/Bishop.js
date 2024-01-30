import { Pieces } from "./Pieces.js";

export class Bishop extends Pieces {
    #whiteBishop = "images/whiteBishop.png";
    #blackBishop = "images/blackBishop.png";

    constructor(color, board) {
        super(color, board);
    }

    getImage() {
        if (this.getColor() === "white") {
            return this.#whiteBishop;
        } else {
            return this.#blackBishop;
        }
    }

    getMoves() {
        let moves = [];
        let board = this.getBoard();
        let x = this.getX();
        let y = this.getY();

        // Alle möglichen diagonalen Richtungen
        const directions = [
            { dx: -1, dy: -1 }, { dx: -1, dy: 1 },
            { dx: 1, dy: -1 }, { dx: 1, dy: 1 }
        ];

        directions.forEach(({ dx, dy }) => {
            let newX = x + dx;
            let newY = y + dy;

            // Prüfen Sie jede Richtung, bis eine Figur getroffen wird oder das Ende des Bretts erreicht ist
            while (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                let potentialTarget = board.getPiece(newX, newY);

                // Wenn das Zielfeld leer ist, fügen Sie es zu den möglichen Zügen hinzu
                if (potentialTarget === null) {
                    moves.push({ x: newX, y: newY });
                } else {
                    // Wenn eine gegnerische Figur getroffen wird, fügen Sie diesen Zug hinzu und beenden Sie die Schleife
                    if (potentialTarget.getColor() !== this.getColor()) {
                        moves.push({ x: newX, y: newY });
                    }
                    break;
                }

                newX += dx;
                newY += dy;
            }
        });

        return moves;
    }
}
