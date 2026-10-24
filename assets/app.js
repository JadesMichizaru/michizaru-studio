{
                "use strict";

                // Inisialisasi Animate On Scroll (AOS)
                AOS.init({
                    once: true,
                    duration: 700,
                    easing: "ease-out-cubic",
                });

                const $ = (selector, root = document) =>
                    root.querySelector(selector);
                const $$ = (selector, root = document) =>
                    Array.from(root.querySelectorAll(selector));

                // Nomor WhatsApp Tujuan (Silakan ganti dengan nomor Anda)
                const WHATSAPP_NUMBER = "6281234567890";

                // Navigasi Mobile (Smooth Slide & Fade Animation)
                const menuToggle = $("#menu-toggle");
                const mobileMenu = $("#mobile-menu");
                const menuOpenIcon = $("#menu-open-icon");
                const menuCloseIcon = $("#menu-close-icon");

                function setMobileMenu(open) {
                    if (open) {
                        mobileMenu.classList.add("is-open");
                    } else {
                        mobileMenu.classList.remove("is-open");
                    }

                    menuToggle.setAttribute("aria-expanded", String(open));
                    menuToggle.setAttribute(
                        "aria-label",
                        open ? "Tutup menu navigasi" : "Buka menu navigasi",
                    );

                    menuOpenIcon.classList.toggle("hidden", open);
                    menuCloseIcon.classList.toggle("hidden", !open);
                }

                menuToggle.addEventListener("click", () => {
                    const isOpen = mobileMenu.classList.contains("is-open");
                    setMobileMenu(!isOpen);
                });

                $$(".mobile-link", mobileMenu).forEach((link) =>
                    link.addEventListener("click", () => setMobileMenu(false)),
                );

                window.addEventListener("resize", () => {
                    if (window.innerWidth >= 768) setMobileMenu(false);
                });

                // Modal Diskusi
                const modal = $("#inquiry-modal");
                const closeModalButton = $("#close-modal");
                const inquiryForm = $("#inquiry-form");
                const formError = $("#form-error");
                let previousFocus = null;

                function openModal() {
                    previousFocus = document.activeElement;
                    modal.classList.remove("hidden");
                    modal.classList.add("flex");
                    document.body.classList.add("overflow-hidden");
                    setMobileMenu(false);
                    window.requestAnimationFrame(() => $("#name").focus());
                }

                function closeModal() {
                    modal.classList.add("hidden");
                    modal.classList.remove("flex");
                    document.body.classList.remove("overflow-hidden");
                    formError.classList.add("hidden");
                    if (
                        previousFocus &&
                        typeof previousFocus.focus === "function"
                    )
                        previousFocus.focus();
                }

                $$("[data-open-inquiry]").forEach((button) =>
                    button.addEventListener("click", openModal),
                );
                closeModalButton.addEventListener("click", closeModal);
                modal.addEventListener("click", (event) => {
                    if (event.target === modal) closeModal();
                });
                document.addEventListener("keydown", (event) => {
                    if (
                        event.key === "Escape" &&
                        !modal.classList.contains("hidden")
                    )
                        closeModal();
                });

                // Formulir Diteruskan ke WhatsApp API
                inquiryForm.addEventListener("submit", (event) => {
                    event.preventDefault();
                    formError.classList.add("hidden");

                    if (!inquiryForm.checkValidity()) {
                        inquiryForm.reportValidity();
                        return;
                    }

                    const data = new FormData(inquiryForm);
                    const name = String(data.get("name") || "").trim();
                    const contact = String(data.get("contact") || "").trim();
                    const service = String(data.get("service") || "").trim();
                    const budget = String(
                        data.get("budget") || "Belum ditentukan",
                    ).trim();
                    const description = String(
                        data.get("description") || "",
                    ).trim();

                    if (
                        name.length < 1 ||
                        contact.length < 3 ||
                        description.length < 10
                    ) {
                        formError.textContent =
                            "Mohon periksa kembali nama, kontak, dan deskripsi project Anda.";
                        formError.classList.remove("hidden");
                        return;
                    }

                    const messageText =
                        `*HALO MICHIZARU STUDIO*\n` +
                        `Saya ingin berkonsultasi mengenai rencana project berikut:\n\n` +
                        `• *Nama Lengkap:* ${name}\n` +
                        `• *Kontak (Email/WA):* ${contact}\n` +
                        `• *Jenis Layanan:* ${service}\n` +
                        `• *Estimasi Budget:* ${budget}\n\n` +
                        `*Deskripsi Project:*\n${description}`;

                    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
                    window.open(waUrl, "_blank");
                });

                // Filter Portofolio
                const filterButtons = $$(".filter-btn");
                const portfolioCards = $$(".portfolio-card");
                filterButtons.forEach((button) => {
                    button.addEventListener("click", () => {
                        const filter = button.dataset.filter;
                        filterButtons.forEach((item) => {
                            const active = item === button;
                            item.setAttribute("aria-pressed", String(active));
                        });
                        portfolioCards.forEach((card) => {
                            card.classList.toggle(
                                "hidden",
                                filter !== "all" &&
                                    card.dataset.category !== filter,
                            );
                        });
                    });
                });

                // Pratinjau Tampilan Ukuran Layar
                const preview = $("#responsive-preview");
                const breakpointLabel = $("#breakpoint-label");
                const breakpointSizes = {
                    mobile: { width: "230px", label: "Tampilan HP (375px)" },
                    tablet: {
                        width: "310px",
                        label: "Tampilan Tablet (768px)",
                    },
                    desktop: {
                        width: "100%",
                        maxWidth: "520px",
                        label: "Tampilan Laptop/Desktop",
                    },
                };
                $$(".breakpoint-btn").forEach((button) => {
                    button.addEventListener("click", () => {
                        const key = button.dataset.breakpoint;
                        const config = breakpointSizes[key];
                        preview.style.width = config.width;
                        preview.style.maxWidth =
                            config.maxWidth || config.width;
                        preview.dataset.size = key;
                        breakpointLabel.textContent = config.label;
                        $$(".breakpoint-btn").forEach((item) => {
                            const active = item === button;
                            item.setAttribute("aria-pressed", String(active));
                            item.classList.toggle("bg-ink", active);
                            item.classList.toggle("text-white", active);
                            item.classList.toggle("text-slate-500", !active);
                        });
                    });
                });

                // Logika Chatbot Floating
                const toggleChatbot = $("#toggle-chatbot");
                const closeChatbot = $("#close-chatbot");
                const chatbotWindow = $("#chatbot-window");
                const chatMessages = $("#chat-messages");

                toggleChatbot.addEventListener("click", () => {
                    chatbotWindow.classList.toggle("hidden");
                });

                closeChatbot.addEventListener("click", () => {
                    chatbotWindow.classList.add("hidden");
                });

                $$(".chat-quick-option").forEach((button) => {
                    button.addEventListener("click", () => {
                        const question = button.getAttribute("data-reply");

                        // Tampilkan balasan pengguna
                        const userMsg = document.createElement("div");
                        userMsg.className =
                            "bg-indigo-600 text-white p-3 rounded-xl ml-auto max-w-[85%] text-xs shadow-sm";
                        userMsg.textContent = question;
                        chatMessages.appendChild(userMsg);

                        // Berikan respon otomatis
                        setTimeout(() => {
                            const botMsg = document.createElement("div");
                            botMsg.className =
                                "bg-white p-3 rounded-xl border border-slate-200 text-slate-700 shadow-sm max-w-[85%] text-xs";

                            if (question.includes("biaya")) {
                                botMsg.textContent =
                                    "Estimasi biaya bergantung pada skala dan kompleksitas sistem. Untuk pembuatan landing page/website company profile mulai dari Rp 3-5 jt, sedangkan sistem kustom menyesuaikan spesifikasi kebutuhan.";
                            } else if (question.includes("lama")) {
                                botMsg.textContent =
                                    "Pengerjaan website standar berkisar 1-2 minggu. Untuk sistem kustom atau portal kompleks berkisar antara 3-6 minggu.";
                            } else {
                                botMsg.textContent =
                                    "Tentu, Anda akan kami alihkan langsung ke WhatsApp untuk diskusi lebih detail.";
                                setTimeout(() => {
                                    const text = encodeURIComponent(
                                        "Halo Tim Michizaru, saya ingin berkonsultasi mengenai pembuatan website/sistem.",
                                    );
                                    window.open(
                                        `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
                                        "_blank",
                                    );
                                }, 1000);
                            }

                            chatMessages.appendChild(botMsg);
                            chatMessages.scrollTop = chatMessages.scrollHeight;
                        }, 600);

                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    });
                });

                // Tahun Footer Otomatis
                $("#current-year").textContent = String(
                    new Date().getFullYear(),
                );
}
