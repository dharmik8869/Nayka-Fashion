// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    loadAddresses();
    displayOrderSummary();
    loadHeader();
});

// Load saved addresses
function loadAddresses() {
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    const container = document.getElementById('addresses-container');
    
    if (addresses.length === 0) {
        container.innerHTML = '<p class="text-muted">No addresses saved. Please add a new address.</p>';
        return;
    }
    
    let addressesHTML = '';
    addresses.forEach((address, index) => {
        addressesHTML += `
            <div class="address-card ${index === 0 ? 'selected' : ''}" onclick="selectAddress(${index})">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="mb-1">${address.fullName}</h6>
                        <p class="mb-1">${address.phone}</p>
                        <p class="mb-1">${address.address}</p>
                        ${address.landmark ? `<p class="mb-1 text-muted">Landmark: ${address.landmark}</p>` : ''}
                        <span class="badge bg-light text-dark">${address.type}</span>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-outline-primary" onclick="editAddress(${index}, event)">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteAddress(${index}, event)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = addressesHTML;
}

// Show add address modal
function showAddAddressModal() {
    const modal = new bootstrap.Modal(document.getElementById('addAddressModal'));
    modal.show();
}

// Save new address
function saveAddress() {
    const form = document.getElementById('addressForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const address = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        pincode: document.getElementById('pincode').value,
        address: document.getElementById('address').value,
        landmark: document.getElementById('landmark').value,
        type: document.getElementById('addressType').value
    };
    
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    addresses.push(address);
    localStorage.setItem('addresses', JSON.stringify(addresses));
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('addAddressModal'));
    modal.hide();
    
    loadAddresses();
    showNotification('Address saved successfully!', 'success');
}

// Select address
function selectAddress(index) {
    const addresses = document.querySelectorAll('.address-card');
    addresses.forEach(addr => addr.classList.remove('selected'));
    addresses[index].classList.add('selected');
}

// Edit address
function editAddress(index, event) {
    event.stopPropagation();
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    const address = addresses[index];
    
    document.getElementById('fullName').value = address.fullName;
    document.getElementById('phone').value = address.phone;
    document.getElementById('pincode').value = address.pincode;
    document.getElementById('address').value = address.address;
    document.getElementById('landmark').value = address.landmark;
    document.getElementById('addressType').value = address.type;
    
    const modal = new bootstrap.Modal(document.getElementById('addAddressModal'));
    modal.show();
    
    // Update save button to handle edit
    const saveButton = document.querySelector('#addAddressModal .btn-primary');
    saveButton.onclick = () => updateAddress(index);
}

// Update address
function updateAddress(index) {
    const form = document.getElementById('addressForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const address = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        pincode: document.getElementById('pincode').value,
        address: document.getElementById('address').value,
        landmark: document.getElementById('landmark').value,
        type: document.getElementById('addressType').value
    };
    
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    addresses[index] = address;
    localStorage.setItem('addresses', JSON.stringify(addresses));
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('addAddressModal'));
    modal.hide();
    
    loadAddresses();
    showNotification('Address updated successfully!', 'success');
}

// Delete address
function deleteAddress(index, event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this address?')) {
        const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
        addresses.splice(index, 1);
        localStorage.setItem('addresses', JSON.stringify(addresses));
        
        loadAddresses();
        showNotification('Address deleted successfully!', 'success');
    }
}

// Select payment method
function selectPaymentMethod(method) {
    const methods = document.querySelectorAll('.payment-method');
    methods.forEach(m => m.classList.remove('selected'));
    document.querySelector(`#${method}`).closest('.payment-method').classList.add('selected');
}

// Display order summary
function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('order-items');
    
    let itemsHTML = '';
    let subtotal = 0;
    let giftWrapTotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        if (item.giftWrapped) {
            giftWrapTotal += 50 * item.quantity;
        }
        
        itemsHTML += `
            <div class="d-flex justify-content-between mb-2">
                <div>
                    <span class="fw-bold">${item.name}</span>
                    <br>
                    <small class="text-muted">Qty: ${item.quantity}</small>
                </div>
                <span>${formatPrice(itemTotal)}</span>
            </div>
        `;
    });
    
    container.innerHTML = itemsHTML;
    
    // Calculate shipping (free for orders above ₹999)
    const shipping = subtotal > 999 ? 0 : 99;
    
    // Calculate discount (10% off for orders above ₹1999)
    const discount = subtotal > 1999 ? subtotal * 0.1 : 0;
    
    // Update summary
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('shipping').textContent = formatPrice(shipping);
    document.getElementById('gift-wrap').textContent = formatPrice(giftWrapTotal);
    document.getElementById('discount').textContent = `-${formatPrice(discount)}`;
    
    const total = subtotal + shipping + giftWrapTotal - discount;
    document.getElementById('total').textContent = formatPrice(total);
}

// Place order
function placeOrder() {
    const selectedAddress = document.querySelector('.address-card.selected');
    const selectedPayment = document.querySelector('.payment-method.selected input').id;
    
    if (!selectedAddress) {
        showNotification('Please select a delivery address', 'error');
        return;
    }
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // Create order object
    const order = {
        id: Date.now(),
        items: cart,
        address: JSON.parse(localStorage.getItem('addresses'))[Array.from(document.querySelectorAll('.address-card')).indexOf(selectedAddress)],
        paymentMethod: selectedPayment,
        status: 'pending',
        date: new Date().toISOString()
    };
    
    // Save order
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.setItem('cart', '[]');
    
    // Redirect to order confirmation
    window.location.href = `order-confirmation.html?orderId=${order.id}`;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 