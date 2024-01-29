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
        let gameBoard = []
        for (let i = 0; i < 8; i++) {
            let row = [];
            for (let j = 0; j < 8; j++) {
                row.push(null);
            }
            gameBoard.push(row);
        }
        return gameBoard;
    }

    addPiece(piece, x, y) {
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
            this.#board[x][y] = piece;
            piece.setPosition(x, y);
        }
    }

    getPiece(x, y) {
        return this.#board[x][y];
    }

    getBoard() {
        return this.#board;
    }

    addAllPieces() {
        const initialSetup = [
            { type: Rook, color: "white", positions: [{ x: 7, y: 0 }, { x: 7, y: 7 }] },
            { type: Knight, color: "white", positions: [{ x: 7, y: 1 }, { x: 7, y: 6 }] },
            { type: Bishop, color: "white", positions: [{ x: 7, y: 2 }, { x: 7, y: 5 }] },
            { type: Queen, color: "white", positions: [{ x: 7, y: 3 }] },
            { type: King, color: "white", positions: [{ x: 7, y: 4 }] },
            { type: Pawn, color: "white", positions: Array.from({ length: 8 }, (_, y) => ({ x: 6, y })) },

            { type: Rook, color: "black", positions: [{ x: 0, y: 0 }, { x: 0, y: 7 }] },
            { type: Knight, color: "black", positions: [{ x: 0, y: 1 }, { x: 0, y: 6 }] },
            { type: Bishop, color: "black", positions: [{ x: 0, y: 2 }, { x: 0, y: 5 }] },
            { type: Queen, color: "black", positions: [{ x: 0, y: 3 }] },
            { type: King, color: "black", positions: [{ x: 0, y: 4 }] },
            { type: Pawn, color: "black", positions: Array.from({ length: 8 }, (_, y) => ({ x: 1, y })) },
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
            this.addPiece(movingPiece, toX, toY);
            this.#board[fromX][fromY] = null;
            movingPiece.setPosition(toX, toY);
        }
    }

}