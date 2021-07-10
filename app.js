
let counter = 0;


fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data => console.log(data));

const myButton = document.getElementById('fetch');
myButton.addEventListener('click', fetchInfo);

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', searchCountry);

function searchCountry () {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json());
    let searchBar = document.getElementById('searchBar');
    console.log(searchBar);
        
}

function fetchInfo () {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(jsonObj => displayUi(jsonObj))
        .catch(() => alert('API Could not be reached at this time'))
}

function displayUi (country) {
    const { name, capital, languages, currencies, population, region, flag} = country[counter]
    const template = `
    <div>
    <h1 id="h ead">${name}</h1>
    <p id="content"> -This is a country with its capital in ${capital}.
    <br>-The language(s) spoken here are ${languages[0].name}.
    <br>-The nation of ${name} is
    located in the ${region} region with a population of ${population} and uses ${currencies[0].name}
    as it's currency
    <br><br>Here is a flag of the country<br><br>
    </p>
    <img id="flag" src="${flag}" class="center" alt="" width="600" height="400">
    </div>
    `
    counter = counter + 1;
    document.getElementById('template').innerHTML = template
}