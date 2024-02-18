function showCart() {
    document.getElementById("products-id").style.display = "block";
}

function closeBtn() {
    document.getElementById("products-id").style.display = "none";
}

let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total');
let amountProduct = document.querySelector('.count-product');

let buyThings = [];
let totalCard = 0;
let countProduct = 0;

loadEventListeners();

function loadEventListeners() {
    document.body.addEventListener('click', addProduct);
    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e) {
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement.parentElement;
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');
        const index = buyThings.findIndex(product => product.id === deleteId);
        if (index !== -1) {
            if (buyThings[index].amount > 1) {
                buyThings[index].amount--;
            } else {
                buyThings.splice(index, 1);
                countProduct--;
            }
            updateCart();
        }
    }
}

function readTheContent(product) {
    const priceElement = product.querySelector('.price');
    const priceText = priceElement.textContent.trim();
    const price = parseFloat(priceText.slice(8));

    const infoProduct = {
        image: product.querySelector('img').src,
        title: product.querySelector('.title').textContent,
        price: price,
        id: product.querySelector('.btn').getAttribute('data-id'),
        amount: 1
    };

    totalCard += infoProduct.price;

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        buyThings.forEach(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
            }
        });
    } else {
        buyThings.push(infoProduct);
        countProduct++;
    }

    updateCart();
}

function updateCart() {
    containerBuyCart.innerHTML = '';
    totalCard = 0;
    buyThings.forEach(product => {
        const { image, title, price, amount, id } = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price.toFixed(2)}$</h5>
                <h6>Cantidad: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
        containerBuyCart.appendChild(row);
        totalCard += price * amount;
    });

    priceTotal.textContent = totalCard.toFixed(2);
    amountProduct.textContent = countProduct;
}

function clearCart() {
    document.querySelector('.card-items').innerHTML = '';
    document.querySelector('.price-total').textContent = '0';
    document.querySelector('.count-product').textContent = '0';

    var purchaseDetailsDiv = document.getElementById("purchase-details");
    purchaseDetailsDiv.innerHTML = "";

    buyThings = [];
    totalCard = 0;
    countProduct = 0;
}

function closePaymentModal() {
    var modal = document.getElementById("paymentModal");
    modal.style.display = "none";
    showPurchaseDetails()
}

document.querySelector("#paymentModal .close").addEventListener("click", function () {
    closePaymentModal();
});

function openPaymentModal() {
    if (buyThings.length > 0) {
        var modal = document.getElementById("paymentModal");
        modal.style.display = "block";
        showPurchaseDetails();
    }
}

function showPurchaseDetails() {
    var purchaseDetailsDiv = document.getElementById("purchase-details");
    var cartProducts = buyThings;
    purchaseDetailsDiv.innerHTML = "";
    var ul = document.createElement("ul");

    cartProducts.forEach(function (product) {
        var li = document.createElement("li");
        li.classList.add("product-item");

        var image = document.createElement("img");
        image.src = product.image;
        image.alt = product.title;
        image.classList.add("product-image");

        var productInfo = document.createElement("div");
        productInfo.classList.add("product-info");

        var productTitle = document.createElement("p");
        productTitle.classList.add("product-title");
        productTitle.textContent = `${product.title} - Precio: ${product.price * product.amount}$`;

        var quantityControls = document.createElement("div");
        quantityControls.classList.add("quantity-controls");

        var decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.addEventListener("click", function () {
            decreaseQuantity(product.id);
        });

        var quantityInput = document.createElement("input");
        quantityInput.type = "text";
        quantityInput.value = product.amount;
        quantityInput.classList.add("quantity-input");
        quantityInput.disabled = true;
        quantityInput.readOnly = true;


        var increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.addEventListener("click", function () {
            increaseQuantity(product.id);
        });

        quantityControls.appendChild(decreaseButton);
        quantityControls.appendChild(quantityInput);
        quantityControls.appendChild(increaseButton);

        var removeButton = document.createElement("button");
        removeButton.classList.add("remove-product");
        removeButton.textContent = "Eliminar";
        removeButton.dataset.id = product.id;

        productInfo.appendChild(productTitle);
        productInfo.appendChild(quantityControls);
        productInfo.appendChild(removeButton);

        li.appendChild(image);
        li.appendChild(productInfo);

        ul.appendChild(li);
    });

    purchaseDetailsDiv.appendChild(ul);

    var removeButtons = document.querySelectorAll('.remove-product');
    removeButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            var productId = e.target.getAttribute('data-id');
            removeProduct(productId);
        });
    });
}

function removeProduct(productId) {
    const index = buyThings.findIndex(product => product.id === productId);
    if (index !== -1) {
        const product = buyThings[index];
        totalCard -= product.price * product.amount;
        countProduct -= product.amount;
        buyThings.splice(index, 1);
        updateCart();
        showPurchaseDetails()
    }
}

function emptyCart() {
    if (buyThings.length > 0) {
        buyThings = [];
        updateCart();
        showPurchaseDetails();
    }
}

function increaseQuantity(productId) {
    const product = buyThings.find(item => item.id === productId);
    if (product) {
        product.amount++;
        updateCart();
        showPurchaseDetails()
    }
}

function decreaseQuantity(productId) {
    const product = buyThings.find(item => item.id === productId);
    if (product && product.amount > 1) {
        product.amount--;
        updateCart();
        showPurchaseDetails()
    } else if (product && product.amount === 1) {

        removeProduct(productId);
        showPurchaseDetails()
    }
}

document.getElementById('empty-cart').addEventListener('click', emptyCart);
cartProducts.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `
        <div class="product-item">
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <p class="product-title">${product.title}</p>
                <div class="quantity-controls">
                    <span class="quantity-label">Cantidad:</span>
                    <button onclick="decreaseQuantity('${product.id}')">-</button>
                    <input class="quantity-input">${product.amount}</input>
                    <button onclick="increaseQuantity('${product.id}')">+</button>
                </div>
                <p>Precio: ${product.price * product.amount}$</p>
                <button class="remove-product" data-id="${product.id}">Eliminar</button>
            </div>
        </div>
    `;
    ul.appendChild(li);
});