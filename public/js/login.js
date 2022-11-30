

function showPassword() {

    var x = document.getElementById("myPassword");
    var y = document.getElementById("showPasswordbtn");
    var flag = false;

    if (x.type === "password") {
      x.type = "text";
      flag = true;
    } else {
      x.type = "password";
      flag = false;
    }

    if(flag){
        y.style.opacity = 0.5;
    } else {
        y.style.opacity = 1;
    }

}