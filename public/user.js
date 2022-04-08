function gotosearch(){
  location.href = "api.html?" + queryString;
}

function gotoedit(){
  location.href = "select_preference.html?" + queryString;
}

function read_username() {
  document.getElementById("welcome").innerHTML = "Welcome " + queryString;
}



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

async function find_uids() {
  const user_pref = [];
  var str = { code: "select * from " + queryString + ";" };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(str),
  };
  var response = await fetch('/getpref', options);
  var data = await response.json();
  for (var i = 0; i < data.results.rows.length; i++) {
    user_pref.push(data.results.rows[i]['preference']);
  }


  const res = await fetch('/getjobsdata');
  const jobsdata = await res.json();

  const uids = [];
  for (var i = 0; i < user_pref.length; i++) {
    for (var j = 0; j < jobsdata.results.rows.length; j++) {
      if (jobsdata.results.rows[j]['keywords'].toLowerCase().includes(user_pref[i].toLowerCase()))
        uids.push(jobsdata.results.rows[j]['uid']);
    }
  }
  console.log(uids);
  show_job(uids, 0);
}

async function show_job(uids, i) {
  var str = { code: "select * from jobs where uid = '" + uids[i] + "';" };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(str),
  };
  var response = await fetch('/getpref', options);
  var data = await response.json();

  console.log(data);

  var html = "";
  html += `<div id="jobCard">`
  if (data.results.rows[0]['title'] != undefined) {
    html += `<p id="title"> ${data.results.rows[0]['title']} </p>`
  }
  if (data.results.rows[0]['employer'] != undefined) {
    html += `<p id="company"> ${data.results.rows[0]['employer']} </p>`
  }
  if (data.results.rows[0]['city'] != undefined) {
    html += `<p id="location"> ${data.results.rows[0]['city']} </p>`
  }
  if (data.results.rows[0]['description'] != undefined) {
    html += `<p id="description"> ${data.results.rows[0]['description']} </p>`
  }
  if (data.results.rows[0]['responsibilities'] != undefined) {
    html += `<p id="responsibilities"> ${data.results.rows[0]['responsibilities']} </p>`
  }
  if (data.results.rows[0]['qualifications'] != undefined) {
    html += `<p id="qualifications"> ${data.results.rows[0]['qualifications']} </p>`
  }
  html += `</div>
    <div id = "jobCardButtons">
      <button class="jobCardButton" id="prevJob" type="button" name="button">Previous Job</button>
      <a class="jobCardButton" id="viewJob" href="${data.results.rows[0]['url']}">Apply</a>
      <button class="jobCardButton" id="nextJob" type="button" name="button">Next Job</button>
    </div>
  `;

  document.getElementById('displayJobs').innerHTML = html;

  var nextJob = document.getElementById("nextJob");
  var prevJob = document.getElementById("prevJob");

  if (i == 0) {
    prevJob.style.color = "gray";
  }
  if (i == uids.length - 1) {
    nextJob.style.color = "gray";
  }

  nextJob.onclick = function () {
    if (i + 1 < uids.length) {
      show_job(uids, i + 1)
    }
  };

  prevJob.onclick = function () {
    if (i > 0) {
      show_job(uids, i - 1);
    }
  };


}

const queryString = location.search.substring(1);
read_username();
find_uids();
