// Chart configuration
const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: '#a8adb5',
                font: {
                    size: 12,
                    weight: '600'
                }
            }
        }
    },
    scales: {
        y: {
            ticks: { color: '#a8adb5' },
            grid: { color: '#404040' },
            beginAtZero: true
        },
        x: {
            ticks: { color: '#a8adb5' },
            grid: { color: '#404040' }
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initCharts();
});

function initCharts() {
    // Registrations Over Time
    const registrationsCtx = document.getElementById('registrationsChart');
    if (registrationsCtx) {
        new Chart(registrationsCtx, {
            type: 'line',
            data: {
                labels: ['Mar 1', 'Mar 8', 'Mar 15', 'Mar 22', 'Mar 29', 'Apr 5'],
                datasets: [{
                    label: 'Registrations',
                    data: [120, 190, 250, 380, 420, 540],
                    borderColor: '#6C5CE7',
                    backgroundColor: 'rgba(108, 92, 231, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 6,
                    pointBackgroundColor: '#6C5CE7',
                    pointBorderColor: '#2d2d2d',
                    pointBorderWidth: 2
                }]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    filler: {
                        propagate: true
                    }
                }
            }
        });
    }

    // Event Distribution
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Conference', 'Workshop', 'Meetup', 'Webinar', 'Networking'],
                datasets: [{
                    data: [1250, 645, 456, 856, 335],
                    backgroundColor: [
                        '#6C5CE7',
                        '#FF9F43',
                        '#22c55e',
                        '#3b82f6',
                        '#ef4444'
                    ],
                    borderColor: '#2d2d2d',
                    borderWidth: 2
                }]
            },
            options: {
                ...chartDefaults,
                plugins: {
                    ...chartDefaults.plugins,
                    legend: {
                        ...chartDefaults.plugins.legend,
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Attendance Rate
    const attendanceCtx = document.getElementById('attendanceChart');
    if (attendanceCtx) {
        new Chart(attendanceCtx, {
            type: 'bar',
            data: {
                labels: ['TechConf', 'React WS', 'AI Webinar', 'Dev Meetup', 'Networking'],
                datasets: [{
                    label: 'Attendance Rate %',
                    data: [92, 85, 78, 88, 81],
                    backgroundColor: [
                        '#6C5CE7',
                        '#FF9F43',
                        '#22c55e',
                        '#3b82f6',
                        '#ef4444'
                    ],
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                ...chartDefaults,
                scales: {
                    ...chartDefaults.scales,
                    y: {
                        ...chartDefaults.scales.y,
                        max: 100,
                        ticks: {
                            ...chartDefaults.scales.y.ticks,
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}
