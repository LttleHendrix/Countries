
let counter = 0;

let favorites = [];
window.localStorage.setItem('favorites', favorites);


fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data => console.log(data));

const myButton = document.getElementById('fetch');
myButton.addEventListener('click', fetchInfo);

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', searchCountry);

document.querySelectorAll('.favoriteButton').forEach(item => {
    item.addEventListener('click', event => {
        console.log("addFavorite")
    })
})


function searchCountry () {
    let searchBar = document.getElementById('searchBar').value;
    console.log(searchBar);
    $.ajax({
        url: 'https://restcountries.eu/rest/v2/name/' + searchBar,
        type: 'GET',
        dataType: 'json',
        error: function() {
            console.log('Error! Unable to search name');
            document.getElementById('template').innerHTML = "No search results found";
        },
        success: function(data) {
            console.log('Success!');
            console.log(data);
            displayResults(data);
        }
    })
}

function fetchInfo () {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(jsonObj => displayUi(jsonObj))
        .catch(() => alert('API Could not be reached at this time'))
}

function displayResults(results) {
    // Use jQuery .Append to add new Div's with country information
    var group = `<div id="theResults" class="group"></div>`;

    for (let i=0; i<results.length; i++) {

        let { name, capital, languages, currencies, population, region, flag} = results[i]
        let template = `
        <div class="country">
        <h1 id="head">${name}</h1>
        <div id="favoriteWrapper">
        <button class="favoriteButton" onclick="addFavorite(${name})">Add Country to Favorites</button>
        </div>
        <p id="content"> -This is a country with its capital in ${capital}.
        <br>-The language(s) spoken here are ${languages[0].name}.
        <br>-The nation of ${name} is
        located in the ${region} region with a population of ${population} and uses ${currencies[0].name}
        as it's currency
        <br><br>Here is a flag of the country<br><br>
        </p>
        <img id="flag" src="${flag}" class="center" alt="" width="600" height="400">
        </div>
        `;

        $(document).ready(function() {
            $("#theResults").append(template);
        });
    }

    console.log(group);
    document.getElementById('template').innerHTML = group


}

function addFavorite(newFavorite) {
    console.log("Trying to add favorite");
    console.log(newFavorite);
}

function displayUi (country) {
    const { name, capital, languages, currencies, population, region, flag} = country[Math.floor(Math.random() * country.length)];
    const template = `
    <div class="country">
    <h1 id="head">${name}</h1>
    <p id="content"> -This is a country with its capital in ${capital}.
    <br>-The language(s) spoken here are ${languages[0].name}.
    <br>-The nation of ${name} is
    located in the ${region} region with a population of ${population} and uses ${currencies[0].name}
    as it's currency
    <br><br>Here is a flag of the country<br><br>
    </p>
    <img id="flag" src="${flag}" class="center" alt="" width="600" height="400">
    </div>
    `;
    counter = counter + 1;
    document.getElementById('template').innerHTML = template
}
