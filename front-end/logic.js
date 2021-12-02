const registrationForm = document.querySelector('#registration');
const loginForm = document.querySelector('#login');

// hides the dashboard by default
//document.querySelector('#dashboard').style.display = "none";

const showDashboard = () => {
    document.querySelector('#registrationForm').style.display = "none";
    document.querySelector('#loginForm').style.display = "none";
    const dashboard = document.querySelector('#dashboard');
    dashboard.style.display = "block";
    dashboard.style.height = "100hv"
    dashboard.scrollIntoView();
}

registrationForm.addEventListener('submit', async (e) => {
    
    e.preventDefault();
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