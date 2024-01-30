import { Chessboard } from "./js/Chessboard.js";
import { King } from "./js/King.js";

const chessboardElement = document.querySelector(".chessboard");
var chessboard = new Chessboard();
let selectedPiece = null;
let selectedSquare = null;
let currentPlayer = 'white';

function renderBoard() {
    chessboardElement.innerHTML = "";
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            let square = document.createElement('div');
            square.classList.add('square', (x + y) % 2 === 0 ? "whiteSquare" : "blackSquare");
            square.dataset.x = x;
            square.dataset.y = y;

            let piece = chessboard.getPiece(x, y);
            if (piece) {
                let img = document.createElement('img');
                img.src = piece.getImage();
                img.alt = piece.constructor.name;
                square.appendChild(img);
            }

            square.addEventListener("click", () => {
                if (selectedPiece && selectedPiece.canMoveTo(x, y)) {
                    movePiece(selectedSquare, { x, y });
                } else {
                    showMoves(x, y);
                }
            });

            chessboardElement.appendChild(square);
        }
    }
}

function showMoves(x, y) {
    let piece = chessboard.getPiece(x, y);

    if (piece && piece.getColor() !== currentPlayer) {
        return;
    }

    clearHighlights();
    // Auswahl aufheben, wenn dieselbe Figur erneut angeklickt wird
    if (selectedPiece === piece) {
        selectedPiece = null;
        selectedSquare = null;
        return;
    }

    selectedPiece = piece;
    selectedSquare = { x, y };

    if (selectedPiece) {
        let moves = selectedPiece.getMoves();
        moves.forEach(move => {
            let targetSquare = chessboardElement.querySelector(`div[data-x='${move.x}'][data-y='${move.y}']`);
            if (targetSquare) {
                targetSquare.classList.add('highlight');
            }
        });
    }
}

function clearHighlights() {
    document.querySelectorAll('.highlight').forEach(highlight => {
        highlight.classList.remove('highlight');
    });
}

function movePiece(from, to) {
    let piece = chessboard.getPiece(from.x, from.y);

    let moveToPiece = chessboard.getPiece(to.x, to.y);
    if (piece && piece.canMoveTo(to.x, to.y)) {
        piece.movePiece(to.x, to.y);
        chessboard.movePiece(from.x, from.y, to.x, to.y);
        selectedPiece = null;
        selectedSquare = null;
        renderBoard();

        if (moveToPiece instanceof King) {
            setTimeout(function () {
                alert("Game Over, " + piece.getColor() + " won!");
                chessboard = new Chessboard();
                currentPlayer = 'white';
                renderBoard();
            }, 10);
        }

        currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    }
}

renderBoard();
