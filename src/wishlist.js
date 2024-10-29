let wishlist = [];

function loadWishlist() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
    displayWishlist();
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function displayWishlist() {
    let output = '';

    wishlist.forEach((product, index) => {
        if (!product || !product.name){
            return; // Skip this product if it's invalid
        }
        
        output += `
            <div class="product">
                <h3>${product.name}</h3>
                <p><strong>Brand:</strong> ${product.brand}</p>
                <p><strong>Price:</strong>$ ${product.price}</p>
                <img src="${product.image_link}" onerror="this.onerror=null;this.src='fallback-image.png';" alt="Product Image" style="max-width:200px;">
                <p><strong>Rating:</strong> ${product.rating || 'N/A'}</p>
                <p><strong>Category:</strong> ${product.category || 'N/A'}</p>
                <p><strong>Type:</strong> ${product.product_type}</p>
                <p><strong>Description:</strong> ${product.description || 'No description available.'}</p>
                <p><strong>View product:</strong> 
                    <a href="${product.product_link || '#'}" target="_blank">
                        ${product.product_link ? product.product_link : 'No product link available.'}
                    </a>
                </p>
                <br>
                <p><strong>View website:</strong> 
                    <a href="${product.website_link || '#'}" target="_blank">
                        ${product.website_link ? product.website_link : 'No website link available.'}
                    </a>
                </p>
                <br>
                <div>
                    <label>Note:</label>
                    <input type="text" id="note-${index}" placeholder="Add a note" />
                    <br><br>
                    <button onclick="saveNote(${index})">Save Note</button>
                    <button onclick="deleteNote(${index})">Delete Note</button>
                </div>
                <br><br>
                <p><strong>My Note:</strong> <span id="display-note-${index}">${product.note || ''}</span></p><br>
                <center>
                <button onclick="removeFromWishlist(${index})">Remove Product</button>
                </center>
            </div>
        `;
    });

    document.getElementById("wishlist").innerHTML = output;
}

function saveNote(index) {
    const noteInput = document.getElementById(`note-${index}`);
    const noteValue = noteInput.value;
    wishlist[index].note = noteValue; 
    saveWishlist(); 
    displayWishlist();
    noteInput.value = '';
}

function deleteNote(index) {
    wishlist[index].note = '';
    saveWishlist();
    displayWishlist();
}
function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    saveWishlist();
    displayWishlist();
}
window.onload = loadWishlist;
