async function remove(obj) {
    var x = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("mytable");
    var uid = table.rows[x].cells[0].id;
    var str = { code: "delete from jobs where uid=" + "'" + uid + "'" + ";" };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(str),
    };

    var wait = await fetch('/update', options);
    document.location.reload(true);
}

async function show_jobs() {
    const response = await fetch('/getjobsdata');
    const data = await response.json();

    var table = document.getElementById("mytable");
    for (let i = 0; i < data.results.rows.length; i++) {
        if (data.results.rows[i]['employer'] == queryString) {
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(-1);
            cell1.innerHTML = data.results.rows[i]['title'];
            cell1.id = data.results.rows[i]['uid'];
            var cell2 = row.insertCell(-1);
            cell2.innerHTML = data.results.rows[i]['description'];
            var cell3 = row.insertCell(-1);
            cell3.innerHTML = data.results.rows[i]['responsibilities'];
            var cell4 = row.insertCell(-1);
            cell4.innerHTML = data.results.rows[i]['qualifications'];
            var cell5 = row.insertCell(-1);
            cell5.innerHTML = data.results.rows[i]['city'];
            var cell6 = row.insertCell(-1);
            cell6.innerHTML = '<button type="button" onclick="remove(this)"> Delete </button>';

            cell1.classList.add("text");
            cell2.classList.add("text");
            cell3.classList.add("text");
            cell4.classList.add("text");
            cell5.classList.add("text");
            cell6.firstChild.classList.add("button");
        }
    }
}
const queryString = location.search.substring(1);
show_jobs();
