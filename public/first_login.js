async function type_employer() {
    var str = { code: "update users set type = 2 where name ='" + queryString + "';" };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(str),
    };

    var wait = await fetch('/update', options);

    const response = await fetch('/getcurrentuser');
    const temp = await response.json();
    if (temp.results.rows.length != 0) {
        var str = { code: "update current set type = 2 where name ='" + queryString + "';" };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(str),
        };

        var wait = await fetch('/update', options);
    }

    location.href = "employer.html?" + queryString;
}

async function type_employee() {
    var str = { code: "update users set type = 1 where name ='" + queryString + "';" };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(str),
    };

    var wait = await fetch('/update', options);

    const response = await fetch('/getcurrentuser');
    const temp = await response.json();
    if (temp.results.rows.length != 0) {
        var str = { code: "update current set type = 2 where name ='" + queryString + "';" };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(str),
        };

        var wait = await fetch('/update', options);
    }
    location.href = "select_preference.html?" + queryString;
}

const queryString = location.search.substring(1);