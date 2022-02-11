const countriesEl = document.querySelector('.countries');
const formEl = document.querySelector('.form');
const formInputEl = document.querySelector('.form-row input');
const btnEl = document.querySelector('.btn');
const btnSearchEl = document.querySelector('.btn__search');

const hideForm = function() {
    formEl.style.display = 'none';
    btnEl.style.display = 'none';
    btnSearchEl.style.display = 'inline';
}

const futureData = fetch('https://restcountries.com/v3.1/name/peru');
console.log(futureData);

const getCountryData = function(country) {
    // Country 1
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

        const neighbour = data[0].borders[0];

        if(!neighbour) return;

        // Country 2
        return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    }).then(neighbourData => neighbourData.json()).then(data => {
        console.log(data);
        
        const html = `
            <article class="country neighbour">
                <img class="country__img" src="${data.flag}" />
                <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                    +data.population / 1000000
                ).toFixed(1)}M people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
                </div>
            </article>
        `;

        countriesEl.insertAdjacentHTML('beforeend', html);
    });

}

btnEl.addEventListener('click', () => {
    getCountryData(formInputEl.value);
    hideForm();
});

btnSearchEl.addEventListener('click', () => {
    location.reload()
})

// TODO: Find a way to deal with the fact the data is different for each country so you don't get any more undefined values on the product card