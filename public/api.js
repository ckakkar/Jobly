var app_id = "7158e4e2";
var app_key = "a1522ae3131166f93f452dab754e4a05";

async function callApi() {
  var position = encodeURIComponent(document.getElementById('position').value.trim());
  var location = encodeURIComponent(document.getElementById('location').value.trim());

  var url = getUrl(position, location);

  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }
  fetch(url, options)
  .then(response => response.json())
  .then(data => displaySingleJob(data.results, 0))
  .catch (error => console.log(error));
}

function displaySingleJob(results, i) {
  console.log(results);
  if (results.length == 0) {
      document.getElementById('displayJobs').innerHTML = `<div id="jobCard"> No results. Please refine your search <div>`;
      return;
  }

  var html = "";
  html += `<div id="jobCard">`
    if (results[i].title != undefined) {
      html += `<p id="title"> ${results[i].title} </p>`
    }
    if (results[i].company.display_name != undefined) {
      html += `<p id="company"> ${results[i].company.display_name} </p>`
    }
    if (results[i].salary_min != undefined && results[i].salary_max != undefined) {
      html += `<p id "salary"> $${results[i].salary_min} - $${results[i].salary_max} a year </p>`
    }
    else if (results[i].salary_min != undefined) {
      html += `<p id "salary"> $${results[i].salary_min} a year </p>`
    }
    else if (results[i].salary_max != undefined) {
      html += `<p id "salary"> $${results[i].salary_max} a year </p>`
    }
    if (results[i].location.display_name != undefined) {
      html += `<p id="location"> ${results[i].location.display_name} </p>`
    }
    if (results[i].description != undefined) {
      html += `<p id="description"> ${results[i].description} </p>`
    }
    html += `</div>
    <div id = "jobCardButtons">
      <button class="jobCardButton" id="prevJob" type="button" name="button">Previous Job</button>
      <a class="jobCardButton" id="viewJob" href="${results[i].redirect_url}">View Job</a>
      <button class="jobCardButton" id="nextJob" type="button" name="button">Next Job</button>
    </div>
  `;

  document.getElementById('displayJobs').innerHTML = html;

  var nextJob = document.getElementById("nextJob");
  var prevJob = document.getElementById("prevJob");

  if (i == 0) {
    prevJob.style.color = "gray";
  }
  if (i == results.length - 1) {
    nextJob.style.color = "gray";
  }

  nextJob.onclick = function() {
    if (i + 1 < results.length) {
      displaySingleJob(results, i + 1)
    }
  };

  prevJob.onclick = function() {
    if (i > 0) {
      displaySingleJob(results, i - 1);
    }
  };
}

// function displayJobs(results) {
//
//   if (results.length == 0) {
//       document.getElementById('displayJobs').innerHTML = "No results. Please refine your search"
//       return;
//   }
//
//   document.getElementById('displayJobs').innerHTML = '';
//   for (let i = 0; i < results.length; i++) {
//     document.getElementById('displayJobs').innerHTML += `
//     <table classname="jobCard">
//       <p class="jobField"> Title: ${results[i].title} </p>
//       <p class="jobField"> Company: ${results[i].company.display_name} </p>
//       <p class="jobField"> Location: ${results[i].location.display_name} </p>
//       <p class="jobField"> Description: ${results[i].description} </p>
//       <a id="viewJob" href="${results[i].redirect_url}">View Job</a>
//       <br>
//     <table/>
//     `;
//   }
// }

function getUrl(position, location) {
  return `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${app_id}&app_key=${app_key}&results_per_page=30&what=${position}&where=${location}`
}
