// Kids product data
const kidsProducts = [
    {
        id: 1,
        name: "Floral Print Girls Dress",
        price: 999,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/2/2/224dba6MMKS02NAVYRS_1.jpg?rnd=20200526195200&tr=w-512",
        category: "dresses",
        rating: 4.5,
        description: "Adorable floral print dress perfect for little girls. Made with soft, comfortable fabric and featuring a beautiful floral pattern. Ideal for parties and special occasions."
    },
    {
        id: 2,
        name: "Cartoon Print T-Shirt",
        price: 499,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/3/d/3daa529Ani-BUIPA-210581201_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tshirts",
        rating: 4.3,
        description: "Fun cartoon print t-shirt that kids will love. Made with soft cotton material and featuring their favorite cartoon characters. Perfect for everyday wear."
    },
    {
        id: 3,
        name: "Boys Casual Set",
        price: 1299,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/9/d/9dffa66809525_1.jpg?rnd=20200526195200&tr=w-512",
        category: "sets",
        rating: 4.7,
        description: "Stylish casual set for boys, including a comfortable t-shirt and matching shorts. Made with breathable fabric for all-day comfort."
    },
    {
        id: 4,
        name: "Girls Lehenga Choli Set",
        price: 1999,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/2/6/268a562T-PINKBUTNETLEH-1.jpg?rnd=20200526195200&tr=w-512",
        category: "ethnic",
        rating: 4.8,
        description: "Beautiful lehenga choli set for little girls, perfect for festivals and special occasions. Features intricate embroidery and comfortable fabric."
    },
    {
        id: 5,
        name: "Boys Denim Shorts",
        price: 699,
        discount: 10,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/3/d3285edSS25BJS926-BlackMidWashBlue_1.jpg?rnd=20200526195200&tr=w-512",
        category: "casual",
        rating: 4.2,
        description: "Comfortable denim shorts for boys, perfect for summer days. Made with soft denim material and featuring a relaxed fit."
    },
    {
        id: 6,
        name: "Girls Party Dress",
        price: 1599,
        discount: 35,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/0/6/06d7230FRRN750BEIGE_3.jpg?tr=w-512",
        category: "dresses",
        rating: 4.6,
        description: "Elegant party dress for little girls, featuring beautiful detailing and comfortable fabric. Perfect for birthday parties and special events."
    },
    {
        id: 7,
        name: "Kids Summer T-Shirt Pack",
        price: 899,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/f/2/f228a66LP20221488_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tshirts",
        rating: 4.4,
        description: "Set of comfortable summer t-shirts for kids, perfect for everyday wear. Made with soft, breathable fabric."
    },
    {
        id: 8,
        name: "Traditional Boys Kurta Set",
        price: 1499,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/8/18bb547KK-0372-5143-KC101_2.jpg?tr=w-512",
        category: "ethnic",
        rating: 4.7,
        description: "Traditional kurta set for boys, perfect for festivals and special occasions. Features elegant embroidery and comfortable fabric."
    },
    {
        id: 9,
        name: "Girls Casual Dress Set",
        price: 1199,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/7/f/7fc6f19ZMIARC00003106_1.jpg?rnd=20200526195200&tr=w-512",
        category: "sets",
        rating: 4.5,
        description: "Casual dress set for girls, perfect for everyday wear. Made with soft, comfortable fabric and featuring a cute design."
    },
    {
        id: 10,
        name: "Kids Track Pants",
        price: 799,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/8/3/83ed598S5240652172_1.jpg?rnd=20200526195200&tr=w-512",
        category: "casual",
        rating: 4.3,
        description: "Comfortable track pants for kids, perfect for outdoor activities and sports. Made with stretchable fabric for ease of movement."
    }
];

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Function to display product details
function displayProductDetails() {
    const product = kidsProducts.find(p => p.id === parseInt(productId));
    if (!product) {
        document.getElementById('productDetails').innerHTML = `
            <div class="col-12 text-center">
                <h2>Product not found</h2>
                <p>The requested product could not be found.</p>
                <a href="kids-products.html" class="btn btn-primary">Back to Kids</a>
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
                <p>This is a cute and comfortable ${product.name} designed for kids. Made with soft, high-quality materials, this piece combines style and comfort perfectly for your little ones.</p>
            </div>
            <div class="mb-4">
                <h5>Features</h5>
                <ul class="list-unstyled">
                    <li><i class="fas fa-check text-success me-2"></i>Soft, child-friendly fabric</li>
                    <li><i class="fas fa-check text-success me-2"></i>Comfortable fit</li>
                    <li><i class="fas fa-check text-success me-2"></i>Fun design</li>
                    <li><i class="fas fa-check text-success me-2"></i>Easy to wash</li>
                </ul>
            </div>
            <div class="mb-4">
                <h5>Size</h5>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-dark">2-3Y</button>
                    <button type="button" class="btn btn-outline-dark">3-4Y</button>
                    <button type="button" class="btn btn-outline-dark">4-5Y</button>
                    <button type="button" class="btn btn-outline-dark">5-6Y</button>
                    <button type="button" class="btn btn-outline-dark">6-7Y</button>
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
    const product = kidsProducts.find(p => p.id === parseInt(productId));
    
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