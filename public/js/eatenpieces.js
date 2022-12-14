

function show(array){
    let size = array.length - 1;
    if(atk == "white"){
        let white_p = document.getElementById('white-pieces');
        let new_w = document.createElement('img')
        new_w.src = "/static/images/chesspieces/"+ array[size] +".png"
        white_p.appendChild(new_w)
    } else {
        let black_p = document.getElementById('black-pieces');
        let new_b = document.createElement('img')
        new_b.src = "/static/images/chesspieces/"+ array[size] +".png"
        black_p.appendChild(new_b)
    }
}