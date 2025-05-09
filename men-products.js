// Product data
const products = [
    {
        id: 1,
        name: "Formal Shirt",
        price: 1999,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/f/6f76e2aLPSFMCLP914626_1.jpg?rnd=20200526195200&tr=w-512",
        category: "shirts",
        rating: 4.5
    },
    {
        id: 2,
        name: "Casual T-Shirt",
        price: 899,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/e/e/eed9d3cMPT02BBFT109RIFLEGREEN_1.jpg?rnd=20200526195200&tr=w-1080",
        category: "tshirts",
        rating: 4.2
    },
    {
        id: 3,
        name: "Designer Kurta",
        price: 2499,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/e/3/e3a256eSDMKT1444_1.jpg?rnd=20200526195200&tr=w-512",
        category: "ethnic",
        rating: 4.7
    },
    {
        id: 4,
        name: "Slim Fit Jeans",
        price: 2299,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/a/5/a5671cf7004768322_1.jpg?rnd=20200526195200&tr=w-512",
        category: "jeans",
        rating: 4.3
    },
    {
        id: 5,
        name: "Printed Shirt",
        price: 1599,
        discount: 35,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/7/3/73b5d0b256982_1.jpg?rnd=20200526195200&tr=w-512",
        category: "shirts",
        rating: 4.4
    },
    {
        id: 6,
        name: "Polo T-Shirt",
        price: 1299,
        discount: 10,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/7/175760e136682603_g0.jpg?rnd=20200526195200&tr=w-512",
        category: "tshirts",
        rating: 4.1
    },
    {
        id: 7,
        name: "Traditional Kurta Set",
        price: 3999,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/9/5/95a053eAP-SY-SKP-3028LYL-SPCCOWH_1.jpg?rnd=20200526195200&tr=w-1080",
        category: "ethnic",
        rating: 4.6
    },
    {
        id: 8,
        name: "Ripped Jeans",
        price: 2799,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/e/9/e951aa0WEA0117136936_1.jpg?rnd=20200526195200&tr=w-512",
        category: "jeans",
        rating: 4.8
    },
    {
        id: 9,
        name: "Striped Shirt",
        price: 1799,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/2/d/2d231deBUL-24BSFS-32_1.jpg?rnd=20200526195200&tr=w-512",
        category: "shirts",
        rating: 4.2
    },
    {
        id: 10,
        name: "Graphic T-Shirt",
        price: 999,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/b/dbdbc2bNK_BEWAK00036353_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tshirts",
        rating: 4.7
    }
];

// Function to create product card
function createProductCard(product) {
    const discountedPrice = product.price - (product.price * product.discount / 100);
    
    return `
        <div class="brand-card" onclick="window.location.href='men-product-details.html?id=${product.id}'" style="cursor: pointer;">
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