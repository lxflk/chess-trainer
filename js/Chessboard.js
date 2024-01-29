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
        console.log(`Called getPiece with x=${x}, y=${y}`);
        return this.#board[x][y];
    }

    getBoard() {
        return this.#board;
    }

    addAllPieces() {
        //Add Pawns
        for (let i = 0; i < 8; i++) {
            let whitePawn = new Pawn("white", this);
            let blackPawn = new Pawn("black", this);

            this.addPiece(whitePawn, 6, i);
            this.addPiece(blackPawn, 1, i);
        }

        //Add Rooks
        for (let i = 0; i < 2; i++) {
            let whiteRook = new Rook("white", this);
            let blackRook = new Rook("black", this);

            this.addPiece(whiteRook, 7, i * 7);
            this.addPiece(blackRook, 0, i * 7);
        }

        //Add Bishops
        for (let i = 0; i < 2; i++) {
            let whiteBishop = new Bishop("white", this);
            let blackBishop = new Bishop("black", this);

            this.addPiece(whiteBishop, 7, 1 + i * 5);
            this.addPiece(blackBishop, 0, 1 + i * 5);
        }

        //Add Knights
        for (let i = 0; i < 2; i++) {
            let whiteKnight = new Knight("white", this);
            let blackKnight = new Knight("black", this);

            this.addPiece(whiteKnight, 7, 2 + i * 3);
            this.addPiece(blackKnight, 0, 2 + i * 3);
        }

        //Add Queens
        let whiteQueen = new Queen("white", this);
        let blackQueen = new Queen("black", this);

        this.addPiece(whiteQueen, 7, 3);
        this.addPiece(blackQueen, 0, 3);

        //Add Kings
        let whiteKing = new King("white", this);
        let blackKing = new King("black", this);

        this.addPiece(whiteKing, 7, 4);
        this.addPiece(blackKing, 0, 4);
    }
}