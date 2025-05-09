// Product data
const products = [
    {
        id: 1,
        name: "Men's Classic White Sneakers",
        price: 1999,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/b/0/b092c0c40470302_1.jpg?rnd=20200526195200&tr=w-512",
        category: "sneakers",
        rating: 4.5
    },
    {
        id: 2,
        name: "Men's Black Leather Oxford Shoes",
        price: 3499,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/a/dad73e8CL-KI-M-7410BLACK_1.jpg?rnd=20200526195200&tr=w-512",
        category: "formal",
        rating: 4.7
    },
    {
        id: 3,
        name: "Men's Running Sports Shoes",
        price: 2799,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/2/4/24c82b0RSO4342_1.jpg?rnd=20200526195200&tr=w-512",
        category: "sports",
        rating: 4.6
    },
    {
        id: 4,
        name: "Men's Casual Loafers",
        price: 1799,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/8/5/85ea7c0TSHJKLG02BR_1.jpg?rnd=20200526195200&tr=w-512",
        category: "casual",
        rating: 4.3
    },
    {
        id: 5,
        name: "Men's Comfort Sandals",
        price: 999,
        discount: 10,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/a/1a97594C6053BLACK_1.jpg?rnd=20200526195200&tr=w-512",
        category: "sandals",
        rating: 4.2
    },
    {
        id: 6,
        name: "Men's High-Top Canvas Sneakers",
        price: 2299,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/a/1/a1aa112A11651CMultiColor_1.jpg?rnd=20200526195200&tr=w-512",
        category: "sneakers",
        rating: 4.4
    }
];

// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to display product details
function displayProductDetails(product) {
    const discountedPrice = product.price - (product.price * product.discount / 100);
    const productDetails = document.getElementById('productDetails');
    
    // Get footwear type description
    let typeDescription = '';
    switch(product.category) {
        case 'sneakers':
            typeDescription = 'stylish sneakers perfect for casual wear';
            break;
        case 'formal':
            typeDescription = 'elegant formal shoes for professional occasions';
            break;
        case 'sports':
            typeDescription = 'high-performance sports shoes for active lifestyle';
            break;
        case 'casual':
            typeDescription = 'comfortable casual shoes for everyday wear';
            break;
        case 'sandals':
            typeDescription = 'comfortable sandals for relaxed occasions';
            break;
        default:
            typeDescription = 'high-quality footwear';
    }
    
    productDetails.innerHTML = `
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
                <p>These are ${typeDescription}. ${product.name} combines style and comfort, making them perfect for various occasions. The footwear features durable construction and excellent craftsmanship.</p>
            </div>
            <div class="mb-4">
                <h5>Features</h5>
                <ul class="list-unstyled">
                    <li><i class="fas fa-check text-success me-2"></i>Premium quality materials</li>
                    <li><i class="fas fa-check text-success me-2"></i>Comfortable fit</li>
                    <li><i class="fas fa-check text-success me-2"></i>Durable construction</li>
                    <li><i class="fas fa-check text-success me-2"></i>Stylish design</li>
                </ul>
            </div>
            <div class="mb-4">
                <h5>Size</h5>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-dark">6</button>
                    <button type="button" class="btn btn-outline-dark">7</button>
                    <button type="button" class="btn btn-outline-dark">8</button>
                    <button type="button" class="btn btn-outline-dark">9</button>
                    <button type="button" class="btn btn-outline-dark">10</button>
                </div>
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-primary btn-lg" id="addToCartBtn">Add to Cart</button>
                <button class="btn btn-outline-primary btn-lg" id="addToWishlistBtn">Add to Wishlist</button>
            </div>
        </div>
    `;

    // Add event listeners after the elements are created
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        addToCart(product.id);
    });

    document.getElementById('addToWishlistBtn').addEventListener('click', () => {
        // Add to wishlist functionality
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!wishlist.includes(product.id)) {
            wishlist.push(product.id);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            showNotification(`${product.name} added to wishlist!`);
        } else {
            showNotification('Product is already in your wishlist', 'error');
        }
    });
}

// Get product ID from URL
const productId = parseInt(getUrlParameter('id'));

// Find the product in the products array
const product = products.find(p => p.id === productId);

// Display product details if found
if (product) {
    displayProductDetails(product);
} else {
    document.getElementById('productDetails').innerHTML = `
        <div class="col-12 text-center">
            <h2>Product not found</h2>
            <p>The requested footwear could not be found.</p>
            <a href="footwear-products.html" class="btn btn-primary">Back to Footwear</a>
        </div>
    `;
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
    displayProductDetails(product);
    checkLoginStatus();
}); 