
FLAG = 0;

const form_s = document.getElementById('reg-form');
form_s.addEventListener('submit', registerUser);

async function registerUser(event){
    event.preventDefault()
    const email = document.getElementById('email').value;
    const username = document.getElementById('username_s').value;
    const password = document.getElementById('createPassword').value;

    console.log("the username is" ,username);

    const result = await fetch('/users/new', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify({
            email,
            username,
            password
        })
    }).then((res)=> res.json())


    if(result.status === 'ok'){
        //everything went fine
        FLAG = 1;
    } else {
        alert(result.error);
    }

    console.log(result);


}

