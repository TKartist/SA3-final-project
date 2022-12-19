function moveSlides() {
  var pos = parseInt(slides.style.left) || 0;

  pos -= 1;

  slides.style.transition = "left 0.1s linear";
  slides.style.left = pos + "px";
}

setInterval(moveSlides, 100);
