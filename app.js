// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// UI Elements
const productGrid = document.getElementById('productGrid');
const productDetails = document.getElementById('productDetails');
const productImage = document.getElementById('productImage');
const productName = document.getElementById('productName');
const productLink = document.getElementById('productLink');
const productCheck = document.getElementById('productCheck');
const closeDetails = document.getElementById('closeDetails');

let selectedProductId = null;

// Load Products
async function loadProducts() {
    const querySnapshot = await getDocs(collection(db, "wishlist"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `<img src="${data.image}" alt="${data.name}">`;
        productItem.addEventListener('click', () => showProductDetails(doc.id, data));
        productGrid.appendChild(productItem);
    });
}

// Show Product Details
function showProductDetails(id, data) {
    selectedProductId = id;
    productDetails.style.display = 'block';
    productImage.src = data.image;
    productName.textContent = data.name;
    productLink.href = data.link;
    productCheck.checked = data.isChecked;
    productGrid.classList.add('blur');
}

// Close Details
closeDetails.addEventListener('click', () => {
    productDetails.style.display = 'none';
    productGrid.classList.remove('blur');
    selectedProductId = null;
});

// Update Checkbox
productCheck.addEventListener('change', async () => {
    if (selectedProductId) {
        const productRef = doc(db, "wishlist", selectedProductId);
        await updateDoc(productRef, { isChecked: productCheck.checked });
    }
});

// Initial Load
loadProducts();
