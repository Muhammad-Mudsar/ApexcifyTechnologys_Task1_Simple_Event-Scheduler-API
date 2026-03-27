document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        // Demo credentials validation
        const demoEmail = 'admin@example.com';
        const demoPassword = 'demo123';

        // Validation
        if (!email || !password) {
            showAlert('Please fill in all fields', 'danger');
            return;
        }

        if (email === demoEmail && password === demoPassword) {
            // Save credentials if remember checked
            if (remember) {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('userEmail');
                localStorage.removeItem('rememberMe');
            }

            // Set session
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userEmail', email);

            showAlert('✓ Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'admin/dashboard.html';
            }, 1500);
        } else {
            showAlert('Invalid email or password', 'danger');
        }
    });

    // Check if user was remembered
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('remember').checked = true;
    }
});

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-4`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(alertDiv, form.nextSibling);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}
