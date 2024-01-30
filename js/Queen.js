import { Pieces } from "./Pieces.js";

export class Queen extends Pieces {
    #whiteQueen = "images/whiteQueen.png";
    #blackQueen = "images/blackQueen.png";

    constructor(color, board) {
        super(color, board);
    }

    getImage() {
        if (this.getColor() === "white") {
            return this.#whiteQueen;
        } else {
            return this.#blackQueen;
        }
    }

    getMoves() {
        let moves = [];
        let board = this.getBoard();
        let x = this.getX();
        let y = this.getY();

        // Alle möglichen Richtungen für die Dame: horizontal, vertikal und diagonal
        const directions = [
            { dx: -1, dy: 0 }, { dx: 1, dy: 0 }, // Vertikal
            { dx: 0, dy: -1 }, { dx: 0, dy: 1 }, // Horizontal
            { dx: -1, dy: -1 }, { dx: -1, dy: 1 }, // Diagonal links
            { dx: 1, dy: -1 }, { dx: 1, dy: 1 }  // Diagonal rechts
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
