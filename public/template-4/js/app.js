"use strict";

/* ==========================================================
   MIC HIZARU STAY
   APPLICATION LOGIC
========================================================== */


/* ==========================================================
   DOM HELPERS
========================================================== */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* ==========================================================
   ELEMENT REFERENCES
========================================================== */

const siteHeader =
    $("#siteHeader");

const mobileMenuButton =
    $("#mobileMenuButton");

const mobileDrawer =
    $("#mobileDrawer");

const drawerOverlay =
    $("#drawerOverlay");

const drawerClose =
    $("#drawerClose");

const mobileNavLinks =
    $$(".mobile-nav a");


const languageToggle =
    $("#languageToggle");

const languageMenu =
    $("#languageMenu");


const languageButtons =
    $$("#languageMenu button");


const searchForm =
    $("#searchForm");

const searchFields =
    $("#searchFields");

const mobileSearchTrigger =
    $("#mobileSearchTrigger");


const destinationInput =
    $("#destination");

const checkInInput =
    $("#checkIn");

const checkOutInput =
    $("#checkOut");

const guestsInput =
    $("#guests");


const destinationError =
    $("#destinationError");

const checkInError =
    $("#checkInError");

const checkOutError =
    $("#checkOutError");

const guestsError =
    $("#guestsError");


const searchStatus =
    $("#searchStatus");


const filterButtons =
    $$(".filter-pill");


const wishlistButtons =
    $$("[data-wishlist]");


const testimonialSlider =
    $("#testimonialSlider");

const testimonialPrev =
    $("#testimonialPrev");

const testimonialNext =
    $("#testimonialNext");


const newsletterForm =
    $("#newsletterForm");

const newsletterEmail =
    $("#newsletterEmail");

const newsletterStatus =
    $("#newsletterStatus");


const currencySelect =
    $("#currencySelect");


const resultModal =
    $("#resultModal");

const resultModalOverlay =
    $("#resultModalOverlay");

const resultModalClose =
    $("#resultModalClose");

const resultSummary =
    $("#resultSummary");

const resultViewStays =
    $("#resultViewStays");


const toast =
    $("#toast");


/* ==========================================================
   APPLICATION STATE
========================================================== */

const state = {

    language:
        localStorage.getItem(
            "michizaruLanguage"
        ) || "ID",

    currency:
        localStorage.getItem(
            "michizaruCurrency"
        ) || "IDR",

    searchData:
        null

};


/* ==========================================================
   UTILITY: TODAY
========================================================== */

function getTodayString() {

    const today =
        new Date();


    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;

}


/* ==========================================================
   UTILITY: DATE DISPLAY
========================================================== */

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }


    const date =
        new Date(
            `${dateString}T00:00:00`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "-";
    }


    return new Intl.DateTimeFormat(
        state.language === "EN"
            ? "en-US"
            : "id-ID",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    ).format(date);

}


/* ==========================================================
   UTILITY: DATE DIFFERENCE
========================================================== */

function getNights(
    checkIn,
    checkOut
) {

    const start =
        new Date(
            `${checkIn}T00:00:00`
        );

    const end =
        new Date(
            `${checkOut}T00:00:00`
        );


    const milliseconds =
        end.getTime() -
        start.getTime();


    return Math.round(
        milliseconds /
        (1000 * 60 * 60 * 24)
    );

}


/* ==========================================================
   INITIAL DATE CONSTRAINTS
========================================================== */

function initializeDateInputs() {

    const today =
        getTodayString();


    checkInInput.min =
        today;

    checkOutInput.min =
        today;

}


/* ==========================================================
   CHECK-IN CHANGE
========================================================== */

checkInInput.addEventListener(
    "change",
    () => {

        const checkIn =
            checkInInput.value;


        clearFieldError(
            checkInInput,
            checkInError
        );


        if (!checkIn) {
            return;
        }


        checkOutInput.min =
            checkIn;


        if (
            checkOutInput.value &&
            checkOutInput.value <= checkIn
        ) {

            checkOutInput.value =
                "";

            setFieldError(
                checkOutInput,
                checkOutError,
                "Check-out harus setelah check-in."
            );

        }

    }
);


/* ==========================================================
   VALIDATION
========================================================== */

function clearFieldError(
    input,
    errorElement
) {

    input.classList.remove(
        "input-error"
    );

    errorElement.textContent =
        "";

}


function setFieldError(
    input,
    errorElement,
    message
) {

    input.classList.add(
        "input-error"
    );

    errorElement.textContent =
        message;

}


function validateSearchForm() {

    let isValid =
        true;


    /* Destination */

    const destination =
        destinationInput.value
            .trim();


    clearFieldError(
        destinationInput,
        destinationError
    );


    if (!destination) {

        setFieldError(
            destinationInput,
            destinationError,
            "Masukkan destinasi."
        );

        isValid = false;

    } else if (
        destination.length < 2
    ) {

        setFieldError(
            destinationInput,
            destinationError,
            "Destinasi terlalu pendek."
        );

        isValid = false;

    }


    /* Check-in */

    const checkIn =
        checkInInput.value;


    clearFieldError(
        checkInInput,
        checkInError
    );


    if (!checkIn) {

        setFieldError(
            checkInInput,
            checkInError,
            "Pilih tanggal check-in."
        );

        isValid = false;

    }


    /* Check-out */

    const checkOut =
        checkOutInput.value;


    clearFieldError(
        checkOutInput,
        checkOutError
    );


    if (!checkOut) {

        setFieldError(
            checkOutInput,
            checkOutError,
            "Pilih tanggal check-out."
        );

        isValid = false;

    }


    if (
        checkIn &&
        checkOut
    ) {

        const nights =
            getNights(
                checkIn,
                checkOut
            );


        if (nights <= 0) {

            setFieldError(
                checkOutInput,
                checkOutError,
                "Check-out harus setelah check-in."
            );

            isValid = false;

        }

    }


    /* Guests */

    const guests =
        guestsInput.value;


    clearFieldError(
        guestsInput,
        guestsError
    );


    if (!guests) {

        setFieldError(
            guestsInput,
            guestsError,
            "Pilih jumlah tamu."
        );

        isValid = false;

    }


    return isValid;

}


/* ==========================================================
   SEARCH SUBMIT
========================================================== */

searchForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        searchStatus.textContent =
            "";


        const isValid =
            validateSearchForm();


        if (!isValid) {

            searchStatus.textContent =
                "Lengkapi data pencarian terlebih dahulu.";

            return;

        }


        const data = {

            destination:
                destinationInput.value
                    .trim(),

            checkIn:
                checkInInput.value,

            checkOut:
                checkOutInput.value,

            guests:
                Number(
                    guestsInput.value
                )

        };


        state.searchData =
            data;


        showSearchResult(
            data
        );


        /* Reset status */

        searchStatus.textContent =
            "";

    }
);


/* ==========================================================
   SHOW SEARCH RESULT
========================================================== */

function showSearchResult(
    data
) {

    const nights =
        getNights(
            data.checkIn,
            data.checkOut
        );


    resultSummary.innerHTML = `

        <div class="summary-row">
            <span>Destination</span>
            <span>
                ${escapeHtml(data.destination)}
            </span>
        </div>

        <div class="summary-row">
            <span>Stay</span>
            <span>
                ${formatDate(data.checkIn)}
                —
                ${formatDate(data.checkOut)}
            </span>
        </div>

        <div class="summary-row">
            <span>Nights</span>
            <span>
                ${nights}
            </span>
        </div>

        <div class="summary-row">
            <span>Guests</span>
            <span>
                ${data.guests}
                ${data.guests === 1 ? "Guest" : "Guests"}
            </span>
        </div>

    `;


    openResultModal();

}


/* ==========================================================
   ESCAPE HTML
========================================================== */

function escapeHtml(
    value
) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        String(value);


    return div.innerHTML;

}


/* ==========================================================
   RESULT MODAL
========================================================== */

function openResultModal() {

    resultModal.classList.add(
        "active"
    );

    resultModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "no-scroll"
    );


    resultModalClose.focus();

}


function closeResultModal() {

    resultModal.classList.remove(
        "active"
    );

    resultModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


resultModalClose.addEventListener(
    "click",
    closeResultModal
);

resultModalOverlay.addEventListener(
    "click",
    closeResultModal
);


/* CTA dari modal */

resultViewStays.addEventListener(
    "click",
    () => {

        closeResultModal();

        setTimeout(
            () => {

                const stays =
                    document.getElementById(
                        "stays"
                    );

                stays.scrollIntoView({
                    behavior:
                        "smooth"
                });

            },
            30
        );

    }
);


/* ==========================================================
   MOBILE SEARCH ACCORDION
========================================================== */

mobileSearchTrigger.addEventListener(
    "click",
    () => {

        const isOpen =
            searchFields.classList.toggle(
                "active"
            );


        mobileSearchTrigger.classList.toggle(
            "active",
            isOpen
        );


        mobileSearchTrigger.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }
);


/* ==========================================================
   MOBILE DRAWER
========================================================== */

function openMobileDrawer() {

    mobileDrawer.classList.add(
        "active"
    );

    drawerOverlay.classList.add(
        "active"
    );

    mobileDrawer.setAttribute(
        "aria-hidden",
        "false"
    );

    mobileMenuButton.classList.add(
        "active"
    );

    mobileMenuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    document.body.classList.add(
        "no-scroll"
    );

}


function closeMobileDrawer() {

    mobileDrawer.classList.remove(
        "active"
    );

    drawerOverlay.classList.remove(
        "active"
    );

    mobileDrawer.setAttribute(
        "aria-hidden",
        "true"
    );

    mobileMenuButton.classList.remove(
        "active"
    );

    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


mobileMenuButton.addEventListener(
    "click",
    () => {

        const isOpen =
            mobileDrawer.classList.contains(
                "active"
            );


        if (isOpen) {
            closeMobileDrawer();
        } else {
            openMobileDrawer();
        }

    }
);


drawerClose.addEventListener(
    "click",
    closeMobileDrawer
);


drawerOverlay.addEventListener(
    "click",
    closeMobileDrawer
);


mobileNavLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            closeMobileDrawer
        );

    }
);


/* ==========================================================
   LANGUAGE DROPDOWN
========================================================== */

function closeLanguageMenu() {

    languageMenu.classList.remove(
        "active"
    );

    languageToggle.classList.remove(
        "active"
    );

    languageToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


languageToggle.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();


        const isOpen =
            languageMenu.classList.toggle(
                "active"
            );


        languageToggle.classList.toggle(
            "active",
            isOpen
        );

        languageToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }
);


languageButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const language =
                    button.dataset.language;


                setLanguage(
                    language
                );


                closeLanguageMenu();

            }
        );

    }
);


/* ==========================================================
   SET LANGUAGE
========================================================== */

function setLanguage(
    language
) {

    const normalized =
        language === "EN"
            ? "EN"
            : "ID";


    state.language =
        normalized;


    localStorage.setItem(
        "michizaruLanguage",
        normalized
    );


    languageToggle.childNodes[0].nodeValue =
        `${normalized} `;


    $$
        (
            "[data-language-mobile]"
        )
        .forEach(
            (button) => {

                button.classList.toggle(
                    "active",
                    button.dataset.languageMobile
                        === normalized
                );

            }
        );


    showToast(
        normalized === "EN"
            ? "Language set to English."
            : "Bahasa Indonesia dipilih."
    );

}


/* Mobile language */

$$(
    "[data-language-mobile]"
).forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                setLanguage(
                    button.dataset.languageMobile
                );

            }
        );

    }
);


/* ==========================================================
   CLOSE DROPDOWNS / MODALS ON ESCAPE
========================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        closeLanguageMenu();
        closeMobileDrawer();
        closeResultModal();

    }
);


/* ==========================================================
   CLICK OUTSIDE LANGUAGE DROPDOWN
========================================================== */

document.addEventListener(
    "click",
    (event) => {

        const dropdown =
            $(".language-dropdown");


        if (
            dropdown &&
            !dropdown.contains(
                event.target
            )
        ) {

            closeLanguageMenu();

        }

    }
);


/* ==========================================================
   WISHLIST
========================================================== */

wishlistButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            (event) => {

                /*
                    Prevent click from propagating
                    to any future property-card
                    handler.
                */

                event.stopPropagation();


                const isActive =
                    button.classList.toggle(
                        "active"
                    );


                button.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );


                button.textContent =
                    isActive
                        ? "♥"
                        : "♡";


                showToast(
                    isActive
                        ? "Added to wishlist."
                        : "Removed from wishlist."
                );

            }
        );

    }
);


/* ==========================================================
   QUICK FILTERS
========================================================== */

filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter;


                filterButtons.forEach(
                    (item) => {

                        item.classList.toggle(
                            "active",
                            item === button
                        );

                    }
                );


                /*
                    Demo behavior:
                    Scroll to property collection and
                    show feedback. In production this can
                    be connected to an actual filtering API.
                */

                const properties =
                    $$("[data-property]");


                properties.forEach(
                    (property) => {

                        const type =
                            $(
                                ".property-type",
                                property
                            )
                            ?.textContent
                            .trim();


                        /*
                            Temporarily highlight matches.
                        */

                        const matched =
                            type === filter;


                        property.style.opacity =
                            matched
                                ? "1"
                                : "0.42";

                    }
                );


                const staysSection =
                    document.getElementById(
                        "stays"
                    );


                staysSection.scrollIntoView({
                    behavior:
                        "smooth",
                    block:
                        "start"
                });


                showToast(
                    `Showing ${filter} stays.`
                );

            }
        );

    }
);


/* ==========================================================
   RESET FILTERS WHEN USER SCROLLS BACK
========================================================== */

let filterResetTimer;


window.addEventListener(
    "scroll",
    () => {

        clearTimeout(
            filterResetTimer
        );


        filterResetTimer =
            setTimeout(
                () => {

                    /*
                        We intentionally don't reset opacity
                        on every scroll event, only after user
                        has stopped scrolling.
                    */

                },
                200
            );

    },
    {
        passive: true
    }
);


/* ==========================================================
   TESTIMONIAL SLIDER
========================================================== */

function getTestimonialScrollAmount() {

    const firstCard =
        $(".testimonial-card");


    if (!firstCard) {
        return 300;
    }


    return (
        firstCard.offsetWidth +
        14
    );

}


testimonialNext.addEventListener(
    "click",
    () => {

        testimonialSlider.scrollBy({

            left:
                getTestimonialScrollAmount(),

            behavior:
                "smooth"

        });

    }
);


testimonialPrev.addEventListener(
    "click",
    () => {

        testimonialSlider.scrollBy({

            left:
                -getTestimonialScrollAmount(),

            behavior:
                "smooth"

        });

    }
);


/* ==========================================================
   NEWSLETTER
========================================================== */

newsletterForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const email =
            newsletterEmail.value.trim();


        newsletterStatus.textContent =
            "";


        if (!email) {

            newsletterStatus.textContent =
                "Please enter your email address.";

            return;

        }


        /*
            Basic email validation.
            More complex validation should happen
            server-side in production.
        */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(
                email
            )
        ) {

            newsletterStatus.textContent =
                "Please enter a valid email address.";

            return;

        }


        newsletterStatus.textContent =
            "Thank you. You're on the list.";

        newsletterEmail.value =
            "";

    }
);


/* ==========================================================
   CURRENCY SELECTOR
========================================================== */

currencySelect.value =
    state.currency;


currencySelect.addEventListener(
    "change",
    () => {

        const currency =
            currencySelect.value;


        state.currency =
            currency;


        localStorage.setItem(
            "michizaruCurrency",
            currency
        );


        showToast(
            `Currency changed to ${currency}.`
        );

    }
);


/* ==========================================================
   HEADER SCROLL STATE
========================================================== */

function updateHeaderState() {

    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 20
    );

}


window.addEventListener(
    "scroll",
    updateHeaderState,
    {
        passive:
            true
    }
);


updateHeaderState();


/* ==========================================================
   SMOOTH ANCHOR SCROLL
========================================================== */

$$(
    'a[href^="#"]'
).forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerOffset =
                    siteHeader.offsetHeight +
                    25;


                const targetTop =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerOffset;


                window.scrollTo({

                    top:
                        targetTop,

                    behavior:
                        "smooth"

                });

            }
        );

    }
);


/* ==========================================================
   TOAST
========================================================== */

let toastTimer;


function showToast(
    message
) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* ==========================================================
   INITIALIZE MOBILE LANGUAGE STATE
========================================================== */

function initializeLanguageState() {

    const currentLanguage =
        state.language;


    languageToggle.childNodes[0].nodeValue =
        `${currentLanguage} `;


    $$(
        "[data-language-mobile]"
    )
    .forEach(
        (button) => {

            button.classList.toggle(
                "active",
                button.dataset.languageMobile
                    === currentLanguage
            );

        }
    );

}


/* ==========================================================
   INITIALIZE
========================================================== */

function initializeApp() {

    initializeDateInputs();

    initializeLanguageState();

    currencySelect.value =
        state.currency;

    mobileDrawer.setAttribute(
        "aria-hidden",
        "true"
    );

    resultModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


initializeApp();
