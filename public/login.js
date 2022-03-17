function go_to_signup() {
    location.href = "SignUp.html";
}

function go_to_userpage(username) {
    location.href = "user.html?" + username;
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
            if (checkbox.checked == true) {
                var str = { code: "insert into current values ('" + email + "', '"+ username +"', 1);"};
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(str),
                };

                var wait = await fetch('/update', options);
            }
            go_to_userpage(username);
        }
        else {
            warning.innerHTML = "Wrong password";
        }
    }
}