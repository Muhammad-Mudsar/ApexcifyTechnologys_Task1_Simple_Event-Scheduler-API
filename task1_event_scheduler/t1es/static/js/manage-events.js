let currentPage = 1;
const eventsPerPage = 5;
let filteredEvents = [...adminEvents];

document.addEventListener('DOMContentLoaded', function() {
    loadEventsTable();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('searchInput')?.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        filteredEvents = adminEvents.filter(event =>
            event.title.toLowerCase().includes(query) ||
            event.location.toLowerCase().includes(query)
        );
        currentPage = 1;
        loadEventsTable();
    });

    document.getElementById('statusFilter')?.addEventListener('change', function(e) {
        const status = e.target.value;
        filteredEvents = status ? 
            adminEvents.filter(event => event.status === status) :
            [...adminEvents];
        currentPage = 1;
        loadEventsTable();
    });
}

function loadEventsTable() {
    const tbody = document.getElementById('eventsTableBody');
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

    if (paginatedEvents.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4 text-muted">No events found</td>
            </tr>
        `;
    } else {
        tbody.innerHTML = paginatedEvents.map(event => `
            <tr>
                <td class="fw-semibold">${event.title}</td>
                <td class="text-muted text-sm">${formatDate(event.date)}</td>
                <td class="text-muted text-sm">${event.location}</td>
                <td class="text-sm">${event.attendees} / ${event.capacity}</td>
                <td><span class="badge bg-${getStatusBadge(event.status)}">${event.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary" onclick="editEvent(${event.id})">✏️</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteEvent(${event.id})">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    createPagination();
}

function createPagination() {
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <button class="page-link" onclick="goToPage(${currentPage - 1})">← Previous</button>
    </li>`;

    for (let i = 1; i <= totalPages; i++) {
        html += `<li class="page-item ${i === currentPage ? 'active' : ''}">
            <button class="page-link" onclick="goToPage(${i})">${i}</button>
        </li>`;
    }

    html += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
        <button class="page-link" onclick="goToPage(${currentPage + 1})">Next →</button>
    </li>`;

    pagination.innerHTML = html;
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        loadEventsTable();
    }
}

function editEvent(eventId) {
    const event = adminEvents.find(e => e.id === eventId);
    if (event) {
        document.getElementById('editEventName').value = event.title;
        document.getElementById('editEventStatus').value = event.status;
        
        const modal = new bootstrap.Modal(document.getElementById('editEventModal'));
        modal.show();
        
        // Store event ID for save
        document.getElementById('editEventModal').dataset.eventId = eventId;
    }
}

function saveEventChanges() {
    const eventId = parseInt(document.getElementById('editEventModal').dataset.eventId);
    const event = adminEvents.find(e => e.id === eventId);
    
    if (event) {
        event.title = document.getElementById('editEventName').value;
        event.status = document.getElementById('editEventStatus').value;
        
        loadEventsTable();
        bootstrap.Modal.getInstance(document.getElementById('editEventModal')).hide();
        showAlert('Event updated successfully!', 'success');
    }
}

function deleteEvent(eventId) {
    if (confirm('Are you sure you want to delete this event?')) {
        const index = adminEvents.findIndex(e => e.id === eventId);
        if (index > -1) {
            adminEvents.splice(index, 1);
            filteredEvents = [...adminEvents];
            loadEventsTable();
            showAlert('Event deleted successfully!', 'success');
        }
    }
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container-fluid');
    container.insertBefore(alertDiv, container.firstChild);

    setTimeout(() => alertDiv.remove(), 3000);
}
