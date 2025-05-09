// Westernwear product data
const westernwearProducts = [
    {
        id: 1,
        name: "Floral Maxi Dress",
        price: 2499,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/9/195304c7011831603_1.jpg?rnd=20200526195200&tr=w-512",
        category: "dresses",
        rating: 4.5,
        description: "Embrace effortless elegance with this flowing floral maxi dress, featuring a vibrant print and flattering silhouette. Perfect for daytime outings or romantic evenings."
    },
    {
        id: 2,
        name: "Ruffle Crop Top",
        price: 999,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/8/1/81d23410723FHAATOP33_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tops",
        rating: 4.3,
        description: "Trendy crop top that pairs well with high-waisted jeans or skirts. Made from soft, breathable fabric."
    },
    {
        id: 3,
        name: "Floral Jumpsuit",
        price: 2999,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/5/558a8e3WCGBECOMWJPS5917CMULTIMultiColor_2.jpg?tr=w-512",
        category: "jumpsuits",
        rating: 4.7,
        description: "Step into style with this chic floral jumpsuit, designed with a flattering fit and playful print. Perfect for brunch dates, vacations, or sunny days out."
    },
    {
        id: 4,
        name: "Pleated Midi Skirt",
        price: 1799,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/2/2/2259303EB-102-Rose-Gold_4.jpg?tr=w-512",
        category: "skirts",
        rating: 4.3,
        description: "Add timeless charm to your wardrobe with this elegant pleated midi skirt, featuring graceful movement and a flattering fit. Ideal for both casual days and dressed-up evenings."
    },
    {
        id: 5,
        name: "High-Waist Jeans",
        price: 2299,
        discount: 35,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/0/607486dAPSS24DEN1291158_1.jpg?rnd=20200526195200&tr=w-512",
        category: "jeans",
        rating: 4.4,
        description: "Flatter your figure with these classic high-waist jeans, offering a sleek silhouette and all-day comfort. Perfect for pairing with everything from casual tees to dressy blouses."
    },
    {
        id: 6,
        name: "Puff Sleeve Top",
        price: 1299,
        discount: 10,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/5/55feffcKSLTOPS1600_0.jpg?rnd=20200526195200&tr=w-512",
        category: "tops",
        rating: 4.1,
        description: "Elevate your look with this elegant puff sleeve top, featuring a delicate design and comfortable fit. Perfect for both formal and casual occasions."
    },
    {
        id: 7,
        name: "Wrap Dress",
        price: 3499,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/c/f/cf39fd2DR012207_1.jpg?rnd=20200526195200&tr=w-512",
        category: "dresses",
        rating: 4.6,
        description: "This wrap dress is a versatile piece that can be dressed up or down, making it perfect for both formal and casual occasions. The wrap design adds a touch of elegance and comfort, while the adjustable straps ensure a secure fit."
    },
    {
        id: 8,
        name: "Denim Jumpsuit",
        price: 2799,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/6/567f4fcD3512861A-Blue_1.jpg?rnd=20200526195200&tr=w-512",
        category: "jumpsuits",
        rating: 4.8,
        description: "This denim jumpsuit is a stylish and versatile piece that can be dressed up or down, making it perfect for both formal and casual occasions. The denim material adds a touch of elegance and comfort, while the adjustable straps ensure a secure fit."
    },
    {
        id: 9,
        name: "A-Line Skirt",
        price: 1599,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/3/53aab93S25FSW47_1.jpg?rnd=20200526195200&tr=w-720",
        category: "skirts",
        rating: 4.2,
        description: "This A-line skirt is a stylish and versatile piece that can be dressed up or down, making it perfect for both formal and casual occasions. The A-line design adds a touch of elegance and comfort, while the adjustable straps ensure a secure fit."
    },
    {
        id: 10,
        name: "Ripped Skinny Jeans",
        price: 1999,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/2/e/2efa154WES0433696893_1.jpg?rnd=20200526195200&tr=w-512",
        category: "jeans",
        rating: 4.7,
        description: "This ripped skinny jeans is a stylish and versatile piece that can be dressed up or down, making it perfect for both formal and casual occasions. The ripped design adds a touch of elegance and comfort, while the adjustable straps ensure a secure fit."
    }
];

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Function to display product details
function displayProductDetails() {
    const product = westernwearProducts.find(p => p.id === parseInt(productId));
    if (!product) {
        document.getElementById('productDetails').innerHTML = `
            <div class="col-12 text-center">
                <h2>Product not found</h2>
                <p>The requested product could not be found.</p>
                <a href="westernwear-products.html" class="btn btn-primary">Back to Westernwear</a>
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
                <p>This is a stylish ${product.name} in western style. Made with high-quality materials, this piece combines modern fashion with comfort.</p>
            </div>
            <div class="mb-4">
                <h5>Features</h5>
                <ul class="list-unstyled">
                    <li><i class="fas fa-check text-success me-2"></i>Premium quality fabric</li>
                    <li><i class="fas fa-check text-success me-2"></i>Comfortable fit</li>
                    <li><i class="fas fa-check text-success me-2"></i>Contemporary design</li>
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
    const product = westernwearProducts.find(p => p.id === parseInt(productId));
    
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