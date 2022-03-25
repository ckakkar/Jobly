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

function go_to_about(){
    location.href = "about.html";
}

function go_to_contact(){
    location.href = "contact.html";
}

function go_to_help(){
    location.href = "help.html";
}


async function go_to_login() {
    const response = await fetch('/getcurrentuser');
    const current_user = await response.json();
    if (current_user.results.rows.length == 0) {
        location.href = "LogInPage.html";
    }
    else {
        var username = current_user.results.rows[0]['name'];
        const response = await fetch('/getdata');
        const data = await response.json();
        console.log(data);
        for (var i = 0; i < data.results.rows.length; i++) {
            if (data.results.rows[i]['name'] == username) {
                break;
            }
        }
        if (data.results.rows[i]['type'] == 0)
            go_to_first_login(username);
        else if (data.results.rows[i]['type'] == 1 && data.results.rows[i]['preference'] == 0)
            location.href = "select_preference.html?" + username;
        else if (data.results.rows[i]['type'] == 1 && data.results.rows[i]['preference'] == 1)
            location.href = "user.html?" + username;
        else if (data.results.rows[i]['type'] == 2)
            location.href = "employer.html?" + username;
        else if (data.results.rows[i]['type'] == 3)
            location.href = "admin.html";
    }
}