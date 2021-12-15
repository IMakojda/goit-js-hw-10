export default function fetchCountry(name) {
    return fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags `,
    )
}




















// export function fetchCountry(name){
//     fetch(`https://restcountries.com/v2/name/${name}?fields=name,population,capital,languages,flag`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(array =>{
//         getArray(array)
      
//     })
//     .catch(error => {
//         Notify.failure('Oops there is no country with that name')
//     });
// }

// const refs = {
//     countryList:document.querySelector('.country-list'),
//     countryInfo:document.querySelector('.country-info')
// }   
// refs.countryList.style.listStyle = "none"
// function getArray(array){
//     if (array.length>10){Notify.info('Too many matches found. Please enter a more specific name.');cleanSearchInput() }
//     if (array.length>1 && array.length<=10 ){renderList(array) }
//     if (array.length===1){renderCardCountry() }
    
// }

// function renderList(countries) {
//     console.log(countries);
//     const elements = countries.map(({ name, flag}) => {
// return `<li class="country_item"> <img class="flag_item" src='${flag}' width='40' heigth='20' > ${name}</li>`;
// }).join('');
// refs.countryList.insertAdjacentHTML('beforeend', elements);

// };

      
// function renderCardCountry(country){
//     console.log('Country');
// }
// export function cleanSearchInput(){
// refs.countryList.innerHTML = '';
// refs.countryInfo.innerHTML = '';
// }