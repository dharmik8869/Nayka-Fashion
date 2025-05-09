// Product data
const products = [
    {
        id: 1,
        name: "Fossil Gen 6 Smartwatch",
        price: 24995,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/b/0/b07ca59FTW6079_3.jpg?rnd=20200526195200&tr=w-1080",
        category: "smart",
        rating: 4.5
    },
    {
        id: 2,
        name: "Titan Analog Black Dial",
        price: 3995,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/f/8/f8ea7e01825KM02_1.jpg?rnd=20200526195200&tr=w-512",
        category: "analog",
        rating: 4.3
    },
    {
        id: 3,
        name: "Casio G-Shock Digital",
        price: 8995,
        discount: 10,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/c/a/casio-g732_1_ae107bd2.jpg?rnd=20200526195200&tr=w-512",
        category: "digital",
        rating: 4.6
    },
    {
        id: 4,
        name: "Michael Kors Analog Gold",
        price: 19995,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/b/7/b7569ceBQ3377_1.jpg?rnd=20200526195200&tr=w-1080",
        category: "luxury",
        rating: 4.7
    },
    {
        id: 5,
        name: "Samsung Galaxy Watch 5",
        price: 27999,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/8/1/818dc08100-07_1.jpg?rnd=20200526195200&tr=w-512",
        category: "smart",
        rating: 4.4
    },
    {
        id: 6,
        name: "Timex Classic Analog",
        price: 2499,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/t/i/ti000r41400_1.jpg?rnd=20200526195200&tr=w-512",
        category: "analog",
        rating: 4.2
    },
    {
        id: 7,
        name: "Apple Watch Series 8",
        price: 41999,
        discount: 10,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU-_5LuEI5ha_WMSIa870ioOGEg2MskzC6KQ&s",
        category: "smart",
        rating: 4.8
    },
    {
        id: 8,
        name: "Citizen Eco-Drive",
        price: 15995,
        discount: 18,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/0/5/052f715CA4554-84L_1.jpg?rnd=20200526195200&tr=w-512",
        category: "luxury",
        rating: 4.5
    },
    {
        id: 9,
        name: "Fastrack Digital Sports",
        price: 3495,
        discount: 25,
        image: "https://rukminim3.flixcart.com/image/850/1000/xif0q/watch/y/o/a/-original-imagqfu29g4bpkun.jpeg?q=20&crop=false",
        category: "digital",
        rating: 4.1
    },
    {
        id: 10,
        name: "Seiko Presage Automatic",
        price: 35999,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/c/b/cb79713KP_SEIKO00000102_1.jpg?rnd=20200526195200&tr=w-512",
        category: "luxury",
        rating: 4.9
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
    
    // Get watch type description
    let typeDescription = '';
    switch(product.category) {
        case 'analog':
            typeDescription = 'classic analog watch with precise timekeeping';
            break;
        case 'digital':
            typeDescription = 'modern digital watch with advanced features';
            break;
        case 'smart':
            typeDescription = 'smartwatch with cutting-edge technology';
            break;
        case 'luxury':
            typeDescription = 'luxury timepiece with premium craftsmanship';
            break;
        default:
            typeDescription = 'high-quality watch';
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
                <p>This is a ${typeDescription}. ${product.name} combines style and functionality, making it the perfect accessory for any occasion. The watch features a durable construction and reliable performance.</p>
            </div>
            <div class="mb-4">
                <h5>Features</h5>
                <ul class="list-unstyled">
                    <li><i class="fas fa-check text-success me-2"></i>Water resistant</li>
                    <li><i class="fas fa-check text-success me-2"></i>Long-lasting battery</li>
                    <li><i class="fas fa-check text-success me-2"></i>Premium materials</li>
                    <li><i class="fas fa-check text-success me-2"></i>Comfortable fit</li>
                </ul>
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
            <p>The requested watch could not be found.</p>
            <a href="watch-products.html" class="btn btn-primary">Back to Watches</a>
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