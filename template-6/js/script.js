"use strict";

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const siteHeader =
    document.getElementById("siteHeader");

const mobileToggle =
    document.getElementById("mobileToggle");

const mainNav =
    document.getElementById("mainNav");

const navLinks =
    document.querySelectorAll(".nav-link");

const faqItems =
    document.querySelectorAll(".faq-item");


/* ==========================================================
   MOBILE NAVIGATION
========================================================== */

/*
    Membuka / menutup hamburger menu
*/

function toggleMobileMenu() {

    const isOpen =
        mainNav.classList.toggle("active");

    mobileToggle.classList.toggle(
        "active",
        isOpen
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );

    mobileToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

}


/* Event listener hamburger */

mobileToggle.addEventListener(
    "click",
    toggleMobileMenu
);


/* ==========================================================
   CLOSE MOBILE MENU
========================================================== */

/*
    Ketika user memilih link navigasi,
    mobile menu akan otomatis tertutup.
*/

navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            mainNav.classList.remove(
                "active"
            );

            mobileToggle.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "menu-open"
            );

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );

});


/* ==========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================================== */

document.addEventListener(
    "click",
    (event) => {

        const clickedInsideNav =
            mainNav.contains(event.target);

        const clickedToggle =
            mobileToggle.contains(event.target);


        if (
            !clickedInsideNav &&
            !clickedToggle
        ) {

            mainNav.classList.remove(
                "active"
            );

            mobileToggle.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "menu-open"
            );

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* ==========================================================
   ESC KEY
========================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            mainNav.classList.remove(
                "active"
            );

            mobileToggle.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "menu-open"
            );

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* ==========================================================
   FAQ ACCORDION
========================================================== */

/*
    Hanya satu FAQ yang dibuka
    pada satu waktu.
*/

faqItems.forEach((item) => {

    const question =
        item.querySelector(
            ".faq-question"
        );


    question.addEventListener(
        "click",
        () => {

            const isCurrentlyActive =
                item.classList.contains(
                    "active"
                );


            /* Tutup semua FAQ */

            faqItems.forEach(
                (otherItem) => {

                    otherItem.classList.remove(
                        "active"
                    );

                    const otherQuestion =
                        otherItem.querySelector(
                            ".faq-question"
                        );

                    otherQuestion.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );


            /*
                Jika item sebelumnya tertutup,
                maka buka item tersebut.
            */

            if (!isCurrentlyActive) {

                item.classList.add(
                    "active"
                );

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }
    );

});


/* ==========================================================
   SMOOTH SCROLLING
========================================================== */

/*
    Karena browser sudah mendukung CSS scroll-behavior,
    fungsi ini menjadi fallback / enhancement.
*/

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");


            /*
                Abaikan link "#" kosong.
            */

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


            const headerHeight =
                siteHeader.offsetHeight;


            const targetPosition =
                target.getBoundingClientRect().top
                +
                window.scrollY
                -
                headerHeight
                -
                10;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});


/* ==========================================================
   HEADER SCROLL STATE
========================================================== */

/*
    Header akan mendapatkan shadow
    ketika halaman sudah discroll.
*/

function updateHeader() {

    if (
        window.scrollY > 15
    ) {

        siteHeader.classList.add(
            "scrolled"
        );

    } else {

        siteHeader.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


/* Jalankan sekali saat load */

updateHeader();


/* ==========================================================
   ACTIVE NAV LINK
========================================================== */

/*
    Menandai menu berdasarkan section
    yang sedang terlihat.
*/

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    const currentId =
                        entry.target.id;


                    navLinks.forEach(
                        (link) => {

                            const href =
                                link.getAttribute(
                                    "href"
                                );


                            link.classList.toggle(
                                "active",
                                href ===
                                `#${currentId}`
                            );

                        }
                    );

                }
            );

        },
        {
            rootMargin:
                "-35% 0px -55% 0px",

            threshold:
                0
        }
    );


sections.forEach(
    (section) => {

        sectionObserver.observe(
            section
        );

    }
);


/* ==========================================================
   PREVENT DEMO BUTTONS FROM JUMPING
========================================================== */

/*
    Untuk demo, link # kosong tidak melakukan
    apa-apa selain tetap terlihat seperti CTA.
*/

document.querySelectorAll(
    'a[href="#"]'
).forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

            }
        );

    }
);


/* ==========================================================
   INITIAL STATE
========================================================== */

mobileToggle.setAttribute(
    "aria-expanded",
    "false"
);
