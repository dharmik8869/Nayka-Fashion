// Product data
const products = [
    {
        id: 1,
        name: "Floral Print Girls Dress",
        price: 999,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/2/2/224dba6MMKS02NAVYRS_1.jpg?rnd=20200526195200&tr=w-512",
        category: "dresses",
        rating: 4.5
    },
    {
        id: 2,
        name: "Cartoon Print T-Shirt",
        price: 499,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/3/d/3daa529Ani-BUIPA-210581201_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tshirts",
        rating: 4.3
    },
    {
        id: 3,
        name: "Boys Casual Set",
        price: 1299,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/9/d/9dffa66809525_1.jpg?rnd=20200526195200&tr=w-512",
        category: "sets",
        rating: 4.7
    },
    {
        id: 4,
        name: "Girls Lehenga Choli Set",
        price: 1999,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/2/6/268a562T-PINKBUTNETLEH-1.jpg?rnd=20200526195200&tr=w-512",
        category: "ethnic",
        rating: 4.8
    },
    {
        id: 5,
        name: "Boys Denim Shorts",
        price: 699,
        discount: 10,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/3/d3285edSS25BJS926-BlackMidWashBlue_1.jpg?rnd=20200526195200&tr=w-512",
        category: "casual",
        rating: 4.2
    },
    {
        id: 6,
        name: "Girls Party Dress",
        price: 1599,
        discount: 35,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/0/6/06d7230FRRN750BEIGE_3.jpg?tr=w-512",
        category: "dresses",
        rating: 4.6
    },
    {
        id: 7,
        name: "Kids Summer T-Shirt Pack",
        price: 899,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/f/2/f228a66LP20221488_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tshirts",
        rating: 4.4
    },
    {
        id: 8,
        name: "Traditional Boys Kurta Set",
        price: 1499,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/8/18bb547KK-0372-5143-KC101_2.jpg?tr=w-512",
        category: "ethnic",
        rating: 4.7
    },
    {
        id: 9,
        name: "Girls Casual Dress Set",
        price: 1199,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/7/f/7fc6f19ZMIARC00003106_1.jpg?rnd=20200526195200&tr=w-512",
        category: "sets",
        rating: 4.5
    },
    {
        id: 10,
        name: "Kids Track Pants",
        price: 799,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/8/3/83ed598S5240652172_1.jpg?rnd=20200526195200&tr=w-512",
        category: "casual",
        rating: 4.3
    }
];

// Function to create product card
function createProductCard(product) {
    const discountedPrice = product.price - (product.price * product.discount / 100);
    
    return `
        <div class="brand-card" onclick="window.location.href='kids-product-details.html?id=${product.id}'" style="cursor: pointer;">
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