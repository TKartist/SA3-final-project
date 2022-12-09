
let tileInfo = new Map();

let black = [];
let white = [];
let blackKing = "";
let whiteKing = "";
let pTiles = []; //possible tiles

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
                styleAttribute += "background-color: #dae9f2";
            } else {
                styleAttribute += "background-color: #6e99c0";
            }
            tile.setAttribute('style', styleAttribute);
            document.querySelector("main").appendChild(tile);
        }
    }
    document.querySelectorAll("button").forEach(tile => {
        tile.addEventListener("click", choose);
    });
    document.querySelector(".playing span").innerHTML = atk;
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
                styleAttribute += "background-color: #dae9f2";
            } else {
                styleAttribute += "background-color: #6e99c0";
            }
            tile.setAttribute('style', styleAttribute);
        }
    }
    document.querySelector(".playing span").innerHTML = opp;
}

function storeInfo() {
    black = [];
    white = [];
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            let ID = "" + i + j;
            let piece = tileInfo.get(ID);
            if (piece.includes("white")) {
                if (tileInfo.get(ID).includes("King")) {
                    whiteKing = ID;
                }
                white.push(ID);
            } else if (piece.includes("black")) {
                if (tileInfo.get(ID).includes("King")) {
                    blackKing = ID;
                }
                black.push(ID);
            }
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
            stage = 0;
            executeMove();
        }
    }
}

function executeMove() {
    if (validMove()) {
        let tmp = tileInfo;
        let tmpblack = black;
        let tmpwhite = white;
        tileInfo.set(end, tileInfo.get(start));
        tileInfo.set(start, em);
        console.log(tileInfo);
        storeInfo();
        if (checked()) {
            console.log("checked");
            tileInfo = tmp;
            black = tmpblack;
            white = tmpwhite;
        } else {
            board();
            switchTeam();
        }
    }
}

function validMove() {
    let moved = tileInfo.get(start);
    console.log(start);
    pTiles = [];
    let tmp = start;
    let found = false;
    if (moved.includes("Pawn")) {
        pawnMove(moved, tmp);
    } else if (moved.includes("Bishop")) {
        bishopMove(tmp);
    } else if (moved.includes("Horse")) {
        horseMove(tmp);
    } else if (moved.includes("Rook")) {
        rookMove(tmp);
    } else if (moved.includes("Queen")) {
        rookMove(tmp);
        bishopMove(tmp);
    } else if (moved.includes("King")) {
        kingMove(moved, tmp);
    }
    for (let i = 0; i < pTiles.length; i++) {
        if (pTiles[i] === end) {
            found = true;
        }
    }
    return found;
}

function switchTeam() {
    let tmp = atk;
    atk = opp;
    opp = tmp;
}

function pawnMove(moved, tmp) {
    let sx = parseInt(tmp[1]);
    let sy = parseInt(tmp[0]);
    let newID = "";
    if (moved.includes("white")) {
        if (tileInfo.get("" + (sy + 1) + sx) === em) {
            newID = "" + (sy + 1) + sx;
            pTiles.push(newID);
        }
        if (tileInfo.get("" + (sy + 2) + sx) === em && sy === 2) {
            newID = "" + (sy + 2) + sx;
            pTiles.push(newID);
        } 
        if ((sx - 1) > 0 && tileInfo.get("" + (sy + 1) + (sx - 1)).includes("black")) {
            newID = "" + (sy + 1) + (sx - 1);
            pTiles.push(newID);
        } if ((sx + 1) < 9 && tileInfo.get("" + (sy + 1) + (sx + 1)).includes("black")) {
            newID = "" + (sy + 1) + (sx + 1);
            pTiles.push(newID);
        } 
    } else {
        if (tileInfo.get("" + (sy - 1) + sx) === em) {
            newID = "" + (sy - 1) + sx;
            pTiles.push(newID);
        }
        if (tileInfo.get("" + (sy - 2) + sx) === em && sy === 7) {
            newID = "" + (sy - 2) + sx;
            pTiles.push(newID);
        }
        if ((sx - 1) > 0 && tileInfo.get("" + (sy - 1) + (sx - 1)).includes("black")) {
            newID = "" + (sy - 1) + (sx - 1);
            pTiles.push(newID);
        } if ((sx + 1) < 9 && tileInfo.get("" + (sy - 1) + (sx + 1)).includes("black")) {
            newID = "" + (sy - 1) + (sx + 1);
            pTiles.push(newID);
        }  
    }
}

function bishopMove(tmp) {
    let sx = parseInt(tmp[1]), sy = parseInt(tmp[0]);
    let tmpx, tmpy;
    for(let i = 1; i < 8; i++) {
        tmpx = sx + i;
        tmpy = sy + i;
        newID = "" + tmpy + tmpx;
        if (tmpx < 1 || tmpx > 8 || tmpy > 8 || tmpy < 1 || tileInfo.get(newID).includes(atk)) {
            break;
        }
        if (tileInfo.get(newID).includes(opp)) {
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
    }
    for (let i = 1; i < 8; i++) {
        tmpx = sx - i;
        tmpy = sy - i;
        newID = "" + tmpy + tmpx;
        if (tmpx < 1 || tmpx > 8 || tmpy > 8 || tmpy < 1 || tileInfo.get(newID).includes(atk)) {
            break;
        }
        if (tileInfo.get(newID).includes(opp)) {
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
    }
    for (let i = 1; i < 8; i++) {
        tmpx = sx + i;
        tmpy = sy - i;
        newID = "" + tmpy + tmpx;
        if (tmpx < 1 || tmpx > 8 || tmpy > 8 || tmpy < 1 || tileInfo.get(newID).includes(atk)) {
            break;
        }
        if (tileInfo.get(newID).includes(opp)) {
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
    }
    for (let i = 1; i < 8; i++) {
        tmpx = sx - i;
        tmpy = sy + i;
        newID = "" + tmpy + tmpx;
        if (tmpx < 1 || tmpx > 8 || tmpy > 8 || tmpy < 1 || tileInfo.get(newID).includes(atk)) {
            break;
        }
        if (tileInfo.get(newID).includes(opp)) {
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
    }
}

function horseMove(tmp) {
    let x = parseInt(tmp[1]);
    let y = parseInt(tmp[0]);
    let tmpx, tmpy;
    console.log(x, y);
    let twos = [2, -2];
    let ones = [1, -1];
    twos.forEach(t => {
        ones.forEach(o => {
            tmpx = x + t;
            tmpy = y + o;
            newID = "" + tmpy + tmpx;
            if (tmpx > 0 && tmpx < 9 && tmpy > 0 && tmpy < 9 && (tileInfo.get(newID) === em || tileInfo.get(newID).includes(opp))) {
                pTiles.push(newID);
            }
            tmpx = x + o;
            tmpy = y + t;
            newID = "" + tmpy + tmpx;
            if (tmpx > 0 && tmpx < 9 && tmpy > 0 && tmpy < 9 && (tileInfo.get(newID) === em || tileInfo.get(newID).includes(opp))) {
                pTiles.push(newID);
            }
        })
    })
}

function rookMove(tmp) {
    let sx = parseInt(tmp[1]);
    let sy = parseInt(tmp[0]);
    for (let i = 1; i < 8; i++) {
        tmpx = sx + i;
        newID = "" + sy + tmpx;
        if (tmpx < 1 || tmpx > 8 || tileInfo.get(newID).includes(atk)) {
            break;
        }
        if (tileInfo.get(newID).includes(opp)) {
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
    }
    for (let i = 1; i < 8; i++) {
        tmpx = sx - i;
        newID = "" + sy + tmpx;
        if (tmpx < 1 || tmpx > 8 || tileInfo.get(newID).includes(atk)) {
            break;
        }
        if (tileInfo.get(newID).includes(opp)) {
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
    }
    for (let i = 1; i < 8; i++) {
        tmpy = sy + i;
        newID = "" + tmpy + sx;
        if (tmpy < 1 || tmpy > 8 || tileInfo.get(newID).includes(atk)) {
            break;
        }
        if (tileInfo.get(newID).includes(opp)) {
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
    }
    for (let i = 1; i < 8; i++) {
        tmpy = sy - i;
        newID = "" + tmpy + sx;
        if (tmpy < 1 || tmpy > 8 || tileInfo.get(newID).includes(atk)) {
            break;
        }
        if (tileInfo.get(newID).includes(opp)) {
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
    }
}

function kingRange(tmp) {
    let x = parseInt(tmp[1]);
    let y = parseInt(tmp[0]);
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let newX = x + j;
            let newY = y + i;
            if (newX < 9 && newX > 0 && newY < 9 && newY > 0) {
                if (i !== 0 && j !== 0) {
                    let newID = "" + newY + newX;
                    pTiles.push(newID); 
                }
            }
        }
    }
}

function kingMove(moved, tmp) {
    let tmpTiles = [];
    if (moved.includes("white")) {
        black.forEach(tile => {
            let piece = tileInfo.get(tile);
            if (piece.includes("Pawn")) {
                pawnMove(piece, tile);
            } else if (piece.includes("Bishop")) {
                bishopMove(tile);
            } else if (piece.includes("Rook")) {
                rookMove(tile);
            } else if (piece.includes("Horse")) {
                horseMove(tile);
            } else if (piece.includes("Queen")) {
                bishopMove(tile);
                rookMove(tile);
            } else if (piece.includes("King")) {
                kingRange(tile);
            }
        })
        tmpTiles = pTiles;
        pTiles = [];
    } else {
        white.forEach(tile => {
            let piece = tileInfo.get(tile);
            if (piece.includes("Pawn")) {
                pawnMove(piece, tile);
            } else if (piece.includes("Bishop")) {
                bishopMove(tile);
            } else if (piece.includes("Rook")) {
                rookMove(tile);
            } else if (piece.includes("Horse")) {
                horseMove(tile);
            } else if (piece.includes("Queen")) {
                bishopMove(tile);
                rookMove(tile);
            } else if (piece.includes("King")) {
                kingRange(tile);
            }
        })
        tmpTiles = pTiles;
        pTiles = [];
    }
    console.log(tmpTiles);
    let x = parseInt(tmp[1]);
    let y = parseInt(tmp[0]);
    let found = false;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let newX = x + j;
            let newY = y + i;
            if (newX < 9 && newX > 0 && newY < 9 && newY > 0) {
                if (i !== 0 && j !== 0) {
                    let newID = "" + newY + newX;
                    let size = tmpTiles.length;
                    for (let i = 0; i < size; i++) {
                        if (tmpTiles[i] === newID) {
                            console.log(newID);
                            found = true;
                            break;
                        }
                    }
                    if (found === false && !(tileInfo.get(newID).includes(atk))) {
                        pTiles.push(newID);
                    } else {
                        found = false;
                    }
                }
            }
        }
    }
}

function checked() {
    let tmp = pTiles;
    let sizeb = black.length;
    pTiles = [];
    for (let i = 0; i < sizeb; i++) {
        let piece = tileInfo.get(black[i]);
        if (piece.includes("Pawn")) {
            pawnMove(piece, black[i]);
        } else if (piece.includes("Bishop")) {
            bishopMove(black[i]);
            console.log("bishop" + black[i]);
        } else if (piece.includes("Rook")) {
            rookMove(black[i]);
        } else if (piece.includes("Horse")) {
            horseMove(black[i]);
        } else if (piece.includes("Queen")) {
            rookMove(black[i]);
            bishopMove(black[i]);
        } else if (piece.includes("King")) {
            kingRange(black[i]);
        }
    }
    console.log(pTiles);
    for (let j = 0; j < pTiles.length; j++) {
        if (pTiles[j] === whiteKing) {
            console.log("in");
            pTiles = tmp;
            return true;
        }
    }
    pTiles = [];
    let sizew = white.length;
    for (let i = 0; i < sizew; i++) {
        pTiles = [];
        let piece = tileInfo.get(white[i]);
        if (piece.includes("Pawn")) {
            pawnMove(piece, white[i]);
        } else if (piece.includes("Bishop")) {
            bishopMove(white[i]);
        } else if (piece.includes("Rook")) {
            rookMove(white[i]);
        } else if (piece.includes("Horse")) {
            horseMove(white[i]);
        } else if (piece.includes("Queen")) {
            rookMove(white[i]);
            bishopMove(white[i]);
        } else if (piece.includes("King")) {
            kingRange(white[i]);
        }
    }
    for (let j = 0; j < pTiles.length; j++) {
        if (pTiles[j] === blackKing) {
            pTiles = tmp;
            return true;
        }
    }
    pTiles = tmp;
    return false;
}
