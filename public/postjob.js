function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function postjob() {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var responsibilities = document.getElementById("responsibilities").value;
    var qualifications = document.getElementById("qualifications").value;
    var city = document.getElementById("city").value;
    var keywords = document.getElementById("keywords").value;
    var warning = document.getElementById("warning");

    if (title == "" || description == "" || responsibilities == "" || city == "" || keywords == "" || qualifications == "")
        warning.innerHTML = "Please fill all fields;"
    else {
        warning.innerHTML = "\xa0";
        title = title.replaceAll("\'","");
        description = description.replaceAll("\'","");
        responsibilities = responsibilities.replaceAll("\'","");
        qualifications = qualifications.replaceAll("\'","");
        city = city.replaceAll("\'","");
        keywords = keywords.replaceAll("\'","");
        var str = { code: "insert into jobs values ('" + queryString + "', '" + title + "', '" + description + "', '" + responsibilities + "', '" + qualifications + "', '" + city + "', '" + keywords + "');" };
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