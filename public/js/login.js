

// Show or don't show the password 
function showPassword(pageName) {

    // flag for button opacity
    var flag = false;

    // show or don't show the password
    if(pageName === 'create'){
        console.log("inside create")
        var x = document.getElementById("createPassword");
        var y = document.getElementById("createPassword2")
        var z = document.getElementById("createPasswordbtn");

        if (x.type === "password") {
            x.type = "text";
            y.type = "text";
            flag = true;
        } else {
            x.type = "password";
            y.type = "password";
            flag = false;
        }

    } else {
        console.log("inside login");
        var x = document.getElementById("loginPassword");
        var z = document.getElementById("loginPasswordbtn");

        if (x.type === "password") {
            x.type = "text";
            flag = true;
        } else {
            x.type = "password";
            flag = false;
        }
    }

    // Button to show password opacity
    if(flag){
        z.style.opacity = 0.5;
    } else {
        z.style.opacity = 1;
    }
}







// Move the submit button if the values are incorrect
var myflag = 0;


function mouseOver(){

    // Get the inputs from the form
    const email = document.forms['userCreateForm']['email'].value;
    const username = document.forms['userCreateForm']['username'].value;
    const password1 = document.forms['userCreateForm']['password'].value;
    const password2 = document.forms['userCreateForm']['password-repeat'].value;

    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(username == "" || !email.match(emailCheck) || password1 == "" || password2 == "" || password1 != password2 && myflag === 0) {
        buttonMoveLeft();
        console.log("moving left");
        myflag = 1;
        console.log(myflag);
        return false;
    }

    else if(username == "" || !email.match(emailCheck) || password1 == "" || password2 == "" || password1 != password2 && myflag === 1) {
        buttonMoveRight();
        console.log("moving right");
        myflag = 2;
        console.log(myflag);
        return false;
    }

    else if(username == "" || !email.match(emailCheck) || password1 == "" || password2 == "" || password1 != password2 && myflag === 2) {
        buttonMoveLeft();
        console.log("moving left again");
        myflag = 1;
        return false;
    }

    else {
        console.log("All inputs are correct");
    }

}


function buttonMoveLeft(){
    const button = document.getElementById('createUserbtn');
    button.style.transform = 'translateX(-160%)';
}

function buttonMoveRight(){
    const button = document.getElementById('createUserbtn');
    button.style.transform = 'translateX(0%)';
}

function resetButton(){
    const button = document.getElementById('createUserbtn');
    console.log("button resetted")
    button.style.transform = 'translateX(0%)';
}