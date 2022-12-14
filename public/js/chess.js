
let tileInfo = new Map();

let black = [];
let white = [];
let blackKing = "";
let whiteKing = "";
let pTiles = []; //possible tiles
let check = "No-One";

let eaten = [];

let castleInfo = {
    "15": false,
    "11": false,
    "18": false,
    "85": false,
    "81": false,
    "88": false
}

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

let switched = 0;

let stage = 0, start, end;

function initBoard() {
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            let styleAttribute = "";
            let tileID = "" + i + j;
            let tile = document.createElement("button");
            tile.setAttribute('id', tileID);
            if ((i + j) % 2 === 1) {
                styleAttribute += "background-color: #dae9f2";
            } else {
                styleAttribute += "background-color: #6e99c0";
            }
            tile.setAttribute('style', styleAttribute);
            document.querySelector("#chess-grid").appendChild(tile);
        }
    }
}

document.getElementById("start").addEventListener("click", e => {
    board();
    startClock();
})

function board() {
    let section = document.querySelector("#chess-grid");
    section.querySelectorAll("button").forEach(tile => {
        section.removeChild(tile);
    })
    if (atk === "black") {
        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                let styleAttribute = "";
                let tileID = "" + i + j;
                let tile = document.createElement("button");
                tile.setAttribute('id', tileID);
                if (tileInfo.get(tileID) !== em) {
                    styleAttribute += "background: url(static/images/chesspieces/" + tileInfo.get(tileID) + ".png) no-repeat 10px center;";
                }
                if ((i + j) % 2 === 1) {
                    styleAttribute += "background-color: #dae9f2";
                } else {
                    styleAttribute += "background-color: #6e99c0";
                }
                tile.setAttribute('style', styleAttribute);
                document.querySelector("#chess-grid").appendChild(tile);
            }
        }
    } else {
        for (let i = 8; i > 0; i--) {
            for (let j = 8; j > 0; j--) {
                let styleAttribute = "";
                let tileID = "" + i + j;
                let tile = document.createElement("button");
                tile.setAttribute('id', tileID);
                if (tileInfo.get(tileID) !== em) {
                    styleAttribute += "background: url(static/images/chesspieces/" + tileInfo.get(tileID) + ".png) no-repeat 10px center;";
                }
                if ((i + j) % 2 === 1) {
                    styleAttribute += "background-color: #dae9f2";
                } else {
                    styleAttribute += "background-color: #6e99c0";
                }
                tile.setAttribute('style', styleAttribute);
                document.querySelector("#chess-grid").appendChild(tile);
            }
        }
    }
    document.querySelectorAll("button").forEach(tile => {
        tile.addEventListener("click", choose);
    });
    document.querySelector(".playing span").innerHTML = "Playing: " + atk.toUpperCase();
    document.querySelector(".check span").innerHTML = check.toUpperCase() + " is checked";
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

function castleEffect() {
    if (castleInfo.start !== undefined) {
        castleInfo.start = true;
    }
}


let prec = document.querySelector('table tbody').lastElementChild;
let main_element = document.querySelector('table tbody');
let FLAG = 0;
let counter = 0;

async function storeDatabase() {
    //resetClock();
    stopClock()
    if(atk == "white"){
        isPlayer1Turn = false;
        isPlayer2Turn = true;
    } else {
        isPlayer1Turn = true;
        isPlayer2Turn = false;
    }
    startClock();
    var array = [start, end];
    var object = tileInfo.get(end);
    var map = JSON.stringify(array);
    console.log("the map is " + map);
    const result = await fetch('/play', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            map,
            atk,
            object
        })
    }).then((res) => res.json())

       
    if (result.status === 'ok') {
        if (atk == "white") {
            
            let new_td1 = document.createElement('td');
            new_td1.innerHTML = object + "" + array[0] + "->" + array[1];
            
            prec.appendChild(new_td1);
            FLAG = 1;
        } else {
            let new_count = document.createElement('td')
            new_count.innerHTML = counter; 
            prec.appendChild(new_count);
            let new_td2 = document.createElement('td');
            new_td2.innerHTML = object + " " + array[0] + "->" + array[1];
            prec.appendChild(new_td2)
            FLAG = 0;
        }

        if(FLAG){
            let new_element = document.createElement('tr');
            main_element.appendChild(new_element);
            prec = new_element;
            counter++;
        }
        



    } else {
        console.log("error")
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
        let tmp = new Map(tileInfo);
        let tmpblack = Array.from(black);
        let tmpwhite = Array.from(white);
        tileInfo.set(end, tileInfo.get(start));
        tileInfo.set(start, em);
        upgrade();
        storeInfo();
        check = checked("check");
        if (check === atk) {
            tileInfo = tmp;
            black = tmpblack;
            white = tmpwhite;
            board();
        } else if (check === opp) {
            if (switched === 0) {
                storeDatabase();
                switchTeam();
                switched++;
            }
            if (tmp.get(end) !== em) {
                eaten.push(tmp.get(end));
                show(eaten)
            }
            // castleEffect();
            board();
            if (checkmate()) {
                gameover();
            }
        } else {
            storeDatabase();
            switchTeam();
            if (tmp.get(end) !== em) {
                eaten.push(tmp.get(end));
                show(eaten);
            }
            // castleEffect();
            board();
            switched = 0;
        }
        console.log(eaten);
    }
}

function validMove() {
    let moved = tileInfo.get(start);
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

function castle() {
    let kingPos;
    let rookPos;
    let dir = 1;
    let y = parseInt(start[0]);
    if (y === parseInt(end[0]) && castleInfo.start === false && castleInfo.end === false) {
        if (!checked()) {

        } else {
            return false;
        }
    }
    return false;
}

function upgrade() {
    for (let i = 1; i < 9; i++) {
        let newID = "" + 1 + i;
        if (tileInfo.get(newID) === bp) {
            tileInfo.set(newID, bq);
        }
        newID = "" + 8 + i;
        if (tileInfo.get(newID) === wp) {
            tileInfo.set(newID, wq);
        }
    }
}

function switchTeam() {
    let tmp = atk;
    atk = opp;
    opp = tmp;
}

function pawnMove(moved, tmp) {
    let sx = parseInt(tmp[1]);
    let sy = parseInt(tmp[0]);
    let newID = "", oppcolor = "";
    let dy = 0;
    if (moved.includes("white")) {
        oppcolor = "black";
        dy = 1;
    } else {
        oppcolor = "white";
        dy = -1;
    }
    if (tileInfo.get("" + (sy + dy) + sx) === em) {
        newID = "" + (sy + dy) + sx;
        pTiles.push(newID);
    }
    if (tileInfo.get("" + (sy + (dy * 2)) + sx) === em && ((sy === 2 && moved.includes("white")) || (sy === 7 && moved.includes("black"))) && tileInfo.get("" + (sy + dy) + sx) === em) {
        newID = "" + (sy + (dy * 2)) + sx;
        pTiles.push(newID);
    }
    if (sy < 8 && sy > 1 && (sx - 1) > 0 && tileInfo.get("" + (sy + dy) + (sx - 1)).includes(oppcolor)) {
        newID = "" + (sy + dy) + (sx - 1);
        pTiles.push(newID);
    } if (sy < 8 && sy > 1 && (sx + 1) < 9 && tileInfo.get("" + (sy + dy) + (sx + 1)).includes(oppcolor)) {
        newID = "" + (sy + dy) + (sx + 1);
        pTiles.push(newID);
    }
}

function pawnEat(moved, tmp) {
    let sx = parseInt(tmp[1]);
    let sy = parseInt(tmp[0]);
    let newID = "", oppcolor = "";
    let dy = 0;
    if (moved.includes("white")) {
        oppcolor = "black";
        dy = 1;
    } else {
        oppcolor = "white";
        dy = -1;
    }
    if (sy < 8 && sy > 1 && (sx - 1) > 0 && tileInfo.get("" + (sy + dy) + (sx - 1)).includes(oppcolor)) {
        newID = "" + (sy + dy) + (sx - 1);
        pTiles.push(newID);
    } if (sy < 8 && sy > 1 && (sx + 1) < 9 && tileInfo.get("" + (sy + dy) + (sx + 1)).includes(oppcolor)) {
        newID = "" + (sy + dy) + (sx + 1);
        pTiles.push(newID);
    }
}

function bishopMove(tmp) {
    let sx = parseInt(tmp[1]), sy = parseInt(tmp[0]);
    let oppcolor = "";
    if (tileInfo.get(tmp).includes("white")) {
        oppcolor = "black";
        atkcolor = "white";
    } else {
        oppcolor = "white";
        atkcolor = "black";
    }
    let tmpx, tmpy;
    let t = [];
    for (let i = 1; i < 8; i++) {
        tmpx = sx + i;
        tmpy = sy + i;
        newID = "" + tmpy + tmpx;
        if (tmpx < 1 || tmpx > 8 || tmpy > 8 || tmpy < 1 || tileInfo.get(newID).includes(atkcolor)) {
            break;
        }
        if (tileInfo.get(newID).includes(oppcolor)) {
            t.push(newID);
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
        t.push(newID);
    }
    for (let i = 1; i < 8; i++) {
        tmpx = sx - i;
        tmpy = sy - i;
        newID = "" + tmpy + tmpx;
        if (tmpx < 1 || tmpx > 8 || tmpy > 8 || tmpy < 1 || tileInfo.get(newID).includes(atkcolor)) {
            break;
        }
        if (tileInfo.get(newID).includes(oppcolor)) {
            t.push(newID);
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
        t.push(newID);
    }
    for (let i = 1; i < 8; i++) {
        tmpx = sx + i;
        tmpy = sy - i;
        newID = "" + tmpy + tmpx;
        if (tmpx < 1 || tmpx > 8 || tmpy > 8 || tmpy < 1 || tileInfo.get(newID).includes(atkcolor)) {
            break;
        }
        if (tileInfo.get(newID).includes(oppcolor)) {
            t.push(newID);
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
        t.push(newID);
    }
    for (let i = 1; i < 8; i++) {
        tmpx = sx - i;
        tmpy = sy + i;
        newID = "" + tmpy + tmpx;
        if (tmpx < 1 || tmpx > 8 || tmpy > 8 || tmpy < 1 || tileInfo.get(newID).includes(atkcolor)) {
            break;
        }
        if (tileInfo.get(newID).includes(oppcolor)) {
            t.push(newID);
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
        t.push(newID);
    }
}

function horseMove(tmp) {
    let x = parseInt(tmp[1]);
    let y = parseInt(tmp[0]);
    let tmpx, tmpy;
    let twos = [2, -2];
    let ones = [1, -1];
    let oppcolor = "";
    if (tileInfo.get(tmp).includes("white")) {
        oppcolor = "black";
        atkcolor = "white";
    } else {
        oppcolor = "white";
        atkcolor = "black";
    }
    twos.forEach(t => {
        ones.forEach(o => {
            tmpx = x + t;
            tmpy = y + o;
            newID = "" + tmpy + tmpx;
            if (tmpx > 0 && tmpx < 9 && tmpy > 0 && tmpy < 9 && (tileInfo.get(newID) === em || tileInfo.get(newID).includes(oppcolor))) {
                pTiles.push(newID);
            }
            tmpx = x + o;
            tmpy = y + t;
            newID = "" + tmpy + tmpx;
            if (tmpx > 0 && tmpx < 9 && tmpy > 0 && tmpy < 9 && (tileInfo.get(newID) === em || tileInfo.get(newID).includes(oppcolor))) {
                pTiles.push(newID);
            }
        })
    })
}

function rookMove(tmp) {
    let sx = parseInt(tmp[1]);
    let sy = parseInt(tmp[0]);
    let oppcolor = "";
    if (tileInfo.get(tmp).includes("white")) {
        oppcolor = "black";
        atkcolor = "white";
    } else {
        oppcolor = "white";
        atkcolor = "black";
    }
    for (let i = 1; i < 8; i++) {
        tmpx = sx + i;
        newID = "" + sy + tmpx;
        if (tmpx < 1 || tmpx > 8 || tileInfo.get(newID).includes(atkcolor)) {
            break;
        }
        if (tileInfo.get(newID).includes(oppcolor)) {
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
    }
    for (let i = 1; i < 8; i++) {
        tmpx = sx - i;
        newID = "" + sy + tmpx;
        if (tmpx < 1 || tmpx > 8 || tileInfo.get(newID).includes(atkcolor)) {
            break;
        }
        if (tileInfo.get(newID).includes(oppcolor)) {
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
    }
    for (let i = 1; i < 8; i++) {
        tmpy = sy + i;
        newID = "" + tmpy + sx;
        if (tmpy < 1 || tmpy > 8 || tileInfo.get(newID).includes(atkcolor)) {
            break;
        }
        if (tileInfo.get(newID).includes(oppcolor)) {
            pTiles.push(newID);
            break;
        }
        pTiles.push(newID);
    }
    for (let i = 1; i < 8; i++) {
        tmpy = sy - i;
        newID = "" + tmpy + sx;
        if (tmpy < 1 || tmpy > 8 || tileInfo.get(newID).includes(atkcolor)) {
            break;
        }
        if (tileInfo.get(newID).includes(oppcolor)) {
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
                if (i === 0 && j === 0) {
                    continue;
                } else {
                    let newID = "" + newY + newX;
                    pTiles.push(newID);
                }
            }
        }
    }
}

function kingMove(moved, tmp) {
    let tmpTiles = [];
    let atkcolor = "";
    if (tileInfo.get(tmp).includes("white")) {
        atkcolor = "white";
    } else {
        atkcolor = "black";
    }
    if (moved.includes("white")) {
        black.forEach(tile => {
            let piece = tileInfo.get(tile);
            if (piece.includes("Pawn")) {
                pawnEat(piece, tile);
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
        tmpTiles = Array.from(pTiles);
        pTiles = [];
    } else {
        white.forEach(tile => {
            let piece = tileInfo.get(tile);
            if (piece.includes("Pawn")) {
                pawnEat(piece, tile);
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
        tmpTiles = Array.from(pTiles);
        pTiles = [];
    }
    let x = parseInt(tmp[1]);
    let y = parseInt(tmp[0]);
    let found = false;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let newX = x + j;
            let newY = y + i;
            if (newX < 9 && newX > 0 && newY < 9 && newY > 0) {
                if (i === 0 && j === 0) {
                    continue;
                } else {
                    let newID = "" + newY + newX;
                    let size = tmpTiles.length;
                    for (let i = 0; i < size; i++) {
                        if (tmpTiles[i] === newID) {
                            found = true;
                            break;
                        }
                    }
                    if (found === false && !(tileInfo.get(newID).includes(atkcolor))) {
                        pTiles.push(newID);
                    } else {
                        found = false;
                    }
                }
            }
        }
    }
}

function checked(p) {
    let tmp = Array.from(pTiles);
    let sizeb = black.length;
    pTiles = [];
    for (let i = 0; i < sizeb; i++) {
        let piece = tileInfo.get(black[i]);
        if (piece.includes("Pawn")) {
            pawnMove(piece, black[i]);
        } else if (piece.includes("Bishop")) {
            bishopMove(black[i]);
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
    for (let j = 0; j < pTiles.length; j++) {
        if (pTiles[j] === whiteKing) {
            pTiles = tmp;
            return "white";
        }
    }
    let s = pTiles.length;
    if (p === "checkmate" && s === 0) {
        return "white";
    }
    pTiles = [];
    let sizew = white.length;
    for (let i = 0; i < sizew; i++) {
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
            return "black";
        }
    }
    s = pTiles.length;
    pTiles = tmp;
    if (p === "checkmate" && s === 0) {
        return "black";
    } else {
        return "No-One";
    }
}

function checkmate() {
    let tmpblack = Array.from(black);
    let tmpwhite = Array.from(white);
    let tmp = new Map(tileInfo);
    let tmpTile = Array.from(pTiles);
    if (check === "black") {
        let size = black.length;
        for (let i = 0; i < size; i++) {
            pTiles = [];
            let curID = black[i];
            let piece = tileInfo.get(curID);
            if (piece.includes("Pawn")) {
                pawnMove(piece, curID);
            } else if (piece.includes("Bishop")) {
                bishopMove(curID);
            } else if (piece.includes("Rook")) {
                rookMove(curID);
            } else if (piece.includes("Horse")) {
                horseMove(curID);
            } else if (piece.includes("Queen")) {
                rookMove(curID);
                bishopMove(curID);
            } else if (piece.includes("King")) {
                kingMove(piece, curID);
            }
            let tmp2 = Array.from(pTiles);
            let sizep = pTiles.length;
            for (let j = 0; j < sizep; j++) {
                tileInfo.set(pTiles[j], piece);
                tileInfo.set(curID, em);
                storeInfo();
                let c = checked("checkmate");
                if (c !== "black") {
                    pTiles = tmpTile;
                    white = tmpwhite;
                    black = tmpblack;
                    tileInfo = new Map(tmp);
                    return false;
                }
                pTiles = tmp2;
                white = tmpwhite;
                black = tmpblack;
                tileInfo = new Map(tmp);
            }
        }
    } else if (check === "white") {
        let size = white.length;
        for (let i = 0; i < size; i++) {
            pTiles = [];
            let curID = white[i];
            let piece = tileInfo.get(curID);
            if (piece.includes("Pawn")) {
                pawnMove(piece, curID);
            } else if (piece.includes("Bishop")) {
                bishopMove(curID);
            } else if (piece.includes("Rook")) {
                rookMove(curID);
            } else if (piece.includes("Horse")) {
                horseMove(curID);
            } else if (piece.includes("Queen")) {
                rookMove(curID);
                bishopMove(curID);
            } else if (piece.includes("King")) {
                kingMove(piece, curID);
            }
            let tmp2 = Array.from(pTiles);
            let sizep = pTiles.length;
            for (let j = 0; j < sizep; j++) {
                tileInfo.set(pTiles[j], piece);
                tileInfo.set(curID, em);
                storeInfo();
                let c = checked("checkmate");
                if (c !== "white") {
                    pTiles = tmpTile;
                    white = tmpwhite;
                    black = tmpblack;
                    tileInfo = new Map(tmp);
                    return false;
                }
                pTiles = tmp2;
                white = tmpwhite;
                black = tmpblack;
                tileInfo = new Map(tmp);
            }
        }
    }
    pTiles = tmpTile;
    white = tmpwhite;
    black = tmpblack;
    tileInfo = new Map(tmp);
    return true;
}

function gameover() {
    let main = document.querySelector("main");
    main.querySelectorAll("button").forEach(e => {
        e.disabled = true;
    })
    document.querySelector(".check").innerHTML = atk + " is checkmated.";
}