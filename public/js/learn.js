document.querySelectorAll(".chesspiece").forEach(btn => {
  btn.addEventListener("click", e => {
    let id = btn.id;
    let imgSrc = "";
    let bigPiece ="";
    if (id.includes("rook")) {
      imgSrc = "/static/images/chess_learn/rook.gif"
      bigPiece= "/static/images/fancy_chesspieces/rook.png"
    } else if (id.includes("bishop")) {
      imgSrc = "/static/images/chess_learn/bishop.gif"
      bigPiece= "/static/images/fancy_chesspieces/bishop.png"
    } else if (id.includes("horse")) {
      imgSrc = "/static/images/chess_learn/horse.gif"
      bigPiece= "/static/images/fancy_chesspieces/horse.png"
    } else if (id.includes("queen")) {
      imgSrc = "/static/images/chess_learn/queen.gif"
      bigPiece= "/static/images/fancy_chesspieces/queen.png"
    }else if (id.includes("king")) {
      imgSrc = "/static/images/chess_learn/king.gif"
      bigPiece= "/static/images/fancy_chesspieces/king.png"
    } else if (id.includes("pawn")) {
      imgSrc = "/static/images/chess_learn/pawn.gif"
      bigPiece= "/static/images/fancy_chesspieces/pawn.png"
    }
    let img = document.getElementById("window");
    let pieceImg = document.getElementById("piece");
    let div = document.getElementById("myDIV");
    if (img !== null) {
      div.removeChild(img);
      div.removeChild(pieceImg);
    }
    let newImg = document.createElement("img");
    let newPiece = document.createElement("img");
    newPiece.id = "piece";
    newPiece.src = bigPiece;
    newPiece.className = "window";
    newImg.id = "window";
    newImg.className = "window";
    newImg.src = imgSrc;
    div.appendChild(newImg);
    div.appendChild(newPiece);
  })
})