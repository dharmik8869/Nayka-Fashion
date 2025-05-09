// Product data
const products = [
    {
        id: 1,
        name: "Floral Print Anarkali Kurta Set",
        price: 2499,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/4/a/4aefcefSJ-ANR-79_1.jpg?rnd=20200526195200&tr=w-512",
        category: "kurta",
        rating: 4.5
    },
    {
        id: 2,
        name: "Banarasi Silk Wedding Saree",
        price: 5999,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/8/68cb833C560-41_1.jpg?rnd=20200526195200&tr=w-1080",
        category: "saree",
        rating: 4.8
    },
    {
        id: 3,
        name: "Embroidered Bridal Lehenga",
        price: 8999,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/7/d7a36d9SILK004_1.jpg?rnd=20200526195200&tr=w-512",
        category: "lehenga",
        rating: 4.7
    },
    {
        id: 4,
        name: "Printed Ethnic Maxi Dress",
        price: 1799,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/0/50d2618Dress41_1.jpg?rnd=20200526195200&tr=w-512",
        category: "ethnic",
        rating: 4.3
    },
    {
        id: 5,
        name: "Cotton Palazzo Pants",
        price: 999,
        discount: 10,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/9/4/9461a5f166900_2.jpg?tr=w-512",
        category: "bottom",
        rating: 4.2
    },
    {
        id: 6,
        name: "Embroidered Straight Kurta",
        price: 1999,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/9/1963a22SAHIKA00016194_1.jpg?rnd=20200526195200&tr=w-512",
        category: "kurta",
        rating: 4.4
    },
    {
        id: 7,
        name: "Georgette Designer Saree",
        price: 4499,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/b/6bb9ebf2114RANI_1.jpg?rnd=20200526195200&tr=w-512",
        category: "saree",
        rating: 4.6
    },
    {
        id: 8,
        name: "Party Wear Sharara Set",
        price: 3999,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/9/6/9611888WEGSS184_1.jpg?rnd=20200526195200&tr=w-512",
        category: "ethnic",
        rating: 4.5
    },
    {
        id: 9,
        name: "Printed Ethnic Skirt",
        price: 1499,
        discount: 35,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/0/f/0f03f90LIKKPL006-Black_1.jpg?rnd=20200526195200&tr=w-512",
        category: "bottom",
        rating: 4.3
    },
    {
        id: 10,
        name: "Designer Reception Lehenga",
        price: 12999,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/b/2/b22ea5e1219GRN_2.jpg?tr=w-512s",
        category: "lehenga",
        rating: 4.9
    }
];

// Function to create product card
function createProductCard(product) {
    const discountedPrice = product.price - (product.price * product.discount / 100);
    
    return `
        <div class="brand-card" onclick="window.location.href='indianwear-product-details.html?id=${product.id}'" style="cursor: pointer;">
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