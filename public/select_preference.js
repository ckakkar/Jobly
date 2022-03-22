async function add_preference() {
    var pref = document.getElementById("pref").value;
    var str = { code: "insert into "+queryString+" values ('"+pref+"');" };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(str),
    };

    var wait = await fetch('/update', options);
}

const queryString = location.search.substring(1);

