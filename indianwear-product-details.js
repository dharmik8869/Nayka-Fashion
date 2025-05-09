// Product data
const products = [
    {
        id: 1,
        name: "Floral Print Anarkali Kurta Set",
        price: 2499,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/4/a/4aefcefSJ-ANR-79_1.jpg?rnd=20200526195200&tr=w-512",
        category: "kurta",
        rating: 4.5
    },
    {
        id: 2,
        name: "Banarasi Silk Wedding Saree",
        price: 5999,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/8/68cb833C560-41_1.jpg?rnd=20200526195200&tr=w-1080",
        category: "saree",
        rating: 4.8
    },
    {
        id: 3,
        name: "Embroidered Bridal Lehenga",
        price: 8999,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/7/d7a36d9SILK004_1.jpg?rnd=20200526195200&tr=w-512",
        category: "lehenga",
        rating: 4.7
    },
    {
        id: 4,
        name: "Printed Ethnic Maxi Dress",
        price: 1799,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/0/50d2618Dress41_1.jpg?rnd=20200526195200&tr=w-512",
        category: "ethnic",
        rating: 4.3
    },
    {
        id: 5,
        name: "Cotton Palazzo Pants",
        price: 999,
        discount: 10,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/9/4/9461a5f166900_2.jpg?tr=w-512",
        category: "bottom",
        rating: 4.2
    },
    {
        id: 6,
        name: "Embroidered Straight Kurta",
        price: 1999,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/9/1963a22SAHIKA00016194_1.jpg?rnd=20200526195200&tr=w-512",
        category: "kurta",
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
    
    // Get Indianwear type description
    let typeDescription = '';
    switch(product.category) {
        case 'kurta':
            typeDescription = 'elegant kurta perfect for traditional occasions';
            break;
        case 'saree':
            typeDescription = 'beautiful saree with intricate designs';
            break;
        case 'lehenga':
            typeDescription = 'stunning lehenga for special occasions';
            break;
        case 'ethnic':
            typeDescription = 'stylish ethnic wear for festive occasions';
            break;
        case 'bottom':
            typeDescription = 'comfortable bottom wear to complete your ethnic look';
            break;
        default:
            typeDescription = 'beautiful Indian ethnic wear';
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
                <p>This is a ${typeDescription}. ${product.name} combines traditional elegance with modern style, making it perfect for various occasions. The outfit features exquisite craftsmanship and premium quality materials.</p>
            </div>
            <div class="mb-4">
                <h5>Features</h5>
                <ul class="list-unstyled">
                    <li><i class="fas fa-check text-success me-2"></i>Premium quality fabric</li>
                    <li><i class="fas fa-check text-success me-2"></i>Comfortable fit</li>
                    <li><i class="fas fa-check text-success me-2"></i>Intricate detailing</li>
                    <li><i class="fas fa-check text-success me-2"></i>Easy maintenance</li>
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
            <p>The requested Indianwear could not be found.</p>
            <a href="indianwear-products.html" class="btn btn-primary">Back to Indianwear</a>
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
    displayProductDetails();
    checkLoginStatus();
}); 