const registrationForm = document.querySelector("#registration");
const loginForm = document.querySelector("#login");
const deleteButton = document.querySelector("#deleteButton");
const logoutButton = document.querySelector("#logoutButton");

// finds and saves the registration password and confirmation password inputs as variables
const regPassword = document.querySelector("#regpassword");
const regConfirmPassword = document.querySelector("#regpasswordconfirm");

let loggedIn = false;
let username = "";
let usernameValid = false;
let passwordValid = false;


// hides the dashboard by default
document.querySelector("#dashboard").style.display = "none";
// hides the incorrect password label by default
document.querySelector("#incorrect_password").style.display = "none";
// hides the taken username label by default
document.querySelector("#takenUsername").style.display = "none";

const saveUsersResults = async (result) => {
  const url = "http://localhost:5000/app/results/add";
  const payload = JSON.stringify({
    username: username,
    result: result,
  });
  const results = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
  if (results.status === 200) {
    showDashboard();
  } else {
    // do something for errors
  }
};

const loadUsersResults = async (result) => {
  const url = "http://localhost:5000/app/results/" + username;
  const results = await fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "omit",
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  if (results.status === 200) {
    let result = await results.json();
    const myresulttitle = document.querySelector("#result_title");
    const resultsDisplay = document.querySelector("#result_display");
    resultsDisplay.innerHTML = result.result;
    myresulttitle.innerHTML = "Your most recent result: ";
    let script =
      "No Data: Learn about your animal's trait by playing the quiz game!";
    const pararesult = document.querySelector("#description_display");
    if (result.result == "Lion") {
      script =
        "Your inner Lion is a ferocious creature. You are proud of your accomplishments, but never gloat about it. Your beloved action speaks to who you are, and the lion in you is admirable. You are one who seeks to do the right thing in any situation. You often may come across many obstacles, but you prefer to brush it off and seek your goals.";
    } else if (result.result == "Serpent") {
      script =
        "Your inner Serpent is very meticulous. You are very clever and are known for acting out of the blue. You surprise everyone with your actions, and make others weary of you. You stand out from the crowd as a result of your uniqueness. It is very evident from your successful path that you are no match for others.";
    } else if (result.result == "Eagle") {
      script =
        "Your inner Eagle is always curious. You are eager to await what is next in life. You want to soar to the skies, and reach the beyond. You appear, and most definitely are, limitless in your capabilities. You want to know more, and believe that knowledge is your biggest asset. Moreover, You seek and cherish every opportunity presented to you.";
    } else if (result.result == "Badger") {
      script =
        "Your inner Badger is clear cut. You are quick to your decision and are always ready for action. You are not intimidated by the task in front of you. Taking a leap of faith or not, does not matter to you. You care about being quick in action and making progress. You are ready to pave your own road to success, and will not easily be taken down by unhelpful peers.";
    }
    pararesult.innerHTML = script;
  }
};

registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (usernameValid && passwordValid) {
    try {
      username = e.target.regusername.value;
      const url = "http://localhost:5000/app/users/add";
      const payload = JSON.stringify({
        username: e.target.regusername.value,
        password: e.target.regpassword.value,
      });
      const results = await fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });
      if (results.status === 201) {
        showDashboard();
      } else if (results.status === 409) {
        document.querySelector("#takenUsername").style.display = "block";
      } else {
        throw results.status;
      }
    } catch (err) {
      console.log("Error: " + err.message);
    }
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  username = e.target.username.value;
  const url = "http://localhost:5000/app/login";
  const data = new FormData(e.target);
  const payload = JSON.stringify({
    username: e.target.username.value,
    password: e.target.password.value,
  });
  const result = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
  if (result.status === 200) {
    login(username);
    showDashboard();
  } else {
    document.querySelector("#incorrect_password").style.display = "block";
  }
});

regusername.addEventListener("input", (event) => {
  if (regusername.value.length < 5) {
    regusername.classList.add("is-danger");
  } else {
    usernameValid = true;
    regusername.classList.remove("is-danger");
  }
});

regPassword.addEventListener("input", (event) => {
  if (regPassword.value.length < 6) {
    passwordValid = false;
    regPassword.classList.add("is-danger");
  } else {
    regPassword.classList.remove("is-danger");
    if (regPassword.value === regConfirmPassword.value) {
      regConfirmPassword.classList.remove("is-danger");
      passwordValid = true;
    }
  }
});

regConfirmPassword.addEventListener("input", (event) => {
  if (
    regConfirmPassword.value.length < 6 ||
    regPassword.value !== regConfirmPassword.value
  ) {
    regConfirmPassword.classList.add("is-danger");
    passwordValid = false;
  } else {
    regConfirmPassword.classList.remove("is-danger");
    passwordValid = true;
  }
});

deleteButton.addEventListener("click", async (e) => {
    try {
        const url = "http://localhost:5000/app/users/delete";
        const payload = JSON.stringify({
          username: username,
        });
        const results = await fetch(url, {
          method: "DELETE",
          mode: "cors",
          credentials: "omit",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        });
        if (results.status === 200) {
          logout();
        }  else {
          throw "Error deleting user";
        }
      } catch (err) {
        console.log("Error: " + err.message); // TODO something with errors
      }
});

const showDashboard = () => {
    document.querySelector("#registrationForm").style.display = "none";
    document.querySelector("#loginForm").style.display = "none";
    const dashboard = document.querySelector("#dashboard");
    dashboard.style.display = "block";
    dashboard.style.height = "100hv";
    dashboard.scrollIntoView();
    const usernameDisplay = document.querySelector("#username_display");
    usernameDisplay.innerHTML = "Welcome, " + username;
    loadUsersResults();
  };

const login = (user) => {
    username = user;
    localStorage.setItem('loggedIn', true);
    localStorage.setItem('username', username);
}

const logout = () => {
    localStorage.clear();
    location.reload();
}

logoutButton.addEventListener("click", async (e) => {
    logout();
});


const loadLoginStatus = () => {
    let statusCookie = localStorage.getItem('loggedIn');
    if (statusCookie === "true") {
        username = localStorage.getItem('username');
        loggedIn = true;
        showDashboard();
    } else {
        localStorage.setItem('loggedIn', false);
    }
}

loadLoginStatus();

//Quiz Logic

const quizbtn = document.querySelector("#quizbtn");

quizbtn.onclick = function () {
  const radiobuttons = document.querySelectorAll('input[name="answer"]');
  let result;
  let array = [0, 0, 0, 0];

  for (const radiobtn of radiobuttons) {
    if (radiobtn.checked) {
      if (radiobtn.value == "lion") {
        array[0] += 1;
      } else if (radiobtn.value == "serpent") {
        array[1] += 1;
      } else if (radiobtn.value == "eagle") {
        array[2] += 1;
      } else if (radiobtn.value == "badger") {
        array[3] += 1;
      }
    }
  }
  console.log(array);
  let base = 0;
  let baseval = array[base];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > baseval) {
      base = i;
      baseval = array[i];
    }
  }

  if (base == 0) {
    result = "Lion";
  } else if (base == 1) {
    result = "Serpent";
  } else if (base == 2) {
    result = "Eagle";
  } else if (base == 3) {
    result = "Badger";
  }
  if (loggedIn) saveUsersResults(result);
  //the var "result" holds the value of the user's animal result
  alert("Voolla! You're quiz game result is " + result);
};

