const API_KEY = 'LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a';
const currentDate = new Date().toISOString().split('T')[0];
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentImageContainer = document.getElementById('current-image-container');
const imageInfo = document.getElementById('image-info');
const searchHistoryList = document.getElementById('search-history');

document.addEventListener('DOMContentLoaded', getCurrentImageOfTheDay);
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const selectedDate = searchInput.value;
  getImageOfTheDay(selectedDate);
  saveSearch(selectedDate);
  addSearchToHistory(selectedDate);
});

async function getCurrentImageOfTheDay() {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${currentDate}`);
    const data = await response.json();
    displayImage(data);
  } catch (error) {
    console.error('Error fetching current image of the day:', error);
    imageInfo.innerHTML = '<p>Error fetching image. Please try again later.</p>';
  }
}

async function getImageOfTheDay(date) {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`);
    const data = await response.json();
    displayImage(data);
  } catch (error) {
    console.error('Error fetching image for the selected date:', error);
    imageInfo.innerHTML = '<p>Error fetching image. Please try again later.</p>';
  }
}

function displayImage(data) {
  imageInfo.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.date}</p>
    <img src="${data.url}" alt="${data.title}" style="max-width: 100%;">
    <p>${data.explanation}</p>
  `;
}

function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem('searches')) || [];
  if (!searches.includes(date)) {
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
  }
}

function addSearchToHistory(date) {
  const listItem = document.createElement('li');
  listItem.textContent = date;
  listItem.addEventListener('click', () => getImageOfTheDay(date));
  searchHistoryList.appendChild(listItem);
}

function loadSearchHistory() {
  const searches = JSON.parse(localStorage.getItem('searches')) || [];
  searches.forEach(date => addSearchToHistory(date));
}

loadSearchHistory();
