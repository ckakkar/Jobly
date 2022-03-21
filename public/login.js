function go_to_signup() {
    location.href = "SignUp.html";
}

function go_to_userpage(username) {
    location.href = "user.html?" + username;
}

function go_to_first_login(username) {
    location.href = "first_login.html?" + username;
}

async function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var warning = document.getElementById("alert");
    var checkbox = document.getElementById("checker");
    if (email == "" || password == "") {
        warning.innerHTML = "Please fill all fields";
        return;
    }
    else {
        const response = await fetch('/getdata');
        const temp = await response.json();
        var i;
        for (i = 0; i < temp.results.rows.length; i++) {
            if (temp.results.rows[i]['email'] == email) {
                break;
            }
        }
        if (i == temp.results.rows.length) {
            warning.innerHTML = "User not found";
            return;
        }
        else if (temp.results.rows[i]['password'] == password) {
            var username = temp.results.rows[i]['name'];
            var type = temp.results.rows[i]['type'];
            var preference = temp.results.rows[i]['preference'];
            if (checkbox.checked == true) {
                var clear = { code: "truncate current;" };
                const temp_options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(clear),
                };
                var wait = await fetch('/update', temp_options);

                var str = { code: "insert into current values ('" + email + "', '" + username + "', 1, " + type + ", " + preference + ");" };
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(str),
                };

                var wait = await fetch('/update', options);
            }
            if (temp.results.rows[i]['type'] == 0)
                go_to_first_login(username);
            else if (type == 1 && preference == 0)
                location.href = "select_preference.html?" + username;
            else if (type == 1 && preference == 1)
                location.href = "user.html?" + username;
            else if (type == 2)
                location.href = "employer.html?" + username;
        }
        else {
            warning.innerHTML = "Wrong password";
        }
    }
}