// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        // Redirect to login page
        window.location.href = 'login.html';
        return;
    }
    
    // Initialize cart functionality
    displayCartItems();
    updateCartCount();
});

// Function to format price with Indian Rupee symbol
function formatPrice(price) {
    return '₹' + price.toFixed(2);
}

// Function to display cart items
function displayCartItems() {
    try {
        const cartItemsContainer = document.getElementById('cartItems');
        const emptyCartMessage = document.getElementById('emptyCartMessage');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (!cartItemsContainer || !emptyCartMessage) {
            console.error('Required cart elements not found');
            return;
        }
        
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartItemsContainer.innerHTML = '';
            return;
        }
        
        emptyCartMessage.style.display = 'none';
        
        let cartItemsHTML = '';
        
        cart.forEach(item => {
            cartItemsHTML += `
                <div class="card mb-3 cart-item" data-id="${item.id}">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-2">
                                <img src="${item.image}" alt="${item.name}" class="img-fluid rounded" onerror="handleImageError(this)">
                            </div>
                            <div class="col-md-4">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="text-muted mb-0">Price: ${formatPrice(item.price)}</p>
                                <div class="mt-2">
                                    <div class="form-check">
                                        <input class="form-check-input gift-wrap-checkbox" type="checkbox" 
                                            id="giftWrap${item.id}" ${item.giftWrapped ? 'checked' : ''} 
                                            onchange="toggleGiftWrapping(${item.id})">
                                        <label class="form-check-label" for="giftWrap${item.id}">
                                            Gift Wrap (₹50)
                                        </label>
                                    </div>
                                    ${item.giftWrapped ? `
                                        <div class="mt-2">
                                            <textarea class="form-control gift-message" 
                                                placeholder="Add a gift message (optional)" 
                                                onchange="addGiftMessage(${item.id}, this.value)">${item.giftMessage || ''}</textarea>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="quantity-selector d-flex align-items-center">
                                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                    <span class="mx-2">${item.quantity}</span>
                                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <p class="mb-0"><strong>${formatPrice(item.price * item.quantity)}</strong></p>
                            </div>
                            <div class="col-md-1">
                                <div class="btn-group">
                                    <button class="btn btn-sm btn-outline-primary" onclick="saveForLater(${item.id})" title="Save for Later">
                                        <i class="fas fa-bookmark"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})" title="Remove">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = cartItemsHTML;
        updateOrderSummary();
    } catch (error) {
        console.error('Error displaying cart items:', error);
    }
}

// Function to update quantity
function updateQuantity(productId, newQuantity) {
    try {
        if (newQuantity < 1) return;
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === parseInt(productId));
        
        if (itemIndex !== -1) {
            cart[itemIndex].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            updateCartCount();
            
            // Show notification
            if (window.showCartNotification) {
                window.showCartNotification('Cart updated successfully!');
            }
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
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

// Function to add item to cart
function addToCart(productId, productName, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${productName} added to cart successfully!`);
}

// Function to remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemToRemove = cart.find(item => item.id === parseInt(productId));
    
    if (itemToRemove) {
        cart = cart.filter(item => item.id !== parseInt(productId));
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${itemToRemove.name} removed from cart`, 'error');
        displayCartItems();
    }
}

// Function to update order summary
function updateOrderSummary() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const giftWrappingCost = cart.reduce((sum, item) => sum + (item.giftWrapped ? 50 : 0), 0);
        
        // Calculate shipping (free for orders above ₹999, otherwise ₹99)
        const shipping = subtotal > 999 ? 0 : 99;
        
        // Calculate discount (10% off for orders above ₹1999)
        const discount = subtotal > 1999 ? subtotal * 0.1 : 0;
        
        // Calculate total
        const total = subtotal + shipping - discount + giftWrappingCost;
        
        // Update summary elements
        const elements = {
            subtotal: document.getElementById('subtotal'),
            shipping: document.getElementById('shipping'),
            discount: document.getElementById('discount'),
            giftWrapping: document.getElementById('giftWrapping'),
            total: document.getElementById('total'),
            checkoutBtn: document.getElementById('checkoutBtn')
        };
        
        if (elements.subtotal) elements.subtotal.textContent = formatPrice(subtotal);
        if (elements.shipping) elements.shipping.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
        if (elements.discount) elements.discount.textContent = discount === 0 ? '-₹0.00' : `-${formatPrice(discount)}`;
        if (elements.giftWrapping) elements.giftWrapping.textContent = formatPrice(giftWrappingCost);
        if (elements.total) elements.total.textContent = formatPrice(total);
        if (elements.checkoutBtn) elements.checkoutBtn.disabled = cart.length === 0;
    } catch (error) {
        console.error('Error updating order summary:', error);
    }
}

// Function to handle checkout
function checkout() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }
        
        // Redirect to checkout page
        window.location.href = 'checkout.html';
    } catch (error) {
        console.error('Error during checkout:', error);
        showNotification('An error occurred during checkout', 'error');
    }
}

// Function to save item for later
function saveForLater(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    
    const itemToSave = cart.find(item => item.id === parseInt(productId));
    
    if (itemToSave) {
        // Remove from cart
        cart = cart.filter(item => item.id !== parseInt(productId));
        // Add to saved items
        savedItems.push(itemToSave);
        
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
        
        updateCartCount();
        displayCartItems();
        displaySavedItems();
        showNotification(`${itemToSave.name} saved for later`, 'success');
    }
}

// Function to move saved item back to cart
function moveToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    
    const itemToMove = savedItems.find(item => item.id === parseInt(productId));
    
    if (itemToMove) {
        // Remove from saved items
        savedItems = savedItems.filter(item => item.id !== parseInt(productId));
        // Add to cart
        cart.push(itemToMove);
        
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
        
        updateCartCount();
        displayCartItems();
        displaySavedItems();
        showNotification(`${itemToMove.name} moved to cart`, 'success');
    }
}

// Function to display saved items
function displaySavedItems() {
    const savedItemsContainer = document.getElementById('savedItems');
    const emptySavedMessage = document.getElementById('emptySavedMessage');
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    
    if (!savedItemsContainer || !emptySavedMessage) return;
    
    if (savedItems.length === 0) {
        emptySavedMessage.style.display = 'block';
        savedItemsContainer.innerHTML = '';
        return;
    }
    
    emptySavedMessage.style.display = 'none';
    
    let savedItemsHTML = '';
    
    savedItems.forEach(item => {
        savedItemsHTML += `
            <div class="card mb-3 saved-item" data-id="${item.id}">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-2">
                            <img src="${item.image}" alt="${item.name}" class="img-fluid rounded" onerror="handleImageError(this)">
                        </div>
                        <div class="col-md-4">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="text-muted mb-0">Price: ${formatPrice(item.price)}</p>
                        </div>
                        <div class="col-md-3">
                            <span class="badge bg-info">Saved for Later</span>
                        </div>
                        <div class="col-md-2">
                            <p class="mb-0"><strong>${formatPrice(item.price * item.quantity)}</strong></p>
                        </div>
                        <div class="col-md-1">
                            <button class="btn btn-sm btn-outline-primary" onclick="moveToCart(${item.id})">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    savedItemsContainer.innerHTML = savedItemsHTML;
}

// Function to update wishlist count in header
function updateWishlistCount() {
    try {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const wishlistCountElements = document.querySelectorAll('.wishlist-count');
        
        wishlistCountElements.forEach(element => {
            if (wishlist.length > 0) {
                element.textContent = wishlist.length;
                element.style.display = 'inline-block';
            } else {
                element.style.display = 'none';
            }
        });
    } catch (error) {
        console.error('Error updating wishlist count:', error);
    }
}

// Function to show wishlist notification
function showWishlistNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-heart' : 'fa-times-circle'}"></i>
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

// Function to add to wishlist
function addToWishlist(productId, productName, price, image) {
    try {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        if (!wishlist.find(item => item.id === parseInt(productId))) {
            wishlist.push({
                id: parseInt(productId),
                name: productName,
                price: price,
                image: image,
                quantity: 1
            });
            
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistCount();
            showWishlistNotification(`${productName} added to wishlist`, 'success');
        } else {
            showWishlistNotification(`${productName} is already in your wishlist`, 'info');
        }
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        showWishlistNotification('Error adding item to wishlist', 'error');
    }
}

// Function to remove from wishlist
function removeFromWishlist(productId) {
    try {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const itemToRemove = wishlist.find(item => item.id === parseInt(productId));
        
        if (itemToRemove) {
            wishlist = wishlist.filter(item => item.id !== parseInt(productId));
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistCount();
            showWishlistNotification(`${itemToRemove.name} removed from wishlist`, 'error');
            displayWishlistItems();
        }
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        showWishlistNotification('Error removing item from wishlist', 'error');
    }
}

// Function to display wishlist items
function displayWishlistItems() {
    const wishlistContainer = document.getElementById('wishlistItems');
    const emptyWishlistMessage = document.getElementById('emptyWishlistMessage');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (!wishlistContainer || !emptyWishlistMessage) return;
    
    if (wishlist.length === 0) {
        emptyWishlistMessage.style.display = 'block';
        wishlistContainer.innerHTML = '';
        return;
    }
    
    emptyWishlistMessage.style.display = 'none';
    
    let wishlistHTML = '';
    
    wishlist.forEach(item => {
        wishlistHTML += `
            <div class="card mb-3 wishlist-item" data-id="${item.id}">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-2">
                            <img src="${item.image}" alt="${item.name}" class="img-fluid rounded" onerror="handleImageError(this)">
                        </div>
                        <div class="col-md-4">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="text-muted mb-0">Price: ${formatPrice(item.price)}</p>
                        </div>
                        <div class="col-md-3">
                            <span class="badge bg-danger">Wishlist</span>
                        </div>
                        <div class="col-md-2">
                            <p class="mb-0"><strong>${formatPrice(item.price)}</strong></p>
                        </div>
                        <div class="col-md-1">
                            <div class="btn-group">
                                <button class="btn btn-sm btn-outline-primary" onclick="addToCart(${item.id}, '${item.name.replace(/'/g, "\\'")}', ${item.price}, '${item.image.replace(/'/g, "\\'")}')" title="Add to Cart">
                                    <i class="fas fa-shopping-cart"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="removeFromWishlist(${item.id})" title="Remove">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    wishlistContainer.innerHTML = wishlistHTML;
}

// Function to share cart
function shareCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const cartItems = cart.map(item => `${item.name} - ${formatPrice(item.price)}`).join('\n');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const shareText = `My Nykaa Fashion Cart:\n\n${cartItems}\n\nTotal: ${formatPrice(total)}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Nykaa Fashion Cart',
            text: shareText
        }).catch(console.error);
    } else {
        // Fallback for browsers that don't support Web Share API
        const textarea = document.createElement('textarea');
        textarea.value = shareText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Cart details copied to clipboard!', 'success');
    }
}

// Function to show wishlist section
function showWishlist() {
    // Scroll to wishlist section
    const wishlistSection = document.querySelector('.wishlist-section');
    if (wishlistSection) {
        wishlistSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to handle product image errors
function handleImageError(img) {
    img.src = 'images/placeholder.jpg'; // Fallback image
    img.alt = 'Product image not available';
}

// Function to toggle gift wrapping for an item
function toggleGiftWrapping(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].giftWrapped = !cart[itemIndex].giftWrapped;
        if (!cart[itemIndex].giftWrapped) {
            delete cart[itemIndex].giftMessage;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateOrderSummary();
        showNotification(cart[itemIndex].giftWrapped ? 'Gift wrapping added' : 'Gift wrapping removed', 'success');
    }
}

// Function to add gift message
function addGiftMessage(productId, message) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1 && cart[itemIndex].giftWrapped) {
        cart[itemIndex].giftMessage = message;
        localStorage.setItem('cart', JSON.stringify(cart));
        showNotification('Gift message added', 'success');
    }
}

// Function to check for price drops
function checkPriceDrops() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const priceDrops = [];
    
    // Sample price history (in a real app, this would come from a backend)
    const priceHistory = {
        101: { current: 1299, previous: 1499 },
        102: { current: 1999, previous: 2499 },
        201: { current: 2499, previous: 2999 },
        202: { current: 899, previous: 999 }
    };
    
    // Check cart items for price drops
    cart.forEach(item => {
        if (priceHistory[item.id] && priceHistory[item.id].current < item.price) {
            priceDrops.push({
                id: item.id,
                name: item.name,
                oldPrice: item.price,
                newPrice: priceHistory[item.id].current,
                savings: item.price - priceHistory[item.id].current
            });
        }
    });
    
    // Check wishlist items for price drops
    wishlist.forEach(item => {
        if (priceHistory[item.id] && priceHistory[item.id].current < item.price) {
            priceDrops.push({
                id: item.id,
                name: item.name,
                oldPrice: item.price,
                newPrice: priceHistory[item.id].current,
                savings: item.price - priceHistory[item.id].current
            });
        }
    });
    
    return priceDrops;
}

// Function to display price drop alerts
function displayPriceDropAlerts() {
    const priceDrops = checkPriceDrops();
    if (priceDrops.length === 0) return;
    
    const alertsContainer = document.createElement('div');
    alertsContainer.className = 'price-drop-alerts mb-4';
    
    priceDrops.forEach(drop => {
        const alert = document.createElement('div');
        alert.className = 'price-drop-alert';
        alert.innerHTML = `
            <strong>${drop.name}</strong> price dropped from ${formatPrice(drop.oldPrice)} to ${formatPrice(drop.newPrice)}!
            <span class="savings">Save ${formatPrice(drop.savings)}</span>
        `;
        alertsContainer.appendChild(alert);
    });
    
    const cartItems = document.getElementById('cartItems');
    cartItems.parentNode.insertBefore(alertsContainer, cartItems);
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', () => {
    try {
        displayCartItems();
        displaySavedItems();
        displayWishlistItems();
        displayPriceDropAlerts();
        updateCartCount();
        updateWishlistCount();
        
        // Add event listener to checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', checkout);
        }
        
        // Add event listener to share cart button
        const shareCartBtn = document.getElementById('shareCartBtn');
        if (shareCartBtn) {
            shareCartBtn.addEventListener('click', shareCart);
        }
        
        // Add event listener to wishlist link
        const wishlistLink = document.querySelector('a[onclick="showWishlist()"]');
        if (wishlistLink) {
            wishlistLink.addEventListener('click', (e) => {
                e.preventDefault();
                showWishlist();
            });
        }
    } catch (error) {
        console.error('Error initializing cart page:', error);
    }
}); 