

const form_l = document.getElementById('login');
form_l.addEventListener('submit', loginUser);

async function loginUser(event){
    event.preventDefault()
    const username = document.getElementById('username_l').value;
    const password = document.getElementById('loginPassword').value;


    const result = await fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify({
            username,
            password
        })
    }).then((res)=> res.json())


    if(result.status === 'ok'){
        //everything went fine
        FLAG = 1;
        console.log('Got token', result.data)
    } else {
        alert(result.error);
    }

    console.log(result);


}
