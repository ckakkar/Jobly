async function add_preference() {
    //fetch user data and i is the row with the corresponding username
    const response = await fetch('/getdata');
    const data = await response.json();
    for (var i = 0; i < data.results.rows.length; i++) {
        if (data.results.rows[i]['name'] == queryString) {
            break;
        }
    }
    //if username's preference==0, set preference to 1
    if (data.results.rows[i]['preference'] == 0) {
        var str = { code: "update users set preference = 1 where name ='"+queryString+"';" };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(str),
        };

        var wait = await fetch('/update', options);
    }

    //insert preference to table 'username'
    var warning = document.getElementById("added");
    var pref = document.getElementById("pref").value;
    var str = { code: "insert into " + queryString + " values ('" + pref + "');" };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(str),
    };

    var wait = await fetch('/update', options);
    warning.innerHTML = "Added "+pref;
}

function continu(){
    location.href = "user.html?"+queryString;
}

const queryString = location.search.substring(1);

