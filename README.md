# Weather Dashboard

A beautiful, real-time weather dashboard application that fetches data from OpenWeatherMap API.

## 🌤️ Features

- **Search Weather** - Find weather for any city worldwide
- **Current Weather** - Display temperature, humidity, wind speed, pressure, and visibility
- **5-Day Forecast** - See upcoming weather predictions
- **Geolocation** - Get weather for your current location
- **Favorite Cities** - Save and manage your favorite cities
- **Persistent Storage** - Favorites saved locally
- **Beautiful UI** - Modern, responsive design with smooth animations
- **Real-time Data** - Live updates from OpenWeatherMap

## 📊 Weather Data Displayed

### Current Weather
- 🌡️ Temperature (in Celsius)
- 🌥️ Weather condition with icon
- 💧 Humidity percentage
- 💨 Wind speed
- 🔽 Atmospheric pressure
- 👁️ Visibility distance

### 5-Day Forecast
- Daily weather conditions
- Temperature highs and lows
- Precipitation probability
- Wind speed

## 🚀 Getting Started

### Requirements
- Web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- Free OpenWeatherMap API key

### Setup

1. **Get a Free API Key**
   - Visit https://openweathermap.org/api
   - Sign up for a free account
   - Generate an API key

2. **Update API Key**
   - Open `js/script.js`
   - Find this line: `const API_KEY = 'a6fa0f96414e4a2e80ef5e9f58ed2dcb';`
   - Replace with your API key

3. **Open in Browser**
   - Open `index.html` in your web browser
   - Start searching for weather!

## 📁 File Structure

```
.
├── index.html              # Main dashboard
├── css/
│   └── style.css          # Styling
├── js/
│   └── script.js          # Functionality
└── README.md              # Documentation
```

## 🌍 Supported Cities

The app supports ANY city in the world that OpenWeatherMap has data for:
- **Malawi**: Lilongwe, Kasungu, Blantyre, Mzuzu, Zomba
- **Worldwide**: London, New York, Tokyo, Sydney, Paris, etc.

## 💾 Data Storage

Favorite cities are saved in your browser's LocalStorage:
- Persists between sessions
- No server required
- Private and secure

## 🎨 Customization

### Change Temperature Units
In `js/script.js`, change:
```javascript
// Metric (Celsius)
`${API_BASE}/weather?q=${city}&appid=${API_KEY}&units=metric`

// to Fahrenheit
`${API_BASE}/weather?q=${city}&appid=${API_KEY}&units=imperial`
```

### Customize Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #ff6b6b;
    /* ... more colors ... */
}
```

## 📱 Responsive Design

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

## 🔒 Privacy & Security

- No user data is stored on servers
- Favorites stored only in your browser
- API calls are encrypted via HTTPS
- No tracking or analytics

## 🌐 Browser Support

- Chrome/Chromium 45+
- Firefox 48+
- Safari 10+
- Edge 12+
- Mobile browsers

## ⚠️ API Limitations

**Free Tier (OpenWeatherMap)**
- 1,000 calls/day
- Data updated every 10 minutes
- No historical data

## 🔧 Troubleshooting

### "City not found" Error
- Check spelling of city name
- Try full name with country (e.g., "London, UK")
- Some small cities may not be available

### Geolocation Not Working
- Enable location access in browser settings
- Check if HTTPS is used (required for geolocation)
- Reload page and try again

### No Weather Data
- Verify API key is correct
- Check internet connection
- API key may have expired or reached limit
- Try again in a few moments

## 📚 API Documentation

For more information about OpenWeatherMap API:
- https://openweathermap.org/api
- https://openweathermap.org/weather-conditions
- https://openweathermap.org/find

## 🎯 Example Cities to Try

**Malawi**
- Lilongwe (Capital)
- Kasungu
- Blantyre
- Mzuzu
- Zomba

**Worldwide**
- London, UK
- New York, USA
- Tokyo, Japan
- Sydney, Australia
- Paris, France
- Dubai, UAE
- Singapore
- Bangkok, Thailand

## 📄 License

Open-source project. Free to use and modify.

## 🙏 Credits

- Weather data by [OpenWeatherMap](https://openweathermap.org)
- Icons by [Font Awesome](https://fontawesome.com)
- Created for [DigitalFix Solutions](https://github.com/Boswellsik/DigitalFix-Solutions)

---

**Made with ❤️ by DigitalFix Solutions**