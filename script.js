const countriesEl = document.querySelector('.countries');

const futureData = fetch('https://restcountries.com/v3.1/name/peru');
console.log(futureData);

const getCountryData = function(country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`).then(response => response.json()).then(data => {
        console.log(data)
    
        countriesEl.innerHTML = `
            <article class="country">
                <img class="country__img" src="${data[0].flags.png}" />
                <div class="country__data">
                    <h3 class="country__name">${data[0].name.common}</h3>
                    <h4 class="country__region">${data[0].region}</h4>
                    <p class="country__row"><span>👫</span>${(data[0].population / 1000000).toFixed(1)}M people</p>
                    <p class="country__row"><span>🗣️</span>${data[0].languages.eng}</p>
                    <p class="country__row"><span>💰</span>${data[0].currencies}</p>
                </div>
            </article>
        `;
    });

}

// getCountryData('ghana');

// Phase 2 TODO: Make it so the user can type in the country they want to see the data for rather than it being hardcoded to Ireland, need to add a form field then find a way to deal with the fact the data is different for each country