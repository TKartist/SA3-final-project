function moveSlides() {
    // Get the current position of the slides
    var pos = parseInt(slides.style.left) || 0;
  
    // Move the slides to the left
    pos -= 1;
  
    // Animate the transition
    slides.style.transition = "left 0.1s linear";
    slides.style.left = pos + "px";
  }
  
  // Call the moveSlides function every 100 milliseconds
  setInterval(moveSlides, 100);