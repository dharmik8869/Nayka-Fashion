// Product data
const products = [
    {
        id: 1,
        name: "Men's Dri-FIT Training T-Shirt",
        price: 1499,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/9/a/9a43974MV16-0101-SUNDT_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tshirts",
        rating: 4.5
    },
    {
        id: 2,
        name: "Women's Yoga Pants",
        price: 1999,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/1/61f1893MCAMAA00017477_4.jpg?tr=w-512",
        category: "yoga",
        rating: 4.7
    },
    {
        id: 3,
        name: "Men's Running Shorts",
        price: 899,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/0/60ec557AT98800XNavy_6.jpg?tr=w-512",
        category: "shorts",
        rating: 4.3
    },
    {
        id: 4,
        name: "Women's Sports Tank Top",
        price: 799,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/b/1b2c39cATP85901BLACK_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tshirts",
        rating: 4.4
    },
    {
        id: 5,
        name: "Men's Track Suit Set",
        price: 2999,
        discount: 10,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/e/8/e83f67dMZM-SS24-867868-GF_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tracksuits",
        rating: 4.8
    },
    {
        id: 6,
        name: "Women's Gym Leggings",
        price: 1299,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/8/d8b6203NF_BLIAD00000064_1.jpg?rnd=20200526195200&tr=w-512",
        category: "gym",
        rating: 4.6
    },
    {
        id: 7,
        name: "Men's Compression Shorts",
        price: 999,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/c/7/c7c977bFComp-2-Tshirt-White_1.jpg?rnd=20200526195200&tr=w-1080",
        category: "shorts",
        rating: 4.2
    },
    {
        id: 8,
        name: "Women's Yoga Set",
        price: 2499,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/c/4/c4ee9f0combo2-164-172-grey_1.jpg?rnd=20200526195200&tr=w-512",
        category: "yoga",
        rating: 4.9
    },
    {
        id: 9,
        name: "Men's Gym Tank Top",
        price: 699,
        discount: 35,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/9/a/9a43974MV57-0101-WHITE_1.jpg?rnd=20200526195200&tr=w-512",
        category: "gym",
        rating: 4.3
    },
    {
        id: 10,
        name: "Women's Track Suit",
        price: 2799,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/8/d/8ddb233TLC241_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tracksuits",
        rating: 4.7
    }
];

// Function to create product card
function createProductCard(product) {
    const discountedPrice = product.price - (product.price * product.discount / 100);
    
    return `
        <div class="brand-card" onclick="window.location.href='sportswear-product-details.html?id=${product.id}'" style="cursor: pointer;">
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