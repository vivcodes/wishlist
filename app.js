
// Sample products
const products = [
    {
        name: 'Product 1',
        image: 'https://via.placeholder.com/150',
        link: 'https://example.com/product1'
    },
    {
        name: 'Product 2',
        image: 'https://via.placeholder.com/150',
        link: 'https://example.com/product2'
    },
    // Add more products here
];

// Populate the product grid with images
const productGrid = document.getElementById('productGrid');

products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `<img src="${product.image}" alt="${product.name}" class="product-image">`;

    // Add click event to show product details
    productDiv.addEventListener('click', () => {
        document.getElementById('productImage').src = product.image;
        document.getElementById('productName').innerText = product.name;
        document.getElementById('productLink').href = product.link;
        document.getElementById('productDetails').style.display = 'block'; // Show the details section
    });

    productGrid.appendChild(productDiv);
});

// Close button to hide product details
document.getElementById('closeDetails').addEventListener('click', () => {
    document.getElementById('productDetails').style.display = 'none'; // Hide details section
});
