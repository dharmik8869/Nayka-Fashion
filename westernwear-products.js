// Product data
const products = [
    {
        id: 1,
        name: "Floral Maxi Dress",
        price: 2499,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/9/195304c7011831603_1.jpg?rnd=20200526195200&tr=w-512",
        category: "dresses",
        rating: 4.5
    },
    {
        id: 2,
        name: "Ruffle Crop Top",
        price: 999,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/8/1/81d23410723FHAATOP33_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tops",
        rating: 4.2
    },
    {
        id: 3,
        name: "Floral Jumpsuit",
        price: 2999,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/5/558a8e3WCGBECOMWJPS5917CMULTIMultiColor_2.jpg?tr=w-512",
        category: "jumpsuits",
        rating: 4.7
    },
    {
        id: 4,
        name: "Pleated Midi Skirt",
        price: 1799,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/2/2/2259303EB-102-Rose-Gold_4.jpg?tr=w-512",
        category: "skirts",
        rating: 4.3
    },
    {
        id: 5,
        name: "High-Waist Jeans",
        price: 2299,
        discount: 35,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/0/607486dAPSS24DEN1291158_1.jpg?rnd=20200526195200&tr=w-512",
        category: "jeans",
        rating: 4.4
    },
    {
        id: 6,
        name: "Puff Sleeve Top",
        price: 1299,
        discount: 10,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/5/55feffcKSLTOPS1600_0.jpg?rnd=20200526195200&tr=w-512",
        category: "tops",
        rating: 4.1
    },
    {
        id: 7,
        name: "Wrap Dress",
        price: 3499,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/c/f/cf39fd2DR012207_1.jpg?rnd=20200526195200&tr=w-512",
        category: "dresses",
        rating: 4.6
    },
    {
        id: 8,
        name: "Denim Jumpsuit",
        price: 2799,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/6/567f4fcD3512861A-Blue_1.jpg?rnd=20200526195200&tr=w-512",
        category: "jumpsuits",
        rating: 4.8
    },
    {
        id: 9,
        name: "A-Line Skirt",
        price: 1599,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/3/53aab93S25FSW47_1.jpg?rnd=20200526195200&tr=w-720",
        category: "skirts",
        rating: 4.2
    },
    {
        id: 10,
        name: "Ripped Skinny Jeans",
        price: 1999,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/2/e/2efa154WES0433696893_1.jpg?rnd=20200526195200&tr=w-512",
        category: "jeans",
        rating: 4.7
    }
];

// Function to create product card
function createProductCard(product) {
    const discountedPrice = product.price - (product.price * product.discount / 100);
    
    return `
        <div class="brand-card" onclick="window.location.href='westernwear-product-details.html?id=${product.id}'" style="cursor: pointer;">
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