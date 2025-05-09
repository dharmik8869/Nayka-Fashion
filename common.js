// Function to update cart count in header
function updateCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            element.classList.add('badge', 'bg-danger', 'rounded-pill');
            // Remove any margin classes to ensure consistent styling
            element.classList.remove('ms-1');
        });
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Function to show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-times-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to body
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Standardized function to add product to cart
function addToCart(productId, productName, price, image) {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        // Redirect to login page
        showNotification('Please login to add items to cart', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // If only productId is provided, try to find the product in the current category's products array
        if (arguments.length === 1) {
            let product;
            
            // Check which product array is available based on the current page
            if (typeof westernwearProducts !== 'undefined') {
                product = westernwearProducts.find(p => p.id === parseInt(productId));
            } else if (typeof kidsProducts !== 'undefined') {
                product = kidsProducts.find(p => p.id === parseInt(productId));
            } else if (typeof products !== 'undefined') {
                product = products.find(p => p.id === parseInt(productId));
            }
            
            if (product) {
                productName = product.name;
                price = product.price;
                image = product.image;
            } else {
                console.error('Product not found');
                showNotification('Error: Product not found', 'error');
                return;
            }
        }
        
        const existingItem = cart.find(item => item.id === parseInt(productId));
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: parseInt(productId),
                name: productName,
                price: price,
                image: image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${productName} added to cart successfully!`);
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Error adding item to cart', 'error');
    }
}

// Function to show cart notification (for backward compatibility)
function showCartNotification(message) {
    showNotification(message, 'success');
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', () => {
    // Update cart count when page loads
    updateCartCount();
    
    // Add click handler for cart link
    const cartLinks = document.querySelectorAll('.cart-link');
    cartLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // If we're already on the cart page, prevent default
            if (window.location.pathname.includes('cart.html')) {
                e.preventDefault();
            }
        });
    });
}); 