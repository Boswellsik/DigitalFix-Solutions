// OpenWeatherMap API Configuration
// Get your free API key at https://openweathermap.org/api
const API_KEY = 'a6fa0f96414e4a2e80ef5e9f58ed2dcb'; // Free tier API key for demo
const API_BASE = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const currentWeatherSection = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecastSection');
const searchError = document.getElementById('searchError');
const loadingSpinner = document.getElementById('loadingSpinner');
const favoriteBtn = document.getElementById('favoriteBtn');
const favoritesList = document.getElementById('favoritesList');
const noFavorites = document.getElementById('noFavorites');
const favoritesSection = document.getElementById('favoritesSection');

// State
let currentCity = null;
let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayFavorites();
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    locationBtn.addEventListener('click', handleGeolocation);
    favoriteBtn.addEventListener('click', toggleFavorite);
});

// Handle Search
function handleSearch() {
    const city = searchInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    fetchWeather(city);
}

// Handle Geolocation
function handleGeolocation() {
    if ('geolocation' in navigator) {
        showLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                showLoading(false);
                showError('Unable to get your location. Please enable location access.');
                console.error('Geolocation error:', error);
            }
        );
    } else {
        showError('Geolocation is not supported by your browser');
    }
}

// Fetch Weather by City Name
async function fetchWeather(city) {
    showLoading(true);
    clearError();
    
    try {
        const response = await fetch(
            `${API_BASE}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayCurrentWeather(data);
        fetchForecast(data.coord.lat, data.coord.lon);
    } catch (error) {
        showError(error.message);
        console.error('Weather fetch error:', error);
    } finally {
        showLoading(false);
    }
}

// Fetch Weather by Coordinates
async function fetchWeatherByCoords(lat, lon) {
    showLoading(true);
    clearError();
    
    try {
        const response = await fetch(
            `${API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Unable to fetch weather');
        }
        
        const data = await response.json();
        displayCurrentWeather(data);
        fetchForecast(lat, lon);
    } catch (error) {
        showError(error.message);
        console.error('Weather fetch error:', error);
    } finally {
        showLoading(false);
    }
}

// Fetch 5-Day Forecast
async function fetchForecast(lat, lon) {
    try {
        const response = await fetch(
            `${API_BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Unable to fetch forecast');
        }
        
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Forecast fetch error:', error);
    }
}

// Display Current Weather
function displayCurrentWeather(data) {
    currentCity = {
        name: data.name,
        country: data.sys.country,
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        visibility: (data.visibility / 1000).toFixed(1),
        icon: data.weather[0].icon,
        lat: data.coord.lat,
        lon: data.coord.lon
    };
    
    // Update favorite button state
    updateFavoriteButtonState();
    
    // Populate current weather
    document.getElementById('cityName').textContent = 
        `${currentCity.name}, ${currentCity.country}`;
    document.getElementById('weatherDate').textContent = 
        new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    document.getElementById('temperature').textContent = `${currentCity.temp}°C`;
    document.getElementById('weatherDesc').textContent = currentCity.description;
    document.getElementById('humidity').textContent = `${currentCity.humidity}%`;
    document.getElementById('windSpeed').textContent = `${currentCity.windSpeed} m/s`;
    document.getElementById('pressure').textContent = `${currentCity.pressure} hPa`;
    document.getElementById('visibility').textContent = `${currentCity.visibility} km`;
    
    // Set weather icon
    const iconUrl = `https://openweathermap.org/img/wn/${currentCity.icon}@4x.png`;
    document.getElementById('weatherIcon').src = iconUrl;
    
    // Show current weather section
    currentWeatherSection.classList.remove('hidden');
    searchInput.value = '';
}

// Display 5-Day Forecast
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    
    // Group forecast by day (get one entry per day at noon)
    const dailyForecasts = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US');
        
        // Only include forecasts at noon
        if (date.getHours() === 12 && !dailyForecasts[day]) {
            dailyForecasts[day] = item;
        }
    });
    
    // Display up to 5 days
    Object.values(dailyForecasts).slice(0, 5).forEach(item => {
        const date = new Date(item.dt * 1000);
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-date">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" 
                 alt="${item.weather[0].description}" class="forecast-icon">
            <div class="forecast-temp">${Math.round(item.main.temp)}°C</div>
            <div class="forecast-desc">${item.weather[0].description}</div>
            <div class="forecast-details">
                <div class="forecast-detail-item">💧 Humidity: ${item.main.humidity}%</div>
                <div class="forecast-detail-item">💨 Wind: ${item.wind.speed} m/s</div>
            </div>
        `;
        forecastContainer.appendChild(card);
    });
    
    forecastSection.classList.remove('hidden');
}

// Toggle Favorite
function toggleFavorite() {
    if (!currentCity) return;
    
    const existing = favorites.find(fav => 
        fav.name === currentCity.name && fav.country === currentCity.country
    );
    
    if (existing) {
        favorites = favorites.filter(fav => 
            !(fav.name === currentCity.name && fav.country === currentCity.country)
        );
    } else {
        favorites.push(currentCity);
    }
    
    saveFavorites();
    updateFavoriteButtonState();
    displayFavorites();
}

// Update Favorite Button State
function updateFavoriteButtonState() {
    if (!currentCity) return;
    
    const isFavorite = favorites.some(fav => 
        fav.name === currentCity.name && fav.country === currentCity.country
    );
    
    if (isFavorite) {
        favoriteBtn.classList.add('active');
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Remove from Favorites';
    } else {
        favoriteBtn.classList.remove('active');
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i> Add to Favorites';
    }
}

// Display Favorites
function displayFavorites() {
    if (favorites.length === 0) {
        favoritesList.classList.add('hidden');
        noFavorites.style.display = 'block';
        return;
    }
    
    favoritesList.classList.remove('hidden');
    noFavorites.style.display = 'none';
    favoritesList.innerHTML = '';
    
    favorites.forEach(city => {
        const card = document.createElement('div');
        card.className = 'favorite-city-card';
        card.innerHTML = `
            <div class="favorite-city-name">${city.name}, ${city.country}</div>
            <img src="https://openweathermap.org/img/wn/${city.icon}@2x.png" 
                 alt="${city.description}" class="favorite-city-icon">
            <div class="favorite-city-temp">${city.temp}°C</div>
            <div class="favorite-city-desc">${city.description}</div>
            <div class="favorite-actions">
                <button class="btn-view" onclick="fetchWeather('${city.name}')">View</button>
                <button class="btn-remove" onclick="removeFavorite('${city.name}', '${city.country}')">Remove</button>
            </div>
        `;
        favoritesList.appendChild(card);
    });
}

// Remove Favorite
function removeFavorite(name, country) {
    favorites = favorites.filter(fav => !(fav.name === name && fav.country === country));
    saveFavorites();
    updateFavoriteButtonState();
    displayFavorites();
}

// Save Favorites to LocalStorage
function saveFavorites() {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
}

// Show Loading Spinner
function showLoading(show) {
    loadingSpinner.classList.toggle('hidden', !show);
}

// Show Error Message
function showError(message) {
    searchError.textContent = message;
    searchError.classList.add('show');
}

// Clear Error Message
function clearError() {
    searchError.textContent = '';
    searchError.classList.remove('show');
}