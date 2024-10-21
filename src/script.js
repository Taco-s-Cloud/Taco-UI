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
        id: Date.now(),
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        startDateTime: document.getElementById('startDateTime').value,
        endDateTime: document.getElementById('endDateTime').value,
        location: document.getElementById('location').value,
        reminder: document.getElementById('reminderEnabled').checked ? 
            document.getElementById('reminderTime').value : null
    };

    saveSchedule(schedule);
    clearForm();
    loadSchedules();
});

function saveSchedule(schedule) {
    const schedules = getSchedules();
    schedules.push(schedule);
    localStorage.setItem('schedules', JSON.stringify(schedules));
}

function getSchedules() {
    return JSON.parse(localStorage.getItem('schedules') || '[]');
}

function deleteSchedule(id) {
    const schedules = getSchedules().filter(schedule => schedule.id !== id);
    localStorage.setItem('schedules', JSON.stringify(schedules));
    loadSchedules();
}

function loadSchedules() {
    const schedulesList = document.getElementById('schedulesList');
    const schedules = getSchedules();
    
    schedulesList.innerHTML = '<h2>Saved Schedules</h2>';
    
    schedules.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))
            .forEach(schedule => {
        const card = document.createElement('div');
        card.className = 'schedule-card';
        
        const reminderText = schedule.reminder ? 
            `Reminder: ${schedule.reminder} minutes before` : 'No reminder set';

        card.innerHTML = `
            <button class="delete-btn" onclick="deleteSchedule(${schedule.id})">Delete</button>
            <h3>${schedule.title}</h3>
            <p><strong>Description:</strong> ${schedule.description || 'N/A'}</p>
            <p><strong>Start:</strong> ${formatDateTime(schedule.startDateTime)}</p>
            <p><strong>End:</strong> ${formatDateTime(schedule.endDateTime)}</p>
            <p><strong>Location:</strong> ${schedule.location || 'N/A'}</p>
            <p><strong>${reminderText}</strong></p>
        `;
        
        schedulesList.appendChild(card);
    });
}

function formatDateTime(dateTimeStr) {
    return new Date(dateTimeStr).toLocaleString();
}

function clearForm() {
    document.getElementById('scheduleForm').reset();
    document.getElementById('reminderOptions').style.display = 'none';
}