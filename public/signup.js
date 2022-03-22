function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function check_password() {
    var password = document.getElementById("password").value;
    var repassword = document.getElementById("re_enter_password").value;
    var warning = document.getElementById("alert");
    if (password != repassword) {
        warning.innerHTML = "Password doesn't match"
    }
    else {
        warning.innerHTML = "\xa0";
    }
}
function go_to_login() {
    location.href = "LogInPage.html";
}

async function add_user() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var repassword = document.getElementById("re_enter_password").value;
    var warning = document.getElementById("alert");
    if (username == "" || email == "" || password == "") {
        warning.innerHTML = "Please fill all fields";
    }
    else if (password != repassword) {
        warning.innerHTML = "Password doesn't match";
        return;
    }
    else {
        const response = await fetch('/getdata');
        const data = await response.json();
        var i;
        for (i = 0; i < data.results.rows.length; i++) {
            if (data.results.rows[i]['name'] == username) {
                warning.innerHTML = "Username already exists";
                return;
            }
        }
        for (i = 0; i < data.results.rows.length; i++) {
            if (data.results.rows[i]['email'] == email) {
                warning.innerHTML = "Email already used";
                return;
            }
        }
        var str = { code: "insert into users values ('" + username + "', '" + email + "', '" + password + "', 0, 0, 0);" };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(str),
        };

        var wait = await fetch('/update', options);
        warning.innerHTML = "New user created";
        warning.style.color = "blue";
        await delay(800);
        go_to_login();
    }
}