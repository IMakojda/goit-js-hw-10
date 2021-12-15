import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import fetchCountry from './fetchCountries.js';
import cardInfoTpl from './templates/countryInfoCard.hbs'
const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox:document.getElementById('search-box'),
  countryList:document.querySelector('.country-list'),
  countryInfo:document.querySelector('.country-info')
}
  
refs.searchBox.addEventListener('input',debounce(onSearch,DEBOUNCE_DELAY))

function onSearch(e){
e.preventDefault();
const searchValue=refs.searchBox.value.trim();

refs.countryList.innerHTML = '';
refs.countryInfo.innerHTML = '';

fetchCountry(searchValue)
.then(response => {
  if (!response.ok) {
    throw new Error(response.status);
  }
    return response.json();
  })
  .then(countries =>{
    checkArray(countries)
  })
  .catch(errorCatch);
}

function checkArray(array){
  if (array.length>10){Notify.info('Too many matches found. Please enter a more specific name.');
  return;}

  if(array.length>1 && array.length<=10 ){renderList(array);return}

  if(array.length===1 ){ renderCardInfo(array);return}
}

function errorCatch() {
  Notify.failure('Oops, there is no country with that name');
}

function renderList(array){
  const list=[];
  for (const country of array) {
    const object={}
    object.name=country.name.official;
    object.flags=country.flags.svg; 
    list.push(object);
  }
 
  const elements = list.map(({ name, flags}) => {
  return `<li class="country_item"> <img class="flag_item" src='${flags}' width='40' heigth='20' > ${name}</li>`;
  }).join('');

  refs.countryList.insertAdjacentHTML('beforeend', elements);
  const liItem=document.querySelectorAll('.country_item');
  const imgList=document.querySelectorAll('.flag_item');
 
  liItem.forEach(element => {
    element.style.display='flex';
    element.style.alignItems = "center";
    element.style.marginBottom = "10px";
  });

  imgList.forEach(element => {
    element.style.marginRight = "20px";;
  });
  refs.countryList.style.padding="0"
}

function renderCardInfo (array){

const objectCountry={}

  for (const country of array) {
    objectCountry.name=country.name.official;
    objectCountry.flags=country.flags.svg;
    objectCountry.languages=country.languages;
    objectCountry.population=country.population;
    objectCountry.capital=country.capital;
  }

  const markUp = cardInfoTpl(objectCountry)
  refs.countryInfo.innerHTML=markUp;

  const liElement=document.querySelectorAll('.li_info');

  liElement.forEach(element => {
    element.style.fontWeight = "900"
    element.style.listStyle = "none"
  });

  const span=document.querySelectorAll('.span_info');

  span.forEach(element => {
    element.style.fontWeight = "500"
  })

  document.querySelector('.img').style.marginRight='20px'
 
  document.querySelector('.span_name').style.fontSize='30px'
}





