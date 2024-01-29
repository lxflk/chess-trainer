import { Chessboard } from "./js/Chessboard.js";

const chessboardElement = document.querySelector(".chessboard");
var chessboard = new Chessboard();

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

            square.addEventListener("click", () => showMoves(i, j));
            chessboardElement.appendChild(square);
        }
    }
}

function showMoves(x, y) {
    clearHighlights();
    let piece = chessboard.getPiece(x, y);
    if (piece) {
        let moves = piece.getMoves();
        moves.forEach(move => {
            let targetSquare = chessboardElement.querySelector(`div[data-x='${move.x}'][data-y='${move.y}']`); //Suche nach dem div Element auf dem Feld
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

renderBoard();
