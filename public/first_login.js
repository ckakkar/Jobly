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

    var create = { code: "create table "+queryString+" (preference text);" };
    const create_options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(create),
    };

    var wait = await fetch('/update', create_options);

    location.href = "select_preference.html?" + queryString;
}

const queryString = location.search.substring(1);