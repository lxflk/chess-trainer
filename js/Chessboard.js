import { Pawn } from "./Pawn.js";
import { Rook } from "./Rook.js";
import { Bishop } from "./Bishop.js";
import { Knight } from "./Knight.js";
import { Queen } from "./Queen.js";
import { King } from "./King.js";

export class Chessboard {
    #board;

    constructor() {
        this.#board = this.#createBoard();
        this.addAllPieces();
    }

    #createBoard() {
        let gameBoard = [];
        for (let i = 0; i < 8; i++) {
            gameBoard.push(Array(8).fill(null));
        }
        return gameBoard;
    }

    addPiece(piece, x, y) {
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
            this.#board[y][x] = piece;
            piece.setPosition(x, y);
        }
    }

    getPiece(x, y) {
        return this.#board[y][x];
    }

    getBoard() {
        return this.#board;
    }

    addAllPieces() {
        const initialSetup = [
            // Weiße Figuren
            { type: Rook, color: "white", positions: [{ x: 0, y: 7 }, { x: 7, y: 7 }] },
            { type: Knight, color: "white", positions: [{ x: 1, y: 7 }, { x: 6, y: 7 }] },
            { type: Bishop, color: "white", positions: [{ x: 2, y: 7 }, { x: 5, y: 7 }] },
            { type: Queen, color: "white", positions: [{ x: 3, y: 7 }] },
            { type: King, color: "white", positions: [{ x: 4, y: 7 }] },
            { type: Pawn, color: "white", positions: Array.from({ length: 8 }, (_, x) => ({ x, y: 6 })) },

            // Schwarze Figuren
            { type: Rook, color: "black", positions: [{ x: 0, y: 0 }, { x: 7, y: 0 }] },
            { type: Knight, color: "black", positions: [{ x: 1, y: 0 }, { x: 6, y: 0 }] },
            { type: Bishop, color: "black", positions: [{ x: 2, y: 0 }, { x: 5, y: 0 }] },
            { type: Queen, color: "black", positions: [{ x: 3, y: 0 }] },
            { type: King, color: "black", positions: [{ x: 4, y: 0 }] },
            { type: Pawn, color: "black", positions: Array.from({ length: 8 }, (_, x) => ({ x, y: 1 })) },
        ];

        initialSetup.forEach(pieceSetup => {
            pieceSetup.positions.forEach(position => {
                const piece = new pieceSetup.type(pieceSetup.color, this);
                this.addPiece(piece, position.x, position.y);
            });
        });
    }


    movePiece(fromX, fromY, toX, toY) {
        let movingPiece = this.getPiece(fromX, fromY);
        if (movingPiece) {
            this.#board[toY][toX] = movingPiece;
            this.#board[fromY][fromX] = null;
            movingPiece.movePiece(toX, toY);
        }
    }
}
