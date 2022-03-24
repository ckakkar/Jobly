async function show_jobs() {
    const response = await fetch('/getjobsdata');
    const data = await response.json();

    var table = document.getElementById("mytable");
    for (let i = 0; i < data.results.rows.length; i++) {
        if (data.results.rows[i]['employer'] == queryString) {
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(-1);
            cell1.innerHTML = data.results.rows[i]['title'];

            var cell2 = row.insertCell(-1);
            cell2.innerHTML = data.results.rows[i]['description'];
            var cell3 = row.insertCell(-1);
            cell3.innerHTML = data.results.rows[i]['responsibilities'];
            var cell4 = row.insertCell(-1);
            cell4.innerHTML = data.results.rows[i]['qualifications'];
            var cell5 = row.insertCell(-1);
            cell5.innerHTML = data.results.rows[i]['city'];
            var cell6 = row.insertCell(-1);
            cell6.innerHTML = data.results.rows[i]['keywords'];
            cell1.classList.add("text");
            cell2.classList.add("text");
            cell3.classList.add("text");
            cell4.classList.add("text");
            cell5.classList.add("text");
            cell6.classList.add("text");
        }
    }
}
const queryString = location.search.substring(1);
show_jobs();
