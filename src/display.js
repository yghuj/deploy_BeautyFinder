let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Get brand from the URL
const urlParams = new URLSearchParams(window.location.search);
const brand = urlParams.get('brand');

// Fetch products for the specified brand
function fetchProductsForDisplay() {
    fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`)
        .then(response => response.json())
        .then(data => displayProducts(data))
        .catch(error => console.error(`Error fetching data for ${brand}:`, error));
}

function displayProducts(products) {
    const allProductsSection = document.getElementById("all-products-section");

    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <div class="product">
            <h3>${product.name}</h3>
            <img src="${product.image_link}" onerror="this.onerror=null;this.src='fallback-image.png';" alt="Product Image">
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Rating:</strong> ${product.rating || 'N/A'}</p>
            <p><strong>Category:</strong> ${product.category || 'N/A'}</p>
            <p><strong>Type:</strong> ${product.product_type}</p>
            <p><strong>Description:</strong> ${product.description || 'N/A'}</p>
            <a href="${product.product_link}" target="_blank">Product Link</a> |
            <a href="${product.website_link}" target="_blank">Website Link</a>
            <br><br>
            <button class="add-to-wishlist">Add to Wish List</button>
            </div>
        `;


        const wishlistButton = productCard.querySelector('.add-to-wishlist');
        wishlistButton.onclick = () => addToWishlist(product);

        allProductsSection.appendChild(productCard);
    });
}

function addToWishlist(product) {
    wishlist.push(product); 
    localStorage.setItem('wishlist', JSON.stringify(wishlist)); 
    alert("Added to Wish List!");
}

fetchProductsForDisplay();
