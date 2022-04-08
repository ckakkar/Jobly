function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function postjob() {
    var title = document.getElementById("title").value;
    var uid = document.getElementById("uid").value;
    var description = document.getElementById("description").value;
    var responsibilities = document.getElementById("responsibilities").value;
    var qualifications = document.getElementById("qualifications").value;
    var city = document.getElementById("city").value;
    var keywords = document.getElementById("keywords").value;
    var url = document.getElementById("url").value;
    var warning = document.getElementById("warning");

    if (title == "" || url == "" || uid == "" || description == "" || responsibilities == "" || city == "" || keywords == "" || qualifications == "")
        warning.innerHTML = "Please fill all fields";
    else {
        warning.innerHTML = "\xa0";

        //checking job UID
        const response = await fetch('/getjobsdata');
        const data = await response.json();
        for (var i = 0; i < data.results.rows.length; i++) {
            if (uid == data.results.rows[i]['uid']) {
                warning.innerHTML = "Job UID already taken, please choose another";
                return;
            }
        }

        title = title.replaceAll("\'", "");
        uid = uid.replaceAll("\'", "");
        url = url.replaceAll("\'", "");
        description = description.replaceAll("\'", "");
        responsibilities = responsibilities.replaceAll("\'", "");
        qualifications = qualifications.replaceAll("\'", "");
        city = city.replaceAll("\'", "");
        keywords = keywords.replaceAll("\'", "");
        var str = { code: "insert into jobs values ('" + queryString + "', '" + title + "', '" + uid + "', '" + url + "', '" + description + "', '" + responsibilities + "', '" + qualifications + "', '" + city + "', '" + keywords + "');" };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(str),
        };

        var wait = await fetch('/update', options);
        warning.innerHTML = "Job Posted";
        await delay(800);
        location.href = "employer.html?" + queryString;
    }
}

const queryString = location.search.substring(1);