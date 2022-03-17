function go_to_jobly() {
    location.href = "index.html";
}

function go_to_signup() {
    location.href = "SignUp.html";
}

function go_to_userpage(username) {
    location.href = "user.html?" + username;
}

async function go_to_login() {
    const response = await fetch('/getcurrentuser');
    const temp = await response.json();
    if (temp.results.rows.length == 0) {
        location.href = "LogInPage.html";
    }
    else {
        var username = temp.results.rows[0]['name'];
        go_to_userpage(username);
    }
}