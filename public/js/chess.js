
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

//I am raging fire gay - by Cristiano Masutti
//Burn the niggers and maybe jews I'm neutral and I hate Kanye - by Cristiano Masutti

let atk = "white";
let opp = "black";

let stage = 0, start, end;

function initBoard() {
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            let styleAttribute = "";
            let tileID = "" + i + j;
            let tile = document.createElement("button");
            tile.setAttribute('id', tileID);
            if (tileInfo.get(tileID) !== em) {
                styleAttribute += "background: url(./images/chesspieces/" + tileInfo.get(tileID) + ".png); background-repeat: no-repeat; ";
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
    document.querySelectorAll("button").forEach(tile => {
        tile.addEventListener("click", choose);
    });
}

function board() {
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            let styleAttribute = "";
            let tileID = "" + i + j;
            let tile = document.getElementById(tileID);
            if (tileInfo.get(tileID) !== em) {
                styleAttribute += "background: url(./images/chesspieces/" + tileInfo.get(tileID) + ".png); background-repeat: no-repeat; ";
            }
            if ((i + j) % 2 === 1) {
                styleAttribute += "background-color: #003C00";
            } else {
                styleAttribute += "background-color: white";
            }
            tile.setAttribute('style', styleAttribute);
        }
    }
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

function choose(event) {
    let eventID = event.target.id;
    let selected = tileInfo.get(eventID);
    if (stage === 0) {
        if (selected.includes(atk)) {
            stage = 1;
            start = eventID;
        }
    } else if (stage === 1) {
        if (selected.includes(atk)) {
            stage = 1;
            start = eventID;
        } else {
            end = eventID;
            console.log(start, end);
            stage = 0;
            executeMove();
        }
    }
}


function executeMove() {
    if (true) {
        tileInfo.set(end, tileInfo.get(start));
        tileInfo.set(start, em);
        board();
        turn();
    }
}

function turn() {
    let tmp = atk;
    atk = opp;
    opp = tmp;
}

