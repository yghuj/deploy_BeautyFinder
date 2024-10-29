let productsData = [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []; 

function buttonClicked() {
    var brand = document.getElementById("beauty_input").value;
    window.location.href = `results.html?brand=${encodeURIComponent(brand)}`;
}


const brands = ["maybelline", "l'oreal", "physicians formula", "nyx", "wet n wild"];
const productsPerBrand = 10; 

function fetchProductsForBrands() {
    brands.forEach(brand => {
        fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`)
            .then(response => response.json())
            .then(data => {
                displayBrandProducts(brand, data.slice(0, productsPerBrand)); 
            })
            .catch(error => {
                console.error(`Error fetching data for ${brand}:`, error);
            });
    });
}

function displayBrandProducts(brand, products) {
    const productsSection = document.getElementById("products-section");
    const brandSection = document.createElement('div');
    brandSection.classList.add('brand-section');

    const brandTitle = document.createElement('div');
    brandTitle.classList.add('brand');
    brandTitle.textContent = brand.charAt(0).toUpperCase() + brand.slice(1); 

    const productsContainer = document.createElement('div');
    productsContainer.classList.add('products');

    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');

        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image_link}" onerror="this.onerror=null;this.src='fallback-image.png';" alt="Product Image" style="max-width:100%;">
            <p><strong>Price:</strong>$ ${product.price}</p>
            <p><strong>Rating:</strong> ${product.rating || 'N/A'}</p>
            <p><strong>Category:</strong> ${product.category || 'N/A'}</p>
            <p><strong>Type:</strong> ${product.product_type}</p>
        `;

        productsContainer.appendChild(productCard);
    });

    const seeAllButton = document.createElement('button');
    seeAllButton.textContent = 'See All Products';
    seeAllButton.classList.add('see-all-button');
    seeAllButton.onclick = () => {
        window.location.href = `display.html?brand=${encodeURIComponent(brand)}`;
    };

    brandSection.appendChild(brandTitle);
    brandSection.appendChild(productsContainer);
    brandSection.appendChild(seeAllButton); 
    productsSection.appendChild(brandSection);
}

fetchProductsForBrands();
