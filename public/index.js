async function remove() {
    var name= "xyz";
    var str = { code: "delete from users where name=" + "'" + name + "'" + ";" };
    console.log(str);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(str),
    };

    var wait = await fetch('/update', options);
}
