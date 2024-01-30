import { Pieces } from "./Pieces.js";
import { Rook } from "./Rook.js";  // Stellen Sie sicher, dass Rook importiert wird, wenn nicht bereits geschehen

export class King extends Pieces {
    #whiteKing = "images/whiteKing.png";
    #blackKing = "images/blackKing.png";
    #hasMoved = false;

    constructor(color, board) {
        super(color, board);
    }

    getImage() {
        if (this.getColor() === "white") {
            return this.#whiteKing;
        } else {
            return this.#blackKing;
        }
    }

    getMoves() {
        let moves = [];
        let board = this.getBoard();
        let x = this.getX();
        let y = this.getY();

        // Alle möglichen Richtungen, die der König nehmen kann
        const directions = [
            { dx: -1, dy: -1 }, { dx: -1, dy: 0 }, { dx: -1, dy: 1 },
            { dx: 0, dy: -1 }, /* Aktuelle Position */ { dx: 0, dy: 1 },
            { dx: 1, dy: -1 }, { dx: 1, dy: 0 }, { dx: 1, dy: 1 }
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

        // Rochade hinzufügen, wenn Bedingungen erfüllt sind
        if (!this.#hasMoved) {
            // Rochade mit dem linken Turm
            if (this.canCastle(0, y)) {
                moves.push({ x: 2, y });
            }
            // Rochade mit dem rechten Turm
            if (this.canCastle(7, y)) {
                moves.push({ x: 6, y });
            }
        }

        return moves;
    }

    canCastle(rookX, rookY) {
        let board = this.getBoard();
        let rook = board.getPiece(rookX, rookY);

        if (rook && !rook.getHasMoved() && rook instanceof Rook) {
            let direction = rookX > this.getX() ? 1 : -1;
            for (let i = this.getX() + direction; i !== rookX; i += direction) {
                if (board.getPiece(i, rookY) !== null) {
                    return false;
                }
            }
            // Überprüfen, ob der König im Schach steht oder die Felder angegriffen werden (komplexere Logik erforderlich)
            // ...

            return true;
        }

        return false;
    }

    movePiece(x, y) {
        // Spezialfall für Rochade
        if (!this.#hasMoved && Math.abs(this.getX() - x) === 2) {
            let rookX = x === 2 ? 0 : 7;  // Turm auf der a-Linie (0) oder h-Linie (7)
            let rook = this.getBoard().getPiece(rookX, y);
            let newRookX = x === 2 ? 3 : 5;  // Neuer Platz für den Turm

            if (rook) {
                rook.movePiece(newRookX, y);  // Bewege den Turm
                this.getBoard().movePiece(rookX, y, newRookX, y);  // Aktualisiere das Schachbrett
            }
        }

        // Normale Bewegung
        super.movePiece(x, y);
        this.#hasMoved = true;
    }


    getHasMoved() {
        return this.#hasMoved;
    }
}
