// Product data
const products = [
    {
        id: 1,
        name: "Fossil Gen 6 Smartwatch",
        price: 24995,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/b/0/b07ca59FTW6079_3.jpg?rnd=20200526195200&tr=w-1080",
        category: "smart",
        rating: 4.5
    },
    {
        id: 2,
        name: "Titan Analog Black Dial",
        price: 3995,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/f/8/f8ea7e01825KM02_1.jpg?rnd=20200526195200&tr=w-512",
        category: "analog",
        rating: 4.3
    },
    {
        id: 3,
        name: "Casio G-Shock Digital",
        price: 8995,
        discount: 10,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/c/a/casio-g732_1_ae107bd2.jpg?rnd=20200526195200&tr=w-512",
        category: "digital",
        rating: 4.6
    },
    {
        id: 4,
        name: "Michael Kors Analog Gold",
        price: 19995,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/b/7/b7569ceBQ3377_1.jpg?rnd=20200526195200&tr=w-1080",
        category: "luxury",
        rating: 4.7
    },
    {
        id: 5,
        name: "Samsung Galaxy Watch 5",
        price: 27999,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/8/1/818dc08100-07_1.jpg?rnd=20200526195200&tr=w-512",
        category: "smart",
        rating: 4.4
    },
    {
        id: 6,
        name: "Timex Classic Analog",
        price: 2499,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/t/i/ti000r41400_1.jpg?rnd=20200526195200&tr=w-512",
        category: "analog",
        rating: 4.2
    },
    {
        id: 7,
        name: "Apple Watch Series 8",
        price: 41999,
        discount: 10,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU-_5LuEI5ha_WMSIa870ioOGEg2MskzC6KQ&s",
        category: "smart",
        rating: 4.8
    },
    {
        id: 8,
        name: "Citizen Eco-Drive",
        price: 15995,
        discount: 18,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/0/5/052f715CA4554-84L_1.jpg?rnd=20200526195200&tr=w-512",
        category: "luxury",
        rating: 4.5
    },
    {
        id: 9,
        name: "Fastrack Digital Sports",
        price: 3495,
        discount: 25,
        image: "https://rukminim3.flixcart.com/image/850/1000/xif0q/watch/y/o/a/-original-imagqfu29g4bpkun.jpeg?q=20&crop=false",
        category: "digital",
        rating: 4.1
    },
    {
        id: 10,
        name: "Seiko Presage Automatic",
        price: 35999,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/c/b/cb79713KP_SEIKO00000102_1.jpg?rnd=20200526195200&tr=w-512",
        category: "luxury",
        rating: 4.9
    }
];

// Function to create product card
function createProductCard(product) {
    const discountedPrice = product.price - (product.price * product.discount / 100);
    
    return `
        <div class="brand-card" onclick="window.location.href='watch-product-details.html?id=${product.id}'" style="cursor: pointer;">
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