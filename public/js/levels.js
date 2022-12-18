

var angle = 0;

let board = new Map();

function load() {
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            id = "" + i + j;
            board.set(id, "empty");
        }
    }
}

movePointer = 0;
running = 1;
moves = [];
let atk = "white";

let stage = 0, s, e;

function galleryspin(sign) {
    spinner = document.querySelector("#spinner");
    if (!sign) {
        angle = angle + 90;
    } else {
        angle = angle - 90;
    }
    spinner.setAttribute(
        "style",
        "transform: rotateY(" + angle + "deg); transform: rotateY(" +
        angle + "deg); transform: rotateY(" +
        angle + "deg);"
    );
}

function galleryspin1(sign) {
    spinner = document.querySelector("#spinner1");
    if (!sign) {
        angle = angle + 90;
    } else {
        angle = angle - 90;
    }
    spinner.setAttribute(
        "style",
        "transform: rotateY(" + angle + "deg); transform: rotateY(" +
        angle + "deg); transform: rotateY(" +
        angle + "deg);"
    );
}


function galleryspin2(sign) {
    spinner = document.querySelector("#spinner2");
    if (!sign) {
        angle = angle + 90;
    } else {
        angle = angle - 90;
    }
    spinner.setAttribute(
        "style",
        "transform: rotateY(" + angle + "deg); transform: rotateY(" +
        angle + "deg); transform: rotateY(" +
        angle + "deg);"
    );
}

document.getElementById("d1").addEventListener('click', d1);
document.getElementById("d2").addEventListener('click', d2);
document.getElementById("d3").addEventListener('click', d3);

function makeBoard() {
    let main = document.querySelector("main");
    main.querySelectorAll("button").forEach(tile => {
        main.removeChild(tile);
    })
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            let styleAttribute = "";
            let tileID = "" + i + j;
            let tile = document.createElement("button");
            tile.setAttribute('id', tileID);
            if (board.get(tileID) !== "empty") {
                styleAttribute += "background: url(static/images/chesspieces/" + board.get(tileID) + ".png) no-repeat 10px center;";
            }
            if ((i + j) % 2 === 1) {
                styleAttribute += "background-color: #dae9f2; margin: 0.01px;";
            } else {
                styleAttribute += "background-color: #6e99c0; margin: 0.01px;";
            }
            tile.setAttribute('style', styleAttribute);
            main.appendChild(tile);
        }
    }
    let respond = document.createElement("button")
    respond.id = "respond";
    if (movePointer < moves.length) {
        respond.innerHTML = "Next Move";
    } else {
        respond.innerHTML = "Next Puzzle";
    }
    respond.style = "width: 90px; height: 30px; color: black";
    main.appendChild(respond);
    main.setAttribute(
        "style",
        "display: grid; grid-template-columns: repeat(8, 90px); grid-template-rows: repeat(8, 90px);"
    );
    if (movePointer < moves.length) {
        main.querySelectorAll("button").forEach(tile => {
            if (tile.id !== "respond") {
                tile.addEventListener('click', choose);
            } else {
                tile.addEventListener('click', solution);
            }
        })
    } else {
        movePointer = 0;
        let msg = document.createElement("p");
        msg.innerHTML = "<b>The Opponent Has Been Checkmated. Congratulations!!!</b>";
        msg.style = "color: black; background-color: black; border-radius: 4px; width: 600px; margin-left: 20px; font-size: 20px";
        main.appendChild(msg);
        if (running === 1) {
            document.getElementById("respond").addEventListener('click', d1);
        } else if (running === 2) {
            document.getElementById("respond").addEventListener('click', d2);
        } else if (running === 3) {
            document.getElementById("respond").addEventListener('click', d3);
        }
    }
}

function solution() {
    if (running === 2 && moves[movePointer][0] === "74" && moves[movePointer][1] === "84") {
        board.set(moves[movePointer][1], "blackQueen");
        board.set(moves[movePointer][0], "empty");
    } else if (running === 3 && moves[movePointer][0] === "25" && moves[movePointer][1] === "15") {
        board.set(moves[movePointer][1], "whiteQueen");
        board.set(moves[movePointer][0], "empty");
    } else {
        board.set(moves[movePointer][1], board.get(moves[movePointer][0]));
        board.set(moves[movePointer][0], "empty");
    }
    movePointer++;
    makeBoard();
}

function choose(event) {
    let eventID = event.target.id;
    let selected = board.get(eventID);
    if (stage === 0) {
        if (selected.includes(atk)) {
            stage = 1;
            s = eventID;
        }
    } else if (stage === 1) {
        if (selected.includes(atk)) {
            stage = 1;
            s = eventID;
        } else {
            e = eventID;
            stage = 0;
            executeMove();
        }
    }
}

function executeMove() {
    if (s === moves[movePointer][0] && e === moves[movePointer][1]) {
        board.set(e, board.get(s));
        board.set(s, "empty");
        movePointer++;
        makeBoard();
    }
}

function d1(event) {
    running = 1;
    document.querySelector("main").innerHTML = "";
    let num = Math.floor(Math.random() * 3) + 1;
    load();
    if (num === 1) {
        m21();
    } else if (num === 2) {
        m22();
    } else {
        m23();
    }
    makeBoard();
}

function d2(event) {
    running = 2;
    document.querySelector("main").innerHTML = "";
    let num = Math.floor(Math.random() * 3) + 1;
    load();
    if (num === 1) {
        m31();
    } else if (num === 2) {
        m32();
    } else {
        m33();
    }
    makeBoard();
}

function d3(event) {
    running = 3;
    document.querySelector("main").innerHTML = "";
    let num = Math.floor(Math.random() * 3) + 1;
    load();
    if (num === 1) {
        m41();
    } else if (num === 2) {
        m42();
    } else {
        m43();
    }
    makeBoard();
}

function m21() {
    atk = "white";
    board.set("11", "blackKing");
    board.set("12", "blackRook");
    board.set("13", "whiteHorse");
    board.set("22", "blackHorse");
    board.set("33", "whiteQueen");
    board.set("41", "blackQueen");
    board.set("42", "whiteHorse");
    board.set("51", "whitePawn");
    board.set("52", "blackPawn");
    board.set("53", "whiteKing");
    board.set("62", "whitePawn");
    board.set("81", "whiteRook");
    moves = [["81", "71"], ["41", "42"], ["51", "42"]];
}

function m22() {
    atk = "white";
    board.set("11", "blackRook");
    board.set("18", "blackRook");
    board.set("21", "blackKing");
    board.set("23", "blackPawn");
    board.set("27", "blackPawn");
    board.set("28", "blackPawn");
    board.set("31", "blackPawn");
    board.set("33", "blackPawn");
    board.set("45", "whiteHorse");
    board.set("55", "whitePawn");
    board.set("63", "blackQueen");
    board.set("68", "whitePawn");
    board.set("71", "whitePawn");
    board.set("76", "whitePawn");
    board.set("77", "whitePawn");
    board.set("82", "whiteRook");
    board.set("84", "whiteQueen");
    board.set("87", "whiteKing");
    moves = [["84", "54"], ["63", "54"], ["45", "33"]];
}

function m23() {
    atk = "white";
    board.set("15", "whiteRook");
    board.set("21", "blackPawn");
    board.set("23", "blackPawn");
    board.set("27", "whiteBishop");
    board.set("31", "whiteQueen");
    board.set("34", "whitePawn");
    board.set("35", "blackBishop");
    board.set("44", "blackKing");
    board.set("48", "whiteBishop");
    board.set("51", "whiteHorse");
    board.set("57", "whitePawn");
    board.set("62", "whiteKing");
    board.set("65", "blackHorse");
    board.set("75", "whiteRook");
    board.set("77", "whitePawn");
    moves = [["48", "26"], ["35", "26"], ["75", "74"]];
}

function m31() {
    atk = "white";
    board.set("26", "whiteHorse");
    board.set("28", "blackPawn");
    board.set("32", "whiteRook");
    board.set("46", "blackPawn");
    board.set("48", "blackKing");
    board.set("56", "whitePawn");
    board.set("67", "whitePawn");
    board.set("61", "blackHorse");
    board.set("74", "blackPawn");
    board.set("77", "whiteKing");
    board.set("78", "whitePawn");
    board.set("87", "blackRook");
    moves = [["77", "68"], ["87", "67"], ["78", "67"], ["74", "84"], ["32", "38"]];
}

function m32() {
    atk = "white";
    board.set("11", "blackRook");
    board.set("28", "blackPawn");
    board.set("54", "blackPawn");
    board.set("64", "whitePawn");
    board.set("67", "whiteRook");
    board.set("68", "whiteRook");
    board.set("77", "whitePawn");
    board.set("78", "whitePawn");
    board.set("86", "whiteKing");
    board.set("88", "blackKing");
    moves = [["68", "48"], ["28", "38"], ["78", "58"], ["88", "78"], ["67", "68"]];
}

function m33() {
    atk = "white";
    board.set("13", "blackBishop");
    board.set("23", "whiteQueen");
    board.set("31", "blackRook");
    board.set("42", "blackPawn");
    board.set("44", "blackRook");
    board.set("46", "blackHorse");
    board.set("54", "whitePawn");
    board.set("63", "whitePawn");
    board.set("61", "blackKing");
    board.set("76", "whiteRook");
    board.set("77", "blackQueen");
    board.set("68", "blackPawn");
    board.set("81", "whiteKing");
    board.set("83", "whiteHorse");
    moves = [["23", "78"], ["77", "78"], ["76", "78"], ["46", "54"], ["78", "71"]];
}

function m41() {
    atk = "white";
    board.set("15", "whiteRook");
    board.set("26", "blackPawn");
    board.set("27", "blackPawn");
    board.set("28", "blackKing");
    board.set("38", "blackPawn");
    board.set("44", "whiteBishop");
    board.set("45", "blackPawn");
    board.set("46", "whitePawn");
    board.set("54", "blackBishop");
    board.set("62", "whitePawn");
    board.set("67", "whiteQueen");
    board.set("68", "whitePawn");
    board.set("71", "blackRook");
    board.set("77", "whitePawn");
    board.set("78", "whitePawn");
    board.set("84", "blackQueen");
    moves = [["67", "37"], ["26", "37"], ["44", "17"], ["28", "18"], ["17", "26"], ["18", "28"], ["46", "37"]];
}

function m42() {
    atk = "black";
    board.set("15", "whiteRook");
    board.set("27", "blackRook");
    board.set("31", "whiteKing");
    board.set("32", "whitePawn");
    board.set("33", "blackPawn");
    board.set("34", "whitePawn");
    board.set("38", "whitePawn");
    board.set("41", "whitePawn");
    board.set("43", "whiteQueen");
    board.set("51", "blackPawn");
    board.set("54", "blackQueen");
    board.set("55", "whitePawn");
    board.set("56", "blackPaw");
    board.set("72", "blackPawn");
    board.set("82", "blackKing");
    moves = [["27", "21"], ["31", "21"], ["54", "27"], ["15", "25"], ["27", "25"], ["21", "12"], ["25", "22"]];
}

function m43() {
    atk = "white";
    board.set("15", "blackQueen");
    board.set("22", "blackBishop");
    board.set("25", "whitePawn");
    board.set("26", "blackKing");
    board.set("28", "blackPawn");
    board.set("31", "blackRook");
    board.set("37", "blackPawn");
    board.set("45", "whiteQueen");
    board.set("48", "blackHorse");
    board.set("52", "blackPawn");
    board.set("54", "whiteBishop");
    board.set("66", "whitePawn");
    board.set("72", "whitePawn");
    board.set("77", "whitePawn");
    board.set("78", "whitePawn");
    board.set("83", "whiteRook");
    board.set("85", "whiteRook");
    board.set("88", "whiteKing");
    moves = [["83", "33"], ["48", "67"], ["78", "67"], ["15", "33"], ["25", "15"], ["33", "15"], ["45", "27"]];
}


