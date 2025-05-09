document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'nykaa.html';
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // In a real application, this would be an API call to your backend
            // For demo purposes, we'll use localStorage to simulate authentication
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Store user session
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify({
                    email: user.email,
                    name: user.name
                }));
                
                // Redirect to home page
                window.location.href = 'nykaa.html';
            } else {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Invalid email or password';
            }
        } catch (error) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'An error occurred. Please try again.';
        }
    });
}); 