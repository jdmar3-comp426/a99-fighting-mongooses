const registrationForm = document.querySelector('#registration');
const loginForm = document.querySelector('#login');

let loggedIn = false;
let username = '';

// hides the dashboard by default
document.querySelector('#dashboard').style.display = "none";

const showDashboard = () => {
    loggedIn = true;
    document.querySelector('#registrationForm').style.display = "none";
    document.querySelector('#loginForm').style.display = "none";
    const dashboard = document.querySelector('#dashboard');
    dashboard.style.display = "block";
    dashboard.style.height = "100hv"
    dashboard.scrollIntoView();
    const usernameDisplay = document.querySelector('#username_display');
    usernameDisplay.innerHTML = "Welcome, " + username;
    loadUsersResults();
}

const saveUsersResults = async (result) => {
    const url = 'http://localhost:5000/app/results/add';
    const payload = JSON.stringify({
        username: username,
        result: result
    });
    const results = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
    })
    if (results.status === 200) {
         showDashboard();
    } else {
        // do something for errors
    }
}

const loadUsersResults = async (result) => {
    const url = 'http://localhost:5000/app/results/' + username;
    const results = await fetch(url, {
        method: 'GET',
        mode: "cors",
        headers: {
            'Cache-Control': 'no-cache' 
        }
    })
    if (results.status === 200) {
        let result = await results.json()
        const resultsDisplay = document.querySelector('#result_display');
        resultsDisplay.innerHTML = "Your most recent result: " + result.result;
    }
}

registrationForm.addEventListener('submit', async (e) => {
    
    e.preventDefault();
    username = e.target.regusername.value;
    const url = 'http://localhost:5000/app/users/add';
    const payload = JSON.stringify({
        username: e.target.regusername.value,
        password: e.target.regpassword.value
    });
    const results = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
    })
    if (results.status === 201) {
        showDashboard();
    } else {
        // do something if there is an error
    }
})

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    username = e.target.username.value;
    const url = 'http://localhost:5000/app/login'
    const data = new FormData(e.target);
    const payload = JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value
    });
    const result = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
    })
    if (result.status === 200) {
        showDashboard();
    } else {
        // do something if there is an error
    }
})


//Quiz Logic

const quizbtn = document.querySelector('#quizbtn');

quizbtn.onclick = function () {
    const radiobuttons = document.querySelectorAll('input[name="answer"]');
    let result;
    let array = [0, 0, 0, 0]
    
    for (const radiobtn of radiobuttons) {
        if (radiobtn.checked) {
            if(radiobtn.value == "lion"){
                array[0] += 1
            }
            else if(radiobtn.value == "serpent"){
                array[1] += 1
            }
            else if(radiobtn.value == "eagle"){
                array[2] += 1
            }
            else if(radiobtn.value == "badger"){
                array[3] += 1
            }
        }
    }
    console.log(array)
    let base = 0;
    let baseval = array[base];
    for(let i = 0; i < array.length; i++){
        if(array[i] > baseval){
            base = i;
            baseval = array[i];
        }
    }
    
    if(base == 0){
        result = "Lion"
    }
    else if(base == 1){
        result = "Serpent"
    }
    else if(base == 2){
        result = "Eagle"
    }
    else if(base == 3){
        result = "Badger"
    }
    //the var "result" holds the value of the user's animal result
    alert("Voolla! You're quiz game result is " + result);
    if (loggedIn) saveUsersResults(result);
};