// Product data
const products = [
    {
        id: 1,
        name: "Floral Maxi Dress",
        price: 2499,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/a/4/a4b5f74TP0528JQPI_1.jpg?rnd=20200526195200&tr=w-512",
        category: "dresses",
        rating: 4.5
    },
    {
        id: 2,
        name: "Silk Top",
        price: 1999,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/f/4/f43db798907724265147White_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tops",
        rating: 4.2
    },
    {
        id: 3,
        name: "Embroidered Kurta",
        price: 3499,
        discount: 25,
        image: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/19076438/2022/7/21/b873f70d-5617-488d-99e4-0b8012b208e11658401854017-Libas-Women-Kurta-Sets-2931658401853064-1.jpg",
        category: "ethnic",
        rating: 4.7
    },
    {
        id: 4,
        name: "Denim Jacket",
        price: 2999,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/e/0/e078893MCAW19DEN0556319_2.jpg?tr=w-512",
        category: "tops",
        rating: 4.3
    },
    {
        id: 5,
        name: "Printed Palazzo",
        price: 1799,
        discount: 35,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/a/6ac3813AR50WCKRBR_1.jpg?rnd=20200526195200&tr=w-1080",
        category: "ethnic",
        rating: 4.4
    },
    {
        id: 6,
        name: "Casual T-shirt",
        price: 999,
        discount: 10,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/c/e/ced4bc9WCGBECOMKTEE3895-GREEN_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tops",
        rating: 4.1
    },
    {
        id: 7,
        name: "Demi Flared Midi Skirt Black",
        price: 1599,
        discount: 20,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/9/c/9c13c68092417SKDEMIBLCK_2.jpg?tr=w-512",
        category: "dresses",
        rating: 4.6
    },
    {
        id: 8,
        name: "Designer Saree",
        price: 4999,
        discount: 30,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/7/2/72dda45ND_GAJRA00003590_1.jpg?rnd=20200526195200&tr=w-512",
        category: "ethnic",
        rating: 4.8
    },
    {
        id: 9,
        name: "Crop Top",
        price: 1299,
        discount: 15,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/4/1/41934f90K662R02_1.jpg?rnd=20200526195200&tr=w-512",
        category: "tops",
        rating: 4.2
    },
    {
        id: 10,
        name: "Party Dress",
        price: 3999,
        discount: 25,
        image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/0/d0d8d98DR022050_1.jpg?rnd=20200526195200&tr=w-512",
        category: "dresses",
        rating: 4.7
    }
];

// Function to create product card
function createProductCard(product) {
    const discountedPrice = product.price - (product.price * product.discount / 100);
    
    return `
        <div class="brand-card" onclick="window.location.href='women-product-details.html?id=${product.id}'" style="cursor: pointer;">
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