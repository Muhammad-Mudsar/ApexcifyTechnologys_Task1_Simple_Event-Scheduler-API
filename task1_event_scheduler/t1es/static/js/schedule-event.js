document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('eventForm');
    const eventTypeSelect = document.getElementById('eventType');
    const locationField = document.getElementById('locationField');
    const virtualLinkField = document.getElementById('virtualLinkField');

    // Show/hide location based on event type
    eventTypeSelect.addEventListener('change', function() {
        if (this.value === 'virtual') {
            locationField.style.display = 'none';
            virtualLinkField.style.display = 'block';
            document.getElementById('eventLocation').removeAttribute('required');
            document.getElementById('eventLink').setAttribute('required', 'required');
        } else if (this.value === 'hybrid') {
            locationField.style.display = 'block';
            virtualLinkField.style.display = 'block';
            document.getElementById('eventLocation').setAttribute('required', 'required');
            document.getElementById('eventLink').setAttribute('required', 'required');
        } else {
            locationField.style.display = 'block';
            virtualLinkField.style.display = 'none';
            document.getElementById('eventLocation').setAttribute('required', 'required');
            document.getElementById('eventLink').removeAttribute('required');
        }
    });

    // Form submission
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            title: document.getElementById('eventTitle').value,
            category: document.getElementById('eventCategory').value,
            description: document.getElementById('eventDescription').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            endDate: document.getElementById('eventEndDate').value,
            endTime: document.getElementById('eventEndTime').value,
            type: document.getElementById('eventType').value,
            location: document.getElementById('eventLocation').value || document.getElementById('eventLink').value,
            capacity: document.getElementById('eventCapacity').value,
            featured: document.getElementById('featured').checked
        };

        // Validate dates
        const startDate = new Date(`${formData.date}T${formData.time}`);
        const endDate = new Date(`${formData.endDate}T${formData.endTime}`);

        if (endDate <= startDate) {
            showAlert('End date/time must be after start date/time', 'danger');
            return;
        }

        // Save to localStorage (in real app, this would be sent to backend)
        let events = JSON.parse(localStorage.getItem('userEvents')) || [];
        const event = {
            id: Date.now(),
            ...formData,
            createdAt: new Date().toISOString(),
            attendees: 0
        };
        events.push(event);
        localStorage.setItem('userEvents', JSON.stringify(events));

        // Show success message
        showAlert(`Event "${formData.title}" created successfully!`, 'success');
        
        // Reset form
        eventForm.reset();
        locationField.style.display = 'block';
        virtualLinkField.style.display = 'none';

        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'events.html';
        }, 2000);
    });

    // Set minimum end date to start date
    document.getElementById('eventDate').addEventListener('change', function() {
        document.getElementById('eventEndDate').min = this.value;
        document.getElementById('eventEndDate').value = this.value;
    });

    // Set minimum end time if same date
    document.getElementById('eventTime').addEventListener('change', function() {
        const startDate = document.getElementById('eventDate').value;
        const endDate = document.getElementById('eventEndDate').value;
        
        if (startDate === endDate) {
            document.getElementById('eventEndTime').min = this.value;
        }
    });
});

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        <strong>${type === 'success' ? '✓' : '✕'}</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('eventForm');
    form.parentNode.insertBefore(alertDiv, form);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}
