function go_to_postjob() {
    location.href = "postjob.html?" + queryString;
}

function go_to_postedjobs() {
    location.href = "postedjobs.html?" + queryString;
}


const queryString = location.search.substring(1);
document.getElementById("welcome").innerHTML = "Welcome "+ queryString;