"use strict";

/* ==========================================================
   PRODUCT DATABASE
========================================================== */

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 899000,
        rating: 4.8,
        reviews: 124,
        label: "HEADPHONES"
    },

    {
        id: 2,
        name: "Minimalist Watch",
        category: "Accessories",
        price: 649000,
        rating: 4.7,
        reviews: 96,
        label: "WATCH"
    },

    {
        id: 3,
        name: "Premium Sneakers",
        category: "Fashion",
        price: 1199000,
        rating: 4.9,
        reviews: 218,
        label: "SNEAKERS"
    },

    {
        id: 4,
        name: "Smart Desk Lamp",
        category: "Home",
        price: 449000,
        rating: 4.6,
        reviews: 75,
        label: "DESK LAMP"
    },

    {
        id: 5,
        name: "Classic Backpack",
        category: "Fashion",
        price: 729000,
        rating: 4.8,
        reviews: 131,
        label: "BACKPACK"
    },

    {
        id: 6,
        name: "Mechanical Keyboard",
        category: "Electronics",
        price: 1099000,
        rating: 4.9,
        reviews: 189,
        label: "KEYBOARD"
    },

    {
        id: 7,
        name: "Ceramic Vase Set",
        category: "Home",
        price: 389000,
        rating: 4.5,
        reviews: 64,
        label: "VASE SET"
    },

    {
        id: 8,
        name: "Leather Wallet",
        category: "Accessories",
        price: 349000,
        rating: 4.7,
        reviews: 112,
        label: "WALLET"
    },

    {
        id: 9,
        name: "Portable Speaker",
        category: "Electronics",
        price: 799000,
        rating: 4.8,
        reviews: 153,
        label: "SPEAKER"
    },

    {
        id: 10,
        name: "Oversized Hoodie",
        category: "Fashion",
        price: 549000,
        rating: 4.6,
        reviews: 87,
        label: "HOODIE"
    },

    {
        id: 11,
        name: "Aroma Diffuser",
        category: "Home",
        price: 299000,
        rating: 4.7,
        reviews: 102,
        label: "DIFFUSER"
    },

    {
        id: 12,
        name: "Premium Sunglasses",
        category: "Accessories",
        price: 579000,
        rating: 4.9,
        reviews: 145,
        label: "SUNGLASSES"
    }

];


/* ==========================================================
   APPLICATION STATE
========================================================== */

let cart = [];


/* ==========================================================
   DOM ELEMENTS
========================================================== */

const productGrid =
    document.getElementById("productGrid");

const emptyState =
    document.getElementById("emptyState");

const categoryFilter =
    document.getElementById("categoryFilter");

const sortFilter =
    document.getElementById("sortFilter");

const searchInput =
    document.getElementById("searchInput");

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const openCartButton =
    document.getElementById("openCart");

const closeCartButton =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartSubtotal =
    document.getElementById("cartSubtotal");

const cartTotal =
    document.getElementById("cartTotal");

const emptyCart =
    document.getElementById("emptyCart");

const cartFooter =
    document.getElementById("cartFooter");

const startShoppingButton =
    document.getElementById("startShopping");

const toast =
    document.getElementById("toast");

const hamburger =
    document.getElementById("hamburger");

const navMenu =
    document.getElementById("navMenu");

const newsletterForm =
    document.getElementById("newsletterForm");


/* ==========================================================
   FORMAT PRICE
========================================================== */

function formatPrice(price) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(price);

}


/* ==========================================================
   GENERATE STAR RATING
========================================================== */

function generateStars(rating) {

    const fullStars = Math.round(rating);

    return "★".repeat(fullStars);

}


/* ==========================================================
   RENDER PRODUCTS
========================================================== */

function renderProducts() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();

    const selectedCategory =
        categoryFilter.value;

    const selectedSort =
        sortFilter.value;


    // Filter products
    let filteredProducts =
        products.filter((product) => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            return (
                matchesSearch &&
                matchesCategory
            );

        });


    // Sort products
    switch (selectedSort) {

        case "low":

            filteredProducts.sort(
                (a, b) =>
                    a.price - b.price
            );

            break;


        case "high":

            filteredProducts.sort(
                (a, b) =>
                    b.price - a.price
            );

            break;


        case "rating":

            filteredProducts.sort(
                (a, b) =>
                    b.rating - a.rating
            );

            break;


        default:

            break;

    }


    // Empty state
    if (filteredProducts.length === 0) {

        productGrid.innerHTML = "";

        emptyState.classList.add("show");

        return;

    }

    emptyState.classList.remove("show");


    // Generate product cards
    productGrid.innerHTML =
        filteredProducts
            .map((product) => {

                return `

                    <article
                        class="product-card"
                        data-id="${product.id}"
                    >

                        <div class="product-image">

                            <button
                                class="wishlist"
                                type="button"
                                data-wishlist="${product.id}"
                                aria-label="Add to wishlist"
                            >
                                ♡
                            </button>

                            <div class="product-placeholder">
                                ${product.label}
                            </div>

                        </div>


                        <div class="product-info">

                            <div class="product-category">
                                ${product.category}
                            </div>

                            <h3 class="product-name">
                                ${product.name}
                            </h3>


                            <div class="product-rating">

                                <span class="stars">
                                    ${generateStars(product.rating)}
                                </span>

                                <span class="rating-number">
                                    ${product.rating}
                                    (${product.reviews})
                                </span>

                            </div>


                            <div class="product-bottom">

                                <span class="price">
                                    ${formatPrice(product.price)}
                                </span>

                                <button
                                    type="button"
                                    class="add-cart"
                                    data-add-cart="${product.id}"
                                >
                                    Add to Cart
                                </button>

                            </div>

                        </div>

                    </article>

                `;

            })
            .join("");

}


/* ==========================================================
   ADD PRODUCT TO CART
========================================================== */

function addToCart(productId) {

    const existingItem =
        cart.find(
            item =>
                item.id === productId
        );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        const product =
            products.find(
                item =>
                    item.id === productId
            );

        if (!product) {
            return;
        }

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    showToast("Product added to cart");

}


/* ==========================================================
   CHANGE QUANTITY
========================================================== */

function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            item =>
                item.id === productId
        );

    if (!item) {
        return;
    }


    item.quantity += change;


    // Remove if quantity reaches zero
    if (item.quantity <= 0) {

        cart =
            cart.filter(
                cartItem =>
                    cartItem.id !== productId
            );

    }


    updateCart();

}


/* ==========================================================
   REMOVE ITEM
========================================================== */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );

    updateCart();

    showToast("Product removed");

}


/* ==========================================================
   GET CART ITEM COUNT
========================================================== */

function getCartItemCount() {

    return cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

}


/* ==========================================================
   GET CART SUBTOTAL
========================================================== */

function getCartSubtotal() {

    return cart.reduce(
        (total, item) =>
            total +
            item.price *
            item.quantity,
        0
    );

}


/* ==========================================================
   RENDER CART
========================================================== */

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = "";

        emptyCart.style.display =
            "flex";

        cartFooter.style.display =
            "none";

        return;

    }


    emptyCart.style.display =
        "none";

    cartFooter.style.display =
        "block";


    cartItems.innerHTML =
        cart.map((item) => {

            return `

                <div
                    class="cart-item"
                    data-cart-id="${item.id}"
                >

                    <div class="cart-item-image">
                        ${item.label}
                    </div>


                    <div class="cart-item-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <span class="cart-item-price">
                            ${formatPrice(item.price)}
                        </span>


                        <div class="quantity-control">

                            <button
                                type="button"
                                data-action="decrease"
                                data-id="${item.id}"
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                type="button"
                                data-action="increase"
                                data-id="${item.id}"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="remove-item"
                        data-remove="${item.id}"
                        aria-label="Remove item"
                    >
                        ×
                    </button>

                </div>

            `;

        }).join("");

}


/* ==========================================================
   UPDATE CART UI
========================================================== */

function updateCart() {

    const itemCount =
        getCartItemCount();

    const subtotal =
        getCartSubtotal();


    // Badge
    cartCount.textContent =
        itemCount;


    // Totals
    cartSubtotal.textContent =
        formatPrice(subtotal);

    cartTotal.textContent =
        formatPrice(subtotal);


    // Cart items
    renderCart();


    // Save cart
    saveCart();

}


/* ==========================================================
   CART OPEN / CLOSE
========================================================== */

function openCart() {

    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


function closeCart() {

    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow =
        "";

}


/* ==========================================================
   TOAST
========================================================== */

let toastTimeout;


function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2000);

}


/* ==========================================================
   LOCAL STORAGE
========================================================== */

function saveCart() {

    localStorage.setItem(
        "modernShopCart",
        JSON.stringify(cart)
    );

}


function loadCart() {

    try {

        const savedCart =
            localStorage.getItem(
                "modernShopCart"
            );

        if (!savedCart) {
            return;
        }

        cart =
            JSON.parse(savedCart);

    } catch (error) {

        console.error(
            "Unable to load cart:",
            error
        );

        cart = [];

    }

}


/* ==========================================================
   EVENT DELEGATION - PRODUCTS
========================================================== */

productGrid.addEventListener(
    "click",
    function (event) {

        const addButton =
            event.target.closest(
                "[data-add-cart]"
            );

        const wishlistButton =
            event.target.closest(
                "[data-wishlist]"
            );


        // Add to cart
        if (addButton) {

            const productId =
                Number(
                    addButton.dataset.addCart
                );

            addToCart(productId);

            return;

        }


        // Wishlist
        if (wishlistButton) {

            wishlistButton.classList.toggle(
                "active"
            );

            const isActive =
                wishlistButton.classList.contains(
                    "active"
                );

            wishlistButton.textContent =
                isActive
                    ? "♥"
                    : "♡";

            showToast(
                isActive
                    ? "Added to wishlist"
                    : "Removed from wishlist"
            );

        }

    }
);


/* ==========================================================
   EVENT DELEGATION - CART
========================================================== */

cartItems.addEventListener(
    "click",
    function (event) {

        const actionButton =
            event.target.closest(
                "[data-action]"
            );

        const removeButton =
            event.target.closest(
                "[data-remove]"
            );


        // Increase / decrease
        if (actionButton) {

            const productId =
                Number(
                    actionButton.dataset.id
                );

            const action =
                actionButton.dataset.action;


            if (action === "increase") {

                changeQuantity(
                    productId,
                    1
                );

            }

            if (action === "decrease") {

                changeQuantity(
                    productId,
                    -1
                );

            }

            return;

        }


        // Remove
        if (removeButton) {

            const productId =
                Number(
                    removeButton.dataset.remove
                );

            removeFromCart(productId);

        }

    }
);


/* ==========================================================
   FILTER EVENTS
========================================================== */

categoryFilter.addEventListener(
    "change",
    renderProducts
);

sortFilter.addEventListener(
    "change",
    renderProducts
);


/* ==========================================================
   SEARCH
========================================================== */

searchInput.addEventListener(
    "input",
    renderProducts
);


/* ==========================================================
   CATEGORY CARD CLICK
========================================================== */

document
    .querySelectorAll(".category-card")
    .forEach((card) => {

        card.addEventListener(
            "click",
            function () {

                const category =
                    this.dataset.category;


                categoryFilter.value =
                    category;


                // Scroll to products
                document
                    .getElementById("shop")
                    .scrollIntoView({
                        behavior: "smooth"
                    });


                renderProducts();

            }
        );

    });


/* ==========================================================
   CART BUTTONS
========================================================== */

openCartButton.addEventListener(
    "click",
    openCart
);

closeCartButton.addEventListener(
    "click",
    closeCart
);

cartOverlay.addEventListener(
    "click",
    closeCart
);

startShoppingButton.addEventListener(
    "click",
    function () {

        closeCart();

        document
            .getElementById("shop")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* ==========================================================
   ESCAPE KEY CLOSE CART
========================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeCart();

            navMenu.classList.remove(
                "active"
            );

            hamburger.classList.remove(
                "active"
            );

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* ==========================================================
   MOBILE HAMBURGER
========================================================== */

hamburger.addEventListener(
    "click",
    function () {

        navMenu.classList.toggle(
            "active"
        );

        hamburger.classList.toggle(
            "active"
        );


        const isOpen =
            navMenu.classList.contains(
                "active"
            );


        hamburger.setAttribute(
            "aria-expanded",
            isOpen
        );

    }
);


/* ==========================================================
   CLOSE MOBILE MENU WHEN NAV LINK CLICKED
========================================================== */

document
    .querySelectorAll(".nav-link")
    .forEach((link) => {

        link.addEventListener(
            "click",
            function () {

                navMenu.classList.remove(
                    "active"
                );

                hamburger.classList.remove(
                    "active"
                );

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });


/* ==========================================================
   NEWSLETTER
========================================================== */

newsletterForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const email =
            document
                .getElementById(
                    "newsletterEmail"
                )
                .value
                .trim();


        if (!email) {
            return;
        }


        showToast(
            "Successfully subscribed!"
        );


        this.reset();

    }
);


/* ==========================================================
   CHECKOUT
========================================================== */

document
    .getElementById("checkoutButton")
    .addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                showToast(
                    "Your cart is empty"
                );

                return;

            }


            alert(
                "Checkout berhasil dimulai!\n\n" +
                "Total: " +
                formatPrice(
                    getCartSubtotal()
                )
            );

        }
    );


/* ==========================================================
   INITIALIZE APP
========================================================== */

function init() {

    loadCart();

    renderProducts();

    updateCart();

}


// Jalankan aplikasi
init();
