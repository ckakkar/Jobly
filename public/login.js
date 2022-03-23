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
        const data = await response.json();
        var i;
        for (i = 0; i < data.results.rows.length; i++) {
            if (data.results.rows[i]['email'] == email) {
                break;
            }
        }
        if (i == data.results.rows.length) {
            warning.innerHTML = "User not found";
            return;
        }
        else if (data.results.rows[i]['password'] == password) {
            var username = data.results.rows[i]['name'];
            var type = data.results.rows[i]['type'];
            var preference = data.results.rows[i]['preference'];

            var clear = { code: "truncate current;" };
            const clear_options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clear),
            };
            var wait = await fetch('/update', clear_options);

            if (checkbox.checked == true) {
                var str = { code: "insert into current values ('" + username + "');" };
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(str),
                };

                var wait = await fetch('/update', options);
            }
            if (type == 0)
                go_to_first_login(username);
            else if (type == 1 && preference == 0)
                location.href = "select_preference.html?" + username;
            else if (type == 1 && preference == 1)
                location.href = "user.html?" + username;
            else if (type == 2)
                location.href = "employer.html?" + username;
            else if(type==3)
                location.href = "admin.html";
        }
        else {
            warning.innerHTML = "Wrong password";
        }
    }
}