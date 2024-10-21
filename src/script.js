document.addEventListener('DOMContentLoaded', function() {
    loadSchedules();
    
    // Set minimum date-time to current
    const now = new Date();
    const nowStr = now.toISOString().slice(0, 16);
    document.getElementById('startDateTime').min = nowStr;
    document.getElementById('endDateTime').min = nowStr;
});

// Toggle reminder options
document.getElementById('reminderEnabled').addEventListener('change', function() {
    document.getElementById('reminderOptions').style.display = 
        this.checked ? 'block' : 'none';
});

// Form submission
document.getElementById('scheduleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate end date is after start date
    const startDateTime = new Date(document.getElementById('startDateTime').value);
    const endDateTime = new Date(document.getElementById('endDateTime').value);
    
    if (endDateTime <= startDateTime) {
        alert('End date/time must be after start date/time');
        return;
    }

    const schedule = {
        user_id: parseInt(document.getElementById('userId').value, 10), // User ID as integer
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        start_time: document.getElementById('startDateTime').value,
        end_time: document.getElementById('endDateTime').value,
        location: document.getElementById('location').value,
        reminder: document.getElementById('reminderEnabled').checked ? 
            document.getElementById('reminderTime').value : null
    };

    saveSchedule(schedule);
    clearForm();
});

// Clear local storage (optional)
function getSchedules() {
    return JSON.parse(localStorage.getItem('schedules') || '[]');
}

function deleteSchedule(id) {
    const schedules = getSchedules().filter(schedule => schedule.id !== id);
    localStorage.setItem('schedules', JSON.stringify(schedules));
    loadSchedules();
}

function formatDateTime(dateTimeStr) {
    return new Date(dateTimeStr).toLocaleString();
}

function clearForm() {
    document.getElementById('scheduleForm').reset();
    document.getElementById('reminderOptions').style.display = 'none';
}

async function saveSchedule(schedule) {
    try {
        const response = await fetch('http://localhost:5001/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(schedule),
        });
        if (!response.ok) {
            alert('Failed to save schedule: ' + response.statusText); // User feedback
            throw new Error('Failed to save schedule');
        }
        loadSchedules(); // Load schedules after saving
    } catch (error) {
        console.error(error);
    }
}

async function loadSchedules() {
    try {
        const response = await fetch('http://localhost:5001/events');
        const schedules = await response.json();
        
        const schedulesList = document.getElementById('schedulesList');
        schedulesList.innerHTML = ''; // Clear previous list

        schedules.forEach(schedule => {
            const card = document.createElement('div');
            card.className = 'schedule-card'; // Add a class for styling
            card.innerHTML = `
                <h3>${schedule.title}</h3>
                <p><strong>Description:</strong> ${schedule.description || 'N/A'}</p>
                <p><strong>Start:</strong> ${schedule.start_time}</p>
                <p><strong>End:</strong> ${schedule.end_time}</p>
                <p><strong>Location:</strong> ${schedule.location || 'N/A'}</p>
                <p><strong>Reminder:</strong> ${schedule.reminder ? schedule.reminder + ' minutes before' : 'No reminder'}</p>
            `;
            schedulesList.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        alert('Failed to load schedules');
    }
}
