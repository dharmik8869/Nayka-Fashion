// Product data
const products = [
    {
        id: 1,
        name: "Formal Shirt",
        price: 1999,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/f/6f76e2aLPSFMCLP914626_1.jpg?rnd=20200526195200&tr=w-512",
        category: "shirts",
        rating: 4.5
    },
    {
        id: 2,
        name: "Casual T-Shirt",
        price: 899,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/e/e/eed9d3cMPT02BBFT109RIFLEGREEN_1.jpg?rnd=20200526195200&tr=w-1080",
        category: "tshirts",
        rating: 4.2
    },
    {
        id: 3,
        name: "Designer Kurta",
        price: 2499,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/e/3/e3a256eSDMKT1444_1.jpg?rnd=20200526195200&tr=w-512",
        category: "ethnic",
        rating: 4.7
    },
    {
        id: 4,
        name: "Slim Fit Jeans",
        price: 2299,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/a/5/a5671cf7004768322_1.jpg?rnd=20200526195200&tr=w-512",
        category: "jeans",
        rating: 4.3
    },
    {
        id: 5,
        name: "Printed Shirt",
        price: 1599,
        discount: 35,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/7/3/73b5d0b256982_1.jpg?rnd=20200526195200&tr=w-512",
        category: "shirts",
        rating: 4.4
    },
    {
        id: 6,
        name: "Polo T-Shirt",
        price: 1299,
        discount: 10,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/7/175760e136682603_g0.jpg?rnd=20200526195200&tr=w-512",
        category: "tshirts",
        rating: 4.1
    },
    {
        id: 7,
        name: "Traditional Kurta Set",
        price: 3999,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/9/5/95a053eAP-SY-SKP-3028LYL-SPCCOWH_1.jpg?rnd=20200526195200&tr=w-1080",
        category: "ethnic",
        rating: 4.6
    },
    {
        id: 8,
        name: "Ripped Jeans",
        price: 2799,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/e/9/e951aa0WEA0117136936_1.jpg?rnd=20200526195200&tr=w-512",
        category: "jeans",
        rating: 4.8
    },
    {
        id: 9,
        name: "Striped Shirt",
        price: 1799,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/2/d/2d231deBUL-24BSFS-32_1.jpg?rnd=20200526195200&tr=w-512",
        category: "shirts",
        rating: 4.2
    },
    {
        id: 10,
        name: "Graphic T-Shirt",
        price: 999,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/b/dbdbc2bNK_BEWAK00036353_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tshirts",
        rating: 4.7
    }
];

// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Function to display product details
function displayProductDetails() {
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) {
        document.getElementById('productDetails').innerHTML = `
            <div class="col-12 text-center">
                <h2>Product not found</h2>
                <p>The requested product could not be found.</p>
                <a href="men-products.html" class="btn btn-primary">Back to Men's Products</a>
            </div>
        `;
        return;
    }

    const discountedPrice = product.price - (product.price * product.discount / 100);
    const productDetailsHTML = `
        <div class="col-md-6">
            <img src="${product.image}" alt="${product.name}" class="img-fluid rounded">
        </div>
        <div class="col-md-6">
            <h1 class="mb-3">${product.name}</h1>
            <div class="d-flex align-items-center mb-3">
                <div class="me-3">
                    <span class="text-muted text-decoration-line-through">₹${product.price.toFixed(2)}</span>
                    <span class="text-danger ms-2">${product.discount}% off</span>
                </div>
                <h3 class="mb-0">₹${discountedPrice.toFixed(2)}</h3>
            </div>
            <div class="mb-4">
                <div class="d-flex align-items-center">
                    <div class="rating">
                        ${Array(5).fill().map((_, i) => `
                            <i class="fas fa-star ${i < Math.floor(product.rating) ? 'text-warning' : 'text-muted'}"></i>
                        `).join('')}
                    </div>
                    <span class="ms-2">(${product.rating})</span>
                </div>
            </div>
            <div class="mb-4">
                <h5>Description</h5>
                <p>This is a stylish ${product.name} designed for men. Made with high-quality materials, this piece combines comfort and fashion perfectly.</p>
            </div>
            <div class="mb-4">
                <h5>Features</h5>
                <ul class="list-unstyled">
                    <li><i class="fas fa-check text-success me-2"></i>Premium quality fabric</li>
                    <li><i class="fas fa-check text-success me-2"></i>Comfortable fit</li>
                    <li><i class="fas fa-check text-success me-2"></i>Modern design</li>
                    <li><i class="fas fa-check text-success me-2"></i>Easy maintenance</li>
                </ul>
            </div>
            <div class="mb-4">
                <h5>Size</h5>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-dark">S</button>
                    <button type="button" class="btn btn-outline-dark">M</button>
                    <button type="button" class="btn btn-outline-dark">L</button>
                    <button type="button" class="btn btn-outline-dark">XL</button>
                    <button type="button" class="btn btn-outline-dark">XXL</button>
                </div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-primary btn-lg" onclick="addToCart('${product.id}')">Add to Cart</button>
                <button class="btn btn-outline-primary btn-lg" onclick="addToWishlist('${product.id}')">Add to Wishlist</button>
            </div>
        </div>
    `;

    document.getElementById('productDetails').innerHTML = productDetailsHTML;
}

// Function to add product to wishlist
function addToWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const product = products.find(p => p.id === parseInt(productId));
    
    if (product) {
        if (!wishlist.find(item => item.id === parseInt(productId))) {
            wishlist.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            });
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert('Product added to wishlist successfully!');
        } else {
            alert('Product already in wishlist!');
        }
    }
}

// Function to add product to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === parseInt(productId));
    
    if (product) {
        const existingItem = cart.find(item => item.id === parseInt(productId));
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${product.name} added to cart successfully!`);
    }
}

// Function to update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// Function to show notification message
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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayProductDetails();
    updateCartCount();
    checkLoginStatus();
});

// Function to check login status and show login/signup message if needed
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!isLoggedIn || !currentUser) {
        // Create login/signup message
        const loginMessage = document.createElement('div');
        loginMessage.className = 'login-message alert alert-info alert-dismissible fade show';
        loginMessage.setAttribute('role', 'alert');
        loginMessage.innerHTML = `
            <div class="d-flex align-items-center">
                <div>
                    <i class="fas fa-info-circle me-2"></i>
                    <strong>Login or Sign Up</strong> to get exclusive offers and discounts!
                </div>
                <div class="ms-auto">
                    <a href="login.html" class="btn btn-sm btn-outline-primary me-2">Login</a>
                    <a href="signup.html" class="btn btn-sm btn-primary">Sign Up</a>
                </div>
                <button type="button" class="btn-close ms-2" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        // Add to the top of the product details section
        const productDetails = document.getElementById('productDetails');
        if (productDetails) {
            productDetails.parentNode.insertBefore(loginMessage, productDetails);
        }
    }
} 