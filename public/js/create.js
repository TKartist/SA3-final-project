

let flag = true;

let pressedButton = false;


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

            let btn = document.getElementById(tileID);
            btn.addEventListener('click', ()=> {
                btn.style.backgroundColor='#337ab7'
                flag = false
            });

        }
    }
}


initBoard();



document.getElementById("bB").addEventListener('click', ()=> {})
document.getElementById("bH").addEventListener('click', ()=> {})
document.getElementById("bK").addEventListener('click', ()=> {})
document.getElementById("bP").addEventListener('click', ()=> {})
document.getElementById("bQ").addEventListener('click', ()=> {})
document.getElementById("bR").addEventListener('click', ()=> {})


document.getElementById("wB").addEventListener('click', ()=> {})
document.getElementById("wH").addEventListener('click', ()=> {})
document.getElementById("wK").addEventListener('click', ()=> {})
document.getElementById("wP").addEventListener('click', ()=> {})
document.getElementById("wQ").addEventListener('click', ()=> {})
document.getElementById("wR").addEventListener('click', ()=> {})










