// Sample Events Data
const eventsData = [
    {
        id: 1,
        title: "React Advanced Patterns",
        category: "workshop",
        date: "2024-03-20",
        time: "09:00 AM",
        location: "San Francisco, CA",
        description: "Deep dive into React patterns and best practices",
        attendees: 234,
        capacity: 500,
        image: "📚",
        featured: true
    },
    {
        id: 2,
        title: "Web Development Meetup",
        category: "meetup",
        date: "2024-03-22",
        time: "06:00 PM",
        location: "New York, NY",
        description: "Monthly meetup for web developers",
        attendees: 125,
        capacity: 300,
        image: "💻"
    },
    {
        id: 3,
        title: "TechConf 2024",
        category: "conference",
        date: "2024-04-10",
        time: "08:00 AM",
        location: "Austin, TX",
        description: "Annual tech conference with industry leaders",
        attendees: 1500,
        capacity: 2000,
        image: "🎤"
    },
    {
        id: 4,
        title: "AI & Machine Learning Webinar",
        category: "webinar",
        date: "2024-03-25",
        time: "02:00 PM",
        location: "Online",
        description: "Explore the latest trends in AI and ML",
        attendees: 856,
        capacity: 5000,
        image: "🤖"
    },
    {
        id: 5,
        title: "Startup Networking Event",
        category: "networking",
        date: "2024-03-28",
        time: "05:30 PM",
        location: "Los Angeles, CA",
        description: "Connect with founders and investors",
        attendees: 342,
        capacity: 400,
        image: "🚀"
    },
    {
        id: 6,
        title: "JavaScript Masterclass",
        category: "workshop",
        date: "2024-04-02",
        time: "10:00 AM",
        location: "Seattle, WA",
        description: "Master modern JavaScript techniques",
        attendees: 178,
        capacity: 250,
        image: "⚡"
    },
    {
        id: 7,
        title: "Design System Workshop",
        category: "workshop",
        date: "2024-04-05",
        time: "01:00 PM",
        location: "Denver, CO",
        description: "Building scalable design systems",
        attendees: 89,
        capacity: 150,
        image: "🎨"
    },
    {
        id: 8,
        title: "Web Security Summit",
        category: "conference",
        date: "2024-04-15",
        time: "09:00 AM",
        location: "Boston, MA",
        description: "Latest security practices and threats",
        attendees: 567,
        capacity: 800,
        image: "🔒"
    }
];

let currentPage = 1;
const eventsPerPage = 6;
let filteredEvents = [...eventsData];

document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('searchInput')?.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        filteredEvents = eventsData.filter(event => 
            event.title.toLowerCase().includes(query) ||
            event.location.toLowerCase().includes(query) ||
            event.description.toLowerCase().includes(query)
        );
        currentPage = 1;
        loadEvents();
    });

    document.getElementById('categoryFilter')?.addEventListener('change', function(e) {
        const category = e.target.value;
        filteredEvents = category ? 
            eventsData.filter(event => event.category === category) : 
            [...eventsData];
        currentPage = 1;
        loadEvents();
    });
}

function filterEvents(filterType) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch(filterType) {
        case 'upcoming':
            filteredEvents = eventsData.filter(event => new Date(event.date) >= today);
            break;
        case 'today':
            filteredEvents = eventsData.filter(event => new Date(event.date).toDateString() === today.toDateString());
            break;
        case 'week':
            const weekEnd = new Date(today);
            weekEnd.setDate(weekEnd.getDate() + 7);
            filteredEvents = eventsData.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= today && eventDate <= weekEnd;
            });
            break;
        default:
            filteredEvents = [...eventsData];
    }
    
    currentPage = 1;
    loadEvents();
}

function loadEvents() {
    const container = document.getElementById('eventsContainer');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredEvents.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        document.getElementById('pagination').innerHTML = '';
        return;
    }
    
    emptyState.style.display = 'none';
    
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);
    
    container.innerHTML = paginatedEvents.map(event => createEventCard(event)).join('');
    createPagination();
}

function createEventCard(event) {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
    });
    
    const attendancePercent = Math.round((event.attendees / event.capacity) * 100);
    const categoryBadgeColor = getCategoryColor(event.category);
    
    return `
        <div class="col-md-6 col-lg-4">
            <div class="card border-0 shadow h-100 d-flex flex-column">
                <div class="card-body flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <span class="badge bg-${categoryBadgeColor}">${event.category}</span>
                        ${event.featured ? '<span class="badge bg-accent">Featured</span>' : ''}
                    </div>
                    
                    <div class="display-1 mb-3">${event.image}</div>
                    
                    <h5 class="card-title fw-bold text-white">${event.title}</h5>
                    <p class="card-text text-muted text-sm mb-3">${event.description}</p>
                    
                    <div class="d-flex flex-column gap-2 mb-4 border-top border-secondary pt-3">
                        <div class="d-flex align-items-center gap-2">
                            <span class="text-primary">📅</span>
                            <span class="text-sm text-muted">${formattedDate} at ${event.time}</span>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="text-primary">📍</span>
                            <span class="text-sm text-muted">${event.location}</span>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="text-primary">👥</span>
                            <span class="text-sm text-muted">${event.attendees} of ${event.capacity} attending (${attendancePercent}%)</span>
                        </div>
                    </div>
                    
                    <div class="progress mb-3" style="height: 6px;">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: ${attendancePercent}%;" aria-valuenow="${attendancePercent}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                
                <div class="card-footer bg-secondary border-secondary">
                    <button class="btn btn-primary w-100" onclick="registerEvent(${event.id})">Register Now</button>
                </div>
            </div>
        </div>
    `;
}

function getCategoryColor(category) {
    const colors = {
        'conference': 'primary',
        'workshop': 'info',
        'meetup': 'success',
        'webinar': 'warning',
        'networking': 'danger'
    };
    return colors[category] || 'secondary';
}

function createPagination() {
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = '';
    
    // Previous button
    html += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <button class="page-link" onclick="goToPage(${currentPage - 1})">← Previous</button>
    </li>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `<li class="page-item ${i === currentPage ? 'active' : ''}">
                <button class="page-link" onclick="goToPage(${i})">${i}</button>
            </li>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    // Next button
    html += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
        <button class="page-link" onclick="goToPage(${currentPage + 1})">Next →</button>
    </li>`;
    
    pagination.innerHTML = html;
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        loadEvents();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function registerEvent(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (event) {
        alert(`✓ Successfully registered for "${event.title}"!\n\nA confirmation email has been sent to your inbox.`);
    }
}
