var app_id = "7158e4e2";
var app_key = "a1522ae3131166f93f452dab754e4a05";

async function callApi() {
  var position = encodeURIComponent(document.getElementById('position').value.trim());
  var location = encodeURIComponent(document.getElementById('location').value.trim());

  console.log(`Position = ${position}`);
  console.log(`Location = ${location}`);

  var url = getUrl(position, location);
  console.log(url);

  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  }
  fetch(url, options)
  .then(response => response.json())
  .then(data => displayJobs(data.results))
  .catch (error => console.log(error));
}

function displayJobs(results) {
  console.log(results);
  document.getElementById('displayJobs').innerHTML = '';
  for (let i = 0; i < results.length; i++) {
    document.getElementById('displayJobs').innerHTML += `
    <table classname="jobCard">
      <p class="jobField"> Title: ${results[i].title} </p>
      <p class="jobField"> Company: ${results[i].company.display_name} </p>
      <p class="jobField"> Location: ${results[i].location.display_name} </p>
      <p class="jobField"> Description: ${results[i].description} </p>
      <a id="viewJob" href="${results[i].redirect_url}">View Job</a>
      <br>
    <table/>
    `;
  }
}

function getUrl(position, location) {
  return `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${app_id}&app_key=${app_key}&results_per_page=10&what=${position}&where=${location}`
}
