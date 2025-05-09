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
    },
    {
        id: 7,
        name: "Men's Brown Derby Shoes",
        price: 3999,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/8/3/8360b02RTE5633B_1.jpg?rnd=20200526195200&tr=w-512",
        category: "formal",
        rating: 4.8
    },
    {
        id: 8,
        name: "Men's Gym Training Shoes",
        price: 2499,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/2/c/2ce0f8fEX4150_1.jpg?rnd=20200526195200&tr=w-1080",
        category: "sports",
        rating: 4.5
    },
    {
        id: 9,
        name: "Men's Slip-On Casual Shoes",
        price: 1499,
        discount: 35,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/3/1/31bd7ccCL-KI-M-7915-BROWN_1.jpg?rnd=20200526195200&tr=w-512",
        category: "casual",
        rating: 4.6
    },
    {
        id: 10,
        name: "Men's Leather Slippers",
        price: 1299,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/f/6/f64764b1231646030_1.jpg?rnd=20200526195200&tr=w-512",
        category: "sandals",
        rating: 4.3
    }
];

// Function to create product card
function createProductCard(product) {
    const discountedPrice = product.price - (product.price * product.discount / 100);
    
    return `
        <div class="brand-card" onclick="window.location.href='footwear-product-details.html?id=${product.id}'" style="cursor: pointer;">
            <img src="${product.image}" alt="${product.name}">
            <div class="brand-content">
                <div class="brand-name">${product.name}</div>
                <div class="brand-offer">${product.discount}% off</div>
                <div class="brand-desc">₹${discountedPrice.toFixed(2)}</div>
            </div>
        </div>
    `;
}

// Function to display products
function displayProducts(productsToShow = products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = productsToShow.map(createProductCard).join('');
}

// Function to filter products
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const price = document.getElementById('priceFilter').value;
    const sort = document.getElementById('sortFilter').value;

    let filteredProducts = [...products];

    // Category filter
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    // Price filter
    if (price !== 'all') {
        const [min, max] = price.split('-').map(Number);
        if (max) {
            filteredProducts = filteredProducts.filter(product => product.price >= min && product.price <= max);
        } else {
            filteredProducts = filteredProducts.filter(product => product.price >= min);
        }
    }

    // Sort products
    switch (sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'popular':
            filteredProducts.sort((a, b) => b.discount - a.discount);
            break;
    }

    displayProducts(filteredProducts);
}

// Event listeners for filters
document.getElementById('categoryFilter').addEventListener('change', filterProducts);
document.getElementById('priceFilter').addEventListener('change', filterProducts);
document.getElementById('sortFilter').addEventListener('change', filterProducts);

// Initial display
displayProducts(); 