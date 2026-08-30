# Digital Clock - Multiple Time Zones

A beautiful, interactive web application that displays the current time across multiple time zones simultaneously.

## 🌟 Features

- **Real-time Clock Updates**: Displays accurate time with seconds precision
- **Multiple Time Zones**: View time in multiple time zones at once
- **Add/Remove Timezones**: Easily add new timezones or remove existing ones
- **UTC Offset Display**: Shows the UTC offset for each timezone
- **Popular Timezones**: Quick-select buttons for commonly used timezones
- **Local Storage**: Remembers your selected timezones between sessions
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Modern UI**: Gradient backgrounds and smooth animations

## 🎯 Supported Timezones

The application supports all IANA timezone identifiers, including:

### Popular Timezones
- **UTC** - Coordinated Universal Time
- **Americas**
  - America/New_York (EST/EDT)
  - America/Chicago (CST/CDT)
  - America/Denver (MST/MDT)
  - America/Los_Angeles (PST/PDT)
  - America/Toronto (EST/EDT)
  - America/Mexico_City (CST/CDT)
  - America/Sao_Paulo (BRT/BRST)

- **Europe**
  - Europe/London (GMT/BST)
  - Europe/Paris (CET/CEST)
  - Europe/Berlin (CET/CEST)

- **Asia**
  - Asia/Tokyo (JST)
  - Asia/Hong_Kong (HKT)
  - Asia/Shanghai (CST)
  - Asia/Dubai (GST)
  - Asia/Singapore (SGT)
  - Asia/Kolkata (IST)
  - Asia/Bangkok (ICT)
  - Asia/Jakarta (WIB)

- **Africa**
  - Africa/Johannesburg (SAST)
  - Africa/Cairo (EET)

- **Oceania**
  - Australia/Sydney (AEDT/AEST)
  - Australia/Melbourne (AEDT/AEST)
  - Pacific/Auckland (NZDT/NZST)

## 🚀 How to Use

1. **Open the Application**: Open `index.html` in your web browser
2. **Quick Add Timezone**: Click any timezone tag in the "Available Timezones" section
3. **Custom Add Timezone**: 
   - Type a timezone identifier (e.g., `America/New_York`)
   - Click "Add Timezone" or press Enter
4. **Remove Timezone**: Click the "Remove" button on any clock card
5. **Your Preferences**: The app automatically saves your selected timezones

## 📁 File Structure

```
.
├── index.html          # HTML structure
├── style.css           # Styling and animations
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## 💻 Technical Details

- **Language**: HTML5, CSS3, JavaScript (Vanilla)
- **Storage**: LocalStorage for timezone persistence
- **No Dependencies**: Runs entirely in the browser, no external libraries required
- **Timezone Database**: Uses browser's built-in IANA timezone support

## 🔧 Customization

### Change Default Timezones
Edit the default timezones in `script.js`:
```javascript
let activeTimezones = JSON.parse(localStorage.getItem('activeTimezones')) || ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];
```

### Add More Popular Timezones
Update the `popularTimezones` array in `script.js`:
```javascript
const popularTimezones = [
    'UTC',
    'Your/Timezone',
    // ... more timezones
];
```

### Customize Styling
Edit `style.css` to change colors, fonts, or layout:
- Gradient background: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`
- Clock card styles: `.clock` class
- Digital time display: `.digital-time` class

## 🌐 Browser Compatibility

Works on all modern browsers:
- Chrome/Chromium 45+
- Firefox 48+
- Safari 10+
- Edge 12+

## 🛠️ Installation

No installation required! Simply:
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start using the clock

## 📝 Example Timezones

```
UTC                    - Coordinated Universal Time
America/New_York       - Eastern Time (ET)
Europe/London          - Greenwich Mean Time (GMT) / British Summer Time (BST)
Asia/Tokyo             - Japan Standard Time (JST)
Australia/Sydney       - Australian Eastern Time (AET)
America/Los_Angeles    - Pacific Time (PT)
Europe/Paris           - Central European Time (CET)
Asia/Dubai             - Gulf Standard Time (GST)
```

## 🎨 Features Showcase

- ⏰ Real-time updates every second
- 🎨 Beautiful gradient UI with smooth animations
- 📱 Fully responsive design
- 💾 Persistent timezone storage
- 🌍 Support for all IANA timezones
- ♿ Clean and intuitive interface

## 🤝 Contributing

Feel free to modify and enhance this project:
- Add new features
- Improve the UI/UX
- Add more timezone presets
- Create additional functionality

## 📄 License

This project is open-source and available for personal and commercial use.

## 📧 Contact

For issues or suggestions, please reach out to **DigitalFix Solutions**:
- Email: digitalfixsolutions77@gmail.com
- WhatsApp: 0992016625

---

**Made with ❤️ by DigitalFix Solutions**