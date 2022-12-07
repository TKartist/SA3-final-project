
let tileInfo = new Map();

let canMove = [];

const bb = "blackBishop";
const wb = "whiteBishop";
const bh = "blackHorse";
const wh = "whiteHorse";
const bk = "blackKing";
const wk = "whiteKing";
const bp = "blackPawn";
const wp = "whitePawn";
const bq = "blackQueen";
const wq = "whiteQueen";
const br = "blackRook";
const wr = "whiteRook";
const em = "empty";

let atk = "white";
let opp = "black";

function initBoard() {
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            let styleAttribute = "";
            let tileID = "" + i + j;
            let tile = document.createElement("button");
            tile.setAttribute('id', tileID);
            if (tileInfo.get(tileID) !== em) {
                styleAttribute += "background: url(./CSS/chesspieces/" + tileInfo.get(tileID) + ".png); background-repeat: no-repeat; ";
            }
            if ((i + j) % 2 === 1) {
                styleAttribute += "background-color: #003C00";
            } else {
                styleAttribute += "background-color: white";
            }
            tile.setAttribute('style', styleAttribute);
            document.querySelector("main").appendChild(tile);
        }
    }
    enableAtk();
}

function board() {
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            let styleAttribute = "";
            let tileID = "" + i + j;
            let tile = document.getElementById(tileID);
            if (tileInfo.get(tileID) !== em) {
                styleAttribute += "background: url(./CSS/chesspieces/" + tileInfo.get(tileID) + ".png); background-repeat: no-repeat; ";
            }
            if ((i + j) % 2 === 1) {
                styleAttribute += "background-color: #003C00";
            } else {
                styleAttribute += "background-color: white";
            }
            tile.setAttribute('style', styleAttribute);
        }
    }
    enableAtk();
}

function initPos() {
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            let tileID = "" + i + j;
            if (i === 7) {
                tileInfo.set(tileID, bp);
            } else if (i === 2) {
                tileInfo.set(tileID, wp);
            } else if (i === 8 && (j === 1 || j === 8)) {
                tileInfo.set(tileID, br);
            } else if (i === 1 && (j === 1 || j === 8)) {
                tileInfo.set(tileID, wr);
            } else if (i === 8 && (j === 2 || j === 7)) {
                tileInfo.set(tileID, bh);
            } else if (i === 1 && (j === 2 || j === 7)) {
                tileInfo.set(tileID, wh);
            } else if (i === 8 && (j === 3 || j === 6)) {
                tileInfo.set(tileID, bb);
            } else if (i === 1 && (j === 3 || j === 6)) {
                tileInfo.set(tileID, wb);
            } else if (i === 8 && j === 4) {
                tileInfo.set(tileID, bq);
            } else if (i === 1 && j === 4) {
                tileInfo.set(tileID, wq);
            } else if (i === 8 && j === 5) {
                tileInfo.set(tileID, bk);
            } else if (i === 1 && j === 5) {
                tileInfo.set(tileID, wk);
            } else {
                tileInfo.set(tileID, em);
            }
        }
    }
    initBoard();
}

function enableAtk() {
    document.querySelectorAll("button").forEach(btn => {
        let ID = btn.id;
        let piece = tileInfo.get(ID);
        if (tileInfo.get(ID).startsWith(atk)) {
            btn.addEventListener("click", event => {
                moveTo(ID);
                if (canMove.length !== 0) {
                    canMove.forEach(nextID => {
                        console.log(nextID);
                        document.getElementById(nextID).addEventListener("click", e => {
                            tileInfo.set(ID, em);
                            tileInfo.set(nextID, piece);
                            switchAtk();
                            board();
                        })
                    })
                }
            })
        }
    })
}

function moveTo(ID) {
    let pos = parseInt(ID);
    let y = pos % 10;
    let x = Math.floor(pos / 10);
    let piece = tileInfo.get(ID);
    if (piece.includes("Pawn")) {
        pawnAct(ID, x, y);
    }
}

function pawnAct(ID, x, y) {
    let piece = tileInfo.get(ID);
    canMove = [];
    let nextX;
    if (piece.startsWith("white")) {
        nextX = x + 1;
    } else {
        nextX = x - 1;
    }
    for (let i = -1; i <= 1; i++) {
        let nextY = y + i;
        if (nextY > 0 && nextY < 9) {
            let nextID = "" + nextX + nextY;
            if (i !== 0) {
                if (tileInfo.get(nextID).startsWith(opp)) {
                    canMove.push(nextID);
                }
            } else {
                if (tileInfo.get(nextID) === em) {
                    canMove.push(nextID);
                }
            }
        }
    }
    console.log(canMove);
}

function switchAtk() {
    if (atk === "white") {
        atk = "black";
        opp = "white";
    } else {
        atk = "white";
        opp = "black";
    }
}

