document.addEventListener('DOMContentLoaded', () => {
    const userMenuContent = document.getElementById('userMenuContent');
    const accountLink = document.getElementById('accountLink');
    
    // Check authentication status
    function checkAuth() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        
        if (isLoggedIn && currentUser) {
            // User is logged in
            if (userMenuContent) {
                userMenuContent.innerHTML = `
                    <span class="user-name">Hi, ${currentUser.name}</span>
                    <a href="#" class="btn" id="logoutBtn">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                `;
                
                // Add logout handler with confirmation
                document.getElementById('logoutBtn').addEventListener('click', (e) => {
                    e.preventDefault();
                    if (confirm('Are you sure you want to logout?')) {
                        // Show success message
                        const toast = document.createElement('div');
                        toast.className = 'toast position-fixed top-0 end-0 m-3';
                        toast.setAttribute('role', 'alert');
                        toast.setAttribute('aria-live', 'assertive');
                        toast.setAttribute('aria-atomic', 'true');
                        toast.innerHTML = `
                            <div class="toast-header">
                                <strong class="me-auto">Success</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                You have been successfully logged out!
                            </div>
                        `;
                        document.body.appendChild(toast);
                        
                        // Initialize and show the toast
                        const bsToast = new bootstrap.Toast(toast);
                        bsToast.show();
                        
                        // Remove toast after it's hidden
                        toast.addEventListener('hidden.bs.toast', () => {
                            toast.remove();
                        });
                        
                        // Clear user data and redirect
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('currentUser');
                        setTimeout(() => {
                            window.location.href = 'nykaa.html';
                        }, 1500);
                    }
                });
            }
            
            // Update account link if it exists
            if (accountLink) {
                accountLink.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
                accountLink.href = '#';
                accountLink.onclick = (e) => {
                    e.preventDefault();
                    // Show user menu or profile page
                };
            }
        } else {
            // User is not logged in
            if (userMenuContent) {
                userMenuContent.innerHTML = `
                    <a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#loginModal">
                        <i class="fas fa-sign-in-alt"></i> Login
                    </a>
                    <a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#signupModal">
                        <i class="fas fa-user-plus"></i> Sign Up
                    </a>
                `;
            }
            
            // Update account link if it exists
            if (accountLink) {
                accountLink.innerHTML = '<i class="fas fa-user"></i> Account';
                accountLink.href = '#';
                accountLink.onclick = (e) => {
                    e.preventDefault();
                    // Show login modal
                    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                    loginModal.show();
                };
            }
        }
    }
    
    // Check auth status on page load
    checkAuth();
    
    // Listen for login/signup events
    window.addEventListener('userLoggedIn', () => {
        checkAuth();
    });
    
    window.addEventListener('userSignedUp', () => {
        checkAuth();
    });

    // Protect routes that require authentication
    const protectedRoutes = ['cart.html', 'checkout.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedRoutes.includes(currentPage)) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            window.location.href = 'login.html';
        }
    }
}); 