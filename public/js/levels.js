var angle = 0;
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



