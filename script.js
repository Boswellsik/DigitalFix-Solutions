// Popular timezones
const popularTimezones = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Asia/Hong_Kong',
    'Asia/Shanghai',
    'Asia/Dubai',
    'Asia/Singapore',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Pacific/Auckland',
    'Africa/Johannesburg',
    'Africa/Cairo',
    'America/Toronto',
    'America/Mexico_City',
    'America/Sao_Paulo',
    'Asia/Kolkata',
    'Asia/Bangkok',
    'Asia/Jakarta'
];

// Store active timezones
let activeTimezones = JSON.parse(localStorage.getItem('activeTimezones')) || ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    displayPopularTimezones();
    renderClocks();
    updateClocks();
    setInterval(updateClocks, 1000);
});

function displayPopularTimezones() {
    const container = document.getElementById('timezoneList');
    container.innerHTML = popularTimezones
        .map(tz => `<span class="timezone-tag" onclick="quickAddTimezone('${tz}')">${tz}<\/span>`)
        .join('');
}

function quickAddTimezone(timezone) {
    if (!activeTimezones.includes(timezone)) {
        activeTimezones.push(timezone);
        saveTimezones();
        renderClocks();
    }
}

function addTimezone() {
    const input = document.getElementById('timezoneInput');
    const timezone = input.value.trim();

    if (!timezone) {
        alert('Please enter a timezone');
        return;
    }

    // Validate timezone
    try {
        new Date().toLocaleString('en-US', { timeZone: timezone });
    } catch (error) {
        alert(`Invalid timezone: ${timezone}`);
        return;
    }

    if (activeTimezones.includes(timezone)) {
        alert('Timezone already added');
        return;
    }

    activeTimezones.push(timezone);
    saveTimezones();
    renderClocks();
    input.value = '';
}

function removeTimezone(timezone) {
    activeTimezones = activeTimezones.filter(tz => tz !== timezone);
    saveTimezones();
    renderClocks();
}

function saveTimezones() {
    localStorage.setItem('activeTimezones', JSON.stringify(activeTimezones));
}

function renderClocks() {
    const container = document.getElementById('clocksContainer');

    if (activeTimezones.length === 0) {
        container.innerHTML = '<div class="no-clocks">No timezones added. Add one to get started!</div>';
        return;
    }

    container.innerHTML = activeTimezones
        .map(timezone => `
            <div class="clock" id="clock-${timezone}">
                <div class="timezone-name">${formatTimezoneName(timezone)}<\/div>
                <div class="digital-time" id="time-${timezone}">--:--:--<\/div>
                <div class="clock-info">
                    <span class="utc-offset" id="offset-${timezone}">UTC<\/span>
                    <button class="remove-btn" onclick="removeTimezone('${timezone}')">Remove<\/button>
                <\/div>
            <\/div>
        `)
        .join('');
}

function updateClocks() {
    const now = new Date();

    activeTimezones.forEach(timezone => {
        try {
            // Get time in specific timezone
            const timeString = now.toLocaleString('en-US', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            // Get date for UTC offset calculation
            const dateObj = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
            const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
            const offsetHours = Math.round((dateObj - utcDate) / (1000 * 60 * 60));
            const offsetSign = offsetHours >= 0 ? '+' : '';

            // Update time display
            const timeElement = document.getElementById(`time-${timezone}`);
            if (timeElement) {
                timeElement.textContent = timeString;
            }

            // Update UTC offset display
            const offsetElement = document.getElementById(`offset-${timezone}`);
            if (offsetElement) {
                offsetElement.textContent = `UTC${offsetSign}${offsetHours}`;
            }
        } catch (error) {
            console.error(`Error updating timezone ${timezone}:`, error);
        }
    });
}

function formatTimezoneName(timezone) {
    return timezone
        .split('/')
        .map(part => part.replace(/_/g, ' '))
        .join(' / ');
}

// Allow Enter key to add timezone
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('timezoneInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTimezone();
        }
    });
});