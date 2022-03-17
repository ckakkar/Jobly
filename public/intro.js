function go_to_jobly() {
    location.href = "index.html";
}

function go_to_signup() {
    location.href = "SignUp.html";
}

function go_to_userpage(username) {
    location.href = "user.html?" + username;
}

function go_to_first_login(username) {
    location.href = "first_login.html?" + username;
}

async function go_to_login() {
    const response = await fetch('/getcurrentuser');
    const temp = await response.json();
    if (temp.results.rows.length == 0) {
        location.href = "LogInPage.html";
    }
    else {
        var username = temp.results.rows[0]['name'];
        var type = temp.results.rows[0]['type'];
        if(type == 0)
            go_to_first_login(username);
        else
            go_to_userpage(username);
    }
}