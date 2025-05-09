const loginModal = document.getElementById("loginModal");
const showCreateAccount = document.getElementById("showCreateAccount");
const showLoginForm = document.getElementById("showLoginForm");
const loginFormContainer = document.getElementById("loginFormContainer");
const signupFormContainer = document.getElementById("signupFormContainer");

// Open modal initially (assuming modal is triggered by some other button)
$('#loginModal').modal('show');

// Show "Create Account" form when the link is clicked
showCreateAccount.addEventListener("click", () => {
  loginFormContainer.classList.add("d-none");
  signupFormContainer.classList.remove("d-none");
});

// Show "Login" form when the link is clicked
showLoginForm.addEventListener("click", () => {
  signupFormContainer.classList.add("d-none");
  loginFormContainer.classList.remove("d-none");
});

// Store user data in localStorage
function storeUserData(email, name) {
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userName', name);
}

// Check if user is logged in and update UI
function checkLoginStatus() {
  const userIcon = document.querySelector('.fa-user');
  const userName = localStorage.getItem('userName');
  
  if (userName) {
    userIcon.parentElement.innerHTML = `
      <div class="d-flex align-items-center">
        <span class="me-2">Hi, ${userName}</span>
        <button class="btn btn-link text-dark p-0" onclick="logout()">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    `;
  }
}

// Logout function
function logout() {
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  location.reload();
}

// Basic form validation for login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail");
  const password = document.getElementById("loginPassword");

  if (!email.value || !password.value) {
    alert("Please fill in all fields.");
    return;
  } else if (password.value.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  // For demo purposes, we'll use the email as the name
  // In a real application, you would get the name from your backend
  const userName = email.value.split('@')[0];
  storeUserData(email.value, userName);
  
  // Close the modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
  modal.hide();
  
  // Update UI
  checkLoginStatus();
});

// Enhanced form validation for signup
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const fullName = document.getElementById("signupFullName");
  const email = document.getElementById("signupEmail");
  const password = document.getElementById("signupPassword");
  const confirmPassword = document.getElementById("signupConfirmPassword");
  const termsCheck = document.getElementById("termsCheck");

  if (!fullName.value || !email.value || !password.value || !confirmPassword.value) {
    alert("Please fill in all fields.");
    return;
  } else if (password.value.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  } else if (password.value !== confirmPassword.value) {
    alert("Passwords do not match.");
    return;
  } else if (!termsCheck.checked) {
    alert("You must agree to the Terms & Conditions.");
    return;
  }

  // Store user data
  storeUserData(email.value, fullName.value);
  
  // Close the modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
  modal.hide();
  
  // Update UI
  checkLoginStatus();
});

// Check login status when page loads
document.addEventListener('DOMContentLoaded', checkLoginStatus);


// Show/hide back to top button based on scroll position
window.addEventListener('scroll', function() {
  const btn = document.getElementById("backToTopBtn");
  if (window.scrollY > 300) {
    btn.classList.remove('hidden');
  } else {
    btn.classList.add('hidden');
  }
});

// Smooth scroll to top when button is clicked
function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Initialize button state on page load
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById("backToTopBtn");
  if (window.scrollY <= 300) {
    btn.classList.add('hidden');
  }
});
