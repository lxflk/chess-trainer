import { Chessboard } from "./js/Chessboard.js";

const chessboardElement = document.querySelector(".chessboard");
var chessboard = new Chessboard();
let selectedPiece = null;
let selectedSquare = null;

function renderBoard() {
    chessboardElement.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let square = document.createElement('div');
            square.classList.add('square', (i + j) % 2 === 0 ? "whiteSquare" : "blackSquare");
            square.dataset.x = i;
            square.dataset.y = j;

            let piece = chessboard.getPiece(i, j);
            if (piece) {
                let img = document.createElement('img');
                img.src = piece.getImage();
                img.alt = piece.constructor.name;
                square.appendChild(img);
            }

            square.addEventListener("click", () => {
                if (selectedPiece && selectedPiece.canMoveTo(i, j)) {
                    movePiece(selectedSquare, { x: i, y: j });
                } else {
                    showMoves(i, j);
                }
            });

            chessboardElement.appendChild(square);
        }
    }
}

function showMoves(x, y) {
    let piece = chessboard.getPiece(x, y);

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
        if (moves.length === 0) {
            // Keine gültigen Züge, Auswahl aufheben
            selectedPiece = null;
            selectedSquare = null;
            return;
        }
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
    if (piece && piece.canMoveTo(to.x, to.y)) {
        chessboard.movePiece(from.x, from.y, to.x, to.y);
        selectedPiece = null;
        selectedSquare = null;
        renderBoard();
    }
}

renderBoard();
