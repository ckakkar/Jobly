async function logout() {
    var str = { code: "truncate current;" };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(str),
    };

    var wait = await fetch('/update', options);
    location.href = "index.html";
}

async function remove(obj) {
    var x = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("mytable");
    var name = table.rows[x].cells[0].id;
    var str = { code: "delete from users where name=" + "'" + name + "'" + ";" };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(str),
    };

    var wait = await fetch('/update', options);

    var clear = { code: "drop table " + name + ";" };

    const clear_options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(str),
    };

    var wait = await fetch('/update', clear_options);

    document.location.reload(true);
}

async function showdetail() {
    const response = await fetch('/getdata');
    const data = await response.json();
    var table = document.getElementById("mytable");
    for (let i = 0; i < data.results.rows.length; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(-1);
        cell1.innerHTML = data.results.rows[i]['name'];
        cell1.id = data.results.rows[i]['name'];
        var cell2 = row.insertCell(-1);
        cell2.innerHTML = data.results.rows[i]['password'];
        var cell3 = row.insertCell(-1);
        if (data.results.rows[i]['type'] == 0)
            cell3.innerHTML = "Unassigned";
        else if (data.results.rows[i]['type'] == 1)
            cell3.innerHTML = "Employee";
        else if (data.results.rows[i]['type'] == 2)
            cell3.innerHTML = "Employer";
        else if (data.results.rows[i]['type'] == 3)
            cell3.innerHTML = "Admin";
        if (data.results.rows[i]['name'] != "admin") {
            var cell4 = row.insertCell(-1);
            cell4.innerHTML = '<button type="button" onclick="remove(this)"> Delete </button>';
            cell4.firstChild.classList.add("button");
        }
        cell1.classList.add("text");
        cell2.classList.add("text");
        cell3.classList.add("text");
    }
}

showdetail();