// Initialize order confirmation page
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    displayOrderDetails();
});

// Display order details
function displayOrderDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    
    if (!orderId) {
        window.location.href = 'nykaa.html';
        return;
    }
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id.toString() === orderId);
    
    if (!order) {
        window.location.href = 'nykaa.html';
        return;
    }
    
    // Display order ID
    document.getElementById('orderId').textContent = orderId;
    
    // Display order date
    const orderDate = new Date(order.date);
    document.getElementById('orderDate').textContent = orderDate.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Display payment method
    const paymentMethod = order.paymentMethod.toUpperCase();
    document.getElementById('paymentMethod').textContent = paymentMethod;
    
    // Display delivery address
    const address = order.address;
    document.getElementById('deliveryAddress').innerHTML = `
        <p class="mb-1">${address.fullName}</p>
        <p class="mb-1">${address.address}</p>
        ${address.landmark ? `<p class="mb-1">Landmark: ${address.landmark}</p>` : ''}
        <p class="mb-1">${address.pincode}</p>
        <p class="mb-1">Phone: ${address.phone}</p>
    `;
    
    // Display order items
    const container = document.getElementById('orderItems');
    let itemsHTML = '';
    let subtotal = 0;
    let giftWrapTotal = 0;
    
    order.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        if (item.giftWrapped) {
            giftWrapTotal += 50 * item.quantity;
        }
        
        itemsHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-2">
                            <img src="${item.image}" alt="${item.name}" class="img-fluid rounded" onerror="handleImageError(this)">
                        </div>
                        <div class="col-md-4">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="text-muted mb-0">Price: ${formatPrice(item.price)}</p>
                            ${item.giftWrapped ? `
                                <div class="mt-2">
                                    <span class="badge bg-info">Gift Wrapped</span>
                                    ${item.giftMessage ? `<p class="text-muted mt-1">Message: ${item.giftMessage}</p>` : ''}
                                </div>
                            ` : ''}
                        </div>
                        <div class="col-md-2">
                            <p class="mb-0">Quantity: ${item.quantity}</p>
                        </div>
                        <div class="col-md-2">
                            <p class="mb-0"><strong>${formatPrice(itemTotal)}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = itemsHTML;
    
    // Add order summary
    const shipping = subtotal > 999 ? 0 : 99;
    const discount = subtotal > 1999 ? subtotal * 0.1 : 0;
    const total = subtotal + shipping + giftWrapTotal - discount;
    
    const summaryHTML = `
        <div class="card mt-3">
            <div class="card-body">
                <h5 class="card-title">Order Summary</h5>
                <div class="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>${formatPrice(subtotal)}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span>Shipping</span>
                    <span>${formatPrice(shipping)}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span>Gift Wrapping</span>
                    <span>${formatPrice(giftWrapTotal)}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span>Discount</span>
                    <span class="text-success">-${formatPrice(discount)}</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <strong>Total</strong>
                    <strong>${formatPrice(total)}</strong>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', summaryHTML);
}

// Download invoice
function downloadInvoice() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    
    if (!orderId) {
        return;
    }
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id.toString() === orderId);
    
    if (!order) {
        return;
    }
    
    // Create invoice content
    const invoiceContent = `
        Nykaa Fashion
        Invoice
        
        Order ID: ${orderId}
        Date: ${new Date(order.date).toLocaleDateString('en-IN')}
        
        Shipping Address:
        ${order.address.fullName}
        ${order.address.address}
        ${order.address.landmark ? `Landmark: ${order.address.landmark}\n` : ''}
        ${order.address.pincode}
        Phone: ${order.address.phone}
        
        Items:
        ${order.items.map(item => `
            ${item.name}
            Quantity: ${item.quantity}
            Price: ${formatPrice(item.price)}
            Total: ${formatPrice(item.price * item.quantity)}
            ${item.giftWrapped ? 'Gift Wrapped' : ''}
            ${item.giftMessage ? `Gift Message: ${item.giftMessage}` : ''}
        `).join('\n')}
        
        Payment Method: ${order.paymentMethod.toUpperCase()}
        
        Thank you for shopping with Nykaa Fashion!
    `;
    
    // Create blob and download
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
} 