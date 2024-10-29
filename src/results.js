let productsData = []; 
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []; 


const urlParams = new URLSearchParams(window.location.search);
const brand = urlParams.get('brand');


if (brand) {
    fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`)
        .then((response) => response.json())
        .then((data) => {
            productsData = data; 
            displayProducts(productsData);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            document.getElementById("demo").innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        });
}

function displayProducts(products) {
    let output = '';

    products.forEach((product, index) => {
        output += `
            <div class="product">
                <h3>${product.name}</h3>
                <img src="${product.image_link}" onerror="this.onerror=null;this.src='fallback-image.png';" alt="Product Image" style="max-width:200px;">
                <p><strong>Brand:</strong> ${product.brand}</p>
                <p><strong>Price:</strong>$ ${product.price}</p>
                <p><strong>Rating:</strong> ${product.rating || 'N/A'}</p>
                <p><strong>Category:</strong> ${product.category || 'N/A'}</p>
                <p><strong>Type:</strong> ${product.product_type}</p>
                <p><strong>Description:</strong> ${product.description || 'No description available.'}</p>
                <a href="${product.product_link}" target="_blank">Product Link</a> |
                <a href="${product.website_link}" target="_blank">Website Link</a>
                <br><br>
                <div class="button-container">
                <button onclick="addToWishlist(${index})">Add to Wish List</button>
                </div>
            </div>
        `;
    });

    document.getElementById("demo").innerHTML = output;
}


function addToWishlist(index) {
    const product = productsData[index];
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist)); 
    alert("Added to Wish List!");
}


function filterProductsByPrice() {
    const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;

    const filteredProducts = productsData.filter((product) => {
        const productPrice = parseFloat(product.price);
        return !isNaN(productPrice) && productPrice >= minPrice && productPrice <= maxPrice;
    });

    displayProducts(filteredProducts);
}