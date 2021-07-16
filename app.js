
let counter = 0;

let favorites = [];
window.localStorage.setItem('favorites', favorites);


fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    

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
    $.ajax({
        url: 'https://restcountries.eu/rest/v2/name/' + searchBar,
        type: 'GET',
        dataType: 'json',
        error: function() {
            console.log('Error! Unable to search name');
            document.getElementById('template').innerHTML = "No search results found";
        },
        success: function(data) {
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
        <button class="favoriteButton" onclick="addFavorite('${name}')">Add Country to Favorites</button>
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

    document.getElementById('template').innerHTML = group


}

function addFavorite(newCountry) {
    console.log("Trying to add favorite");
    console.log(newCountry);

    let favorites = [];
    // retrieves old data if there is old data / already one or more favorite countries
    if(window.localStorage.getItem('favorites') !== null && window.localStorage.getItem('favorites').length != 0) {
        console.log("Apparently favorites is not null and is "+window.localStorage.getItem('favorites'));

        // retrieves favorites as a string..?
        console.log(window.localStorage.getItem('favorites') + window.localStorage.getItem('favorites').dataType);
        let retrievedFavorites = JSON.parse(window.localStorage.getItem("favorites"));
        console.log(retrievedFavorites);


        // convert string to array



        // add new country below 
    }

    favorites.push((newCountry));
    console.log()

    window.localStorage.setItem('favorites', favorites);




}

function showFavorites() {
    console.log(window.localStorage.getItem('favorites'));
}

function undoFavorite(toUndo) {

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
