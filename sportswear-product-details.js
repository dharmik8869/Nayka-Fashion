// Sportswear product data
const products = [
    {
        id: 1,
        name: "Men's Dri-FIT Training T-Shirt",
        price: 1499,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/9/a/9a43974MV16-0101-SUNDT_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tshirts",
        rating: 4.5,
        description: "High-performance training t-shirt with Dri-FIT technology for maximum comfort during workouts."
    },
    {
        id: 2,
        name: "Women's Yoga Pants",
        price: 1999,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/1/61f1893MCAMAA00017477_4.jpg?tr=w-512",
        category: "yoga",
        rating: 4.7,
        description: "Comfortable and flexible yoga pants perfect for your yoga sessions."
    },
    {
        id: 3,
        name: "Men's Running Shorts",
        price: 899,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/0/60ec557AT98800XNavy_6.jpg?tr=w-512",
        category: "shorts",
        rating: 4.3,
        description: "Lightweight running shorts designed for optimal performance during your runs."
    },
    {
        id: 4,
        name: "Women's Sports Tank Top",
        price: 799,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/b/1b2c39cATP85901BLACK_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tshirts",
        rating: 4.4,
        description: "Breathable sports tank top ideal for high-intensity workouts."
    },
    {
        id: 5,
        name: "Men's Track Suit Set",
        price: 2999,
        discount: 10,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/e/8/e83f67dMZM-SS24-867868-GF_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tracksuits",
        rating: 4.8,
        description: "Complete track suit set for a stylish and comfortable athletic look."
    },
    {
        id: 6,
        name: "Women's Gym Leggings",
        price: 1299,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/8/d8b6203NF_BLIAD00000064_1.jpg?rnd=20200526195200&tr=w-512",
        category: "gym",
        rating: 4.6,
        description: "High-waisted gym leggings with compression fit for optimal performance."
    },
    {
        id: 7,
        name: "Men's Compression Shorts",
        price: 999,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/c/7/c7c977bFComp-2-Tshirt-White_1.jpg?rnd=20200526195200&tr=w-1080",
        category: "shorts",
        rating: 4.2,
        description: "Compression shorts for enhanced muscle support during workouts."
    },
    {
        id: 8,
        name: "Women's Yoga Set",
        price: 2499,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/c/4/c4ee9f0combo2-164-172-grey_1.jpg?rnd=20200526195200&tr=w-512",
        category: "yoga",
        rating: 4.9,
        description: "Complete yoga set including top and bottom for your yoga practice."
    },
    {
        id: 9,
        name: "Men's Gym Tank Top",
        price: 699,
        discount: 35,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/9/a/9a43974MV57-0101-WHITE_1.jpg?rnd=20200526195200&tr=w-512",
        category: "gym",
        rating: 4.3,
        description: "Lightweight gym tank top perfect for intense workout sessions."
    },
    {
        id: 10,
        name: "Women's Track Suit",
        price: 2799,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/8/d/8ddb233TLC241_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tracksuits",
        rating: 4.7,
        description: "Stylish and comfortable track suit for women."
    }
];

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
                <a href="sportswear-products.html" class="btn btn-primary">Back to Sportswear</a>
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
                <p>This is a high-performance ${product.name} designed for active lifestyles. Made with premium quality materials, this piece combines comfort and functionality perfectly.</p>
            </div>
            <div class="mb-4">
                <h5>Features</h5>
                <ul class="list-unstyled">
                    <li><i class="fas fa-check text-success me-2"></i>Moisture-wicking fabric</li>
                    <li><i class="fas fa-check text-success me-2"></i>Breathable design</li>
                    <li><i class="fas fa-check text-success me-2"></i>Comfortable fit</li>
                    <li><i class="fas fa-check text-success me-2"></i>Durable construction</li>
                </ul>
            </div>
            <div class="mb-4">
                <h5>Size</h5>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-dark">XS</button>
                    <button type="button" class="btn btn-outline-dark">S</button>
                    <button type="button" class="btn btn-outline-dark">M</button>
                    <button type="button" class="btn btn-outline-dark">L</button>
                    <button type="button" class="btn btn-outline-dark">XL</button>
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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayProductDetails();
    checkLoginStatus();
    updateCartCount();
}); 