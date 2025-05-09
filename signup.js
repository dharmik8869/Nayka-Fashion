document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const errorMessage = document.getElementById('errorMessage');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Passwords do not match';
            return;
        }

        try {
            // Get existing users or initialize empty array
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if email already exists
            if (users.some(user => user.email === email)) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Email already registered';
                return;
            }

            // Add new user
            users.push({
                name,
                email,
                password // In a real app, this should be hashed
            });

            // Save updated users array
            localStorage.setItem('users', JSON.stringify(users));

            // Auto login after signup
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify({
                email,
                name
            }));

            // Redirect to home page
            window.location.href = 'nykaa.html';
        } catch (error) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'An error occurred. Please try again.';
        }
    });
}); 