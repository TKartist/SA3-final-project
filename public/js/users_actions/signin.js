


const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser);

async function registerUser(event){
    event.preventDefault()
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('createPassword').value;


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
    } else {
        alert(result.error);
    }

    console.log(result);


}