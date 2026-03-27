// Auth Check
 //document.addEventListener('DOMContentLoaded', function() {
//    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
 //   if (!isLoggedIn) {
 //       window.location.href = '/login.html';
 //   }
    
//    const userEmail = sessionStorage.getItem('userEmail');
 //   if (userEmail) {
 //       console.log('[v0] User logged in as:', userEmail);
 //   }
//});

// Navigation
function navigateTo(page) {
    const pages = {
        'dashboard': '/admin/dashboard.html',
        'manage-events': '/admin/manage-events.html',
        'attendees': '/admin/attendees.html',
        'analytics': '/admin/analytics.html',
        'settings': '/admin/settings.html'
    };
    
    if (pages[page]) {
        window.location.href = pages[page];
    }
}

// Logout
//function logout() {
//    if (confirm('Are you sure you want to logout?')) {
 //       sessionStorage.removeItem('isLoggedIn');
  //      sessionStorage.removeItem('userEmail');
//        window.location.href = '/login.html';
//    }
//}

// Sample events data for admin
const adminEvents = [
    {
        id: 1,
        title: "React Advanced Patterns",
        date: "2024-03-20",
        location: "San Francisco, CA",
        attendees: 234,
        capacity: 500,
        status: "completed"
    },
    {
        id: 2,
        title: "TechConf 2024",
        date: "2024-04-10",
        location: "Austin, TX",
        attendees: 1250,
        capacity: 2000,
        status: "upcoming"
    },
    {
        id: 3,
        title: "Web Development Meetup",
        date: "2024-03-22",
        location: "New York, NY",
        attendees: 125,
        capacity: 300,
        status: "completed"
    },
    {
        id: 4,
        title: "AI & Machine Learning Webinar",
        date: "2024-03-25",
        location: "Online",
        attendees: 856,
        capacity: 5000,
        status: "in-progress"
    },
    {
        id: 5,
        title: "JavaScript Masterclass",
        date: "2024-04-02",
        location: "Seattle, WA",
        attendees: 178,
        capacity: 250,
        status: "upcoming"
    }
];

// Format date helper
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Get status badge
function getStatusBadge(status) {
    const badges = {
        'completed': 'success',
        'upcoming': 'primary',
        'in-progress': 'warning',
        'cancelled': 'danger'
    };
    return badges[status] || 'secondary';
}
