
let tileInfo = new Map();

let black = [];
let white = [];
let blackKing = "";
let whiteKing = "";

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
                styleAttribute += "background-color: #003C00";
            } else {
                styleAttribute += "background-color: white";
            }
            tile.setAttribute('style', styleAttribute);
        }
    }
    document.querySelector(".playing span").innerHTML = opp;
    storeInfo();
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
    let tmp = tileInfo;
    if (validMove()) {
        tileInfo.set(end, tileInfo.get(start));
        tileInfo.set(start, em);
        if (checked() !== false) {
            console.log(checked());
        }
        if (checked() === atk) {
            tileInfo = tmp;
        }
        board();
        switchTeam();
    }
}

function switchTeam() {
    let tmp = atk;
    atk = opp;
    opp = tmp;
}

function validMove() {
    let moved = tileInfo.get(start);
    let target = tileInfo.get(end);
    if (moved.includes("Pawn")) {
        return pawnMove(moved, target);
    } else if (moved.includes("Bishop")) {
        return bishopMove(target);
    } else if (moved.includes("Horse")) {
        return horseMove(target);
    } else if (moved.includes("Rook")) {
        return rookMove(target);
    } else if (moved.includes("Queen")) {
        return (rookMove(target) || bishopMove(target));
    } else if (moved.includes("King") && !checked()) {
        return (kingMove(target));
    }
}

function pawnMove(moved, target) {
    let sp = parseInt(start);
    let ep = parseInt(end);
    if (moved.includes("white")) {
        if ((sp + 10) === ep && target === em) {
            return true;
        } else if ((sp + 10) === ep && target !== em) {
            return false;
        } else if ((sp + 20) === ep && Math.floor(sp / 10) === 2) {
            return true;
        } else if (((sp + 11) === ep || (sp + 9) === ep) && target.includes("black")) {
            return true;
        } else {
            return false;
        }
    } else {
        if ((sp - 10) === ep && target === em) {
            return true;
        } else if ((sp - 10) === ep && target !== em) {
            return false;
        } else if ((sp - 20) === ep && Math.floor(sp / 10) === 7) {
            return true;
        } else if (((sp - 11) === ep || (sp - 9) === ep) && target.includes("white")) {
            return true;
        } else {
            return false;
        }
    }
}

function bishopMove(target) {
    let sx = parseInt(start[1]), sy = parseInt(start[0]), ex = parseInt(end[1]), ey = parseInt(end[0]);
    if (Math.abs(sx - ex) === Math.abs(sy - ey) && !(target.includes(atk))) {
        let x = ex - sx;
        let y = ey - sy;
        let xdir = x / Math.abs(x);
        let ydir = y / Math.abs(y);
        let pos = "";
        let count = 1;
        while (pos != end) {
            pos = "" + (sy + count * ydir) + (sx + count * xdir);
            count++;
            if (tileInfo.get(pos) !== em && pos != end) {
                return false;
            }
        }
        return true;
    }
    return false
}

function horseMove(target) {
    let sp = parseInt(start);
    let ep = parseInt(end);
    let verMove = Math.floor(sp / 10) - Math.floor(ep / 10);
    let horMove = sp % 10 - ep % 10;
    let product = Math.abs(verMove * horMove);
    if (product === 2 && !(target.includes(atk))) {
        return true;
    } else {
        return false;
    }
}

function rookMove(target) {
    if ((start[0] === end[0] || start[1] === end[1]) && !(target.includes(atk))) {
        if (start[0] === end[0]) {
            let hP = start[0];
            let sp = parseInt(start[1]);
            let ep = parseInt(end[1]);
            if (sp > ep) {
                let tmp = sp;
                sp = ep;
                ep = tmp;
            }
            console.log(sp, ep);
            for (let i = sp + 1; i < ep; i++) {
                let path = "" + hP + i;
                if (tileInfo.get(path) !== em) {
                    return false;
                }
            }
            return true;
        } else {
            let vP = start[1];
            let sp = parseInt(start[0]);
            let ep = parseInt(end[0]);
            if (sp > ep) {
                let tmp = sp;
                sp = ep;
                ep = tmp;
            }
            console.log(sp, ep);
            for (let i = sp + 1; i < ep; i++) {
                let path = "" + i + vP;
                if (tileInfo.get(path) !== em) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}

function kingMove(target) {
    let sx = parseInt(start[1]), sy = parseInt(start[0]), ex = parseInt(end[1]), ey = parseInt(end[0]);
    return (!(target.includes(atk)) && Math.abs(sx - ex)<2 && Math.abs(sy - ey)<2);
}
function checkValid() {
    let moved = tileInfo.get(start);
    let target = tileInfo.get(end);
    if (moved.includes("Pawn")) {
        return pawnMove(moved, target);
    } else if (moved.includes("Bishop")) {
        return bishopMove(target);
    } else if (moved.includes("Horse")) {
        return horseMove(target);
    } else if (moved.includes("Rook")) {
        return rookMove(target);
    } else if (moved.includes("Queen")) {
        return (rookMove(target) || bishopMove(target));
    } else if (moved.includes("King")) {
        return (kingMove(target));
    }
}

function checked() {
    let tmpEnd = end;
    let tmpStart = start;
    black.forEach(id => {
        end = whiteKing;
        start = id;
        if (checkValid()) {
            start = tmpStart;
            end = tmpEnd;
            return "white";
        }
    })
    end = blackKing;
    white.forEach(id => {
        end = whiteKing;
        start = id;
        if (checkValid()) {
            start = tmpStart;
            end = tmpEnd;
            return "black";
        }
    })
    start = tmpStart;
    end = tmpEnd;
    return false;
}