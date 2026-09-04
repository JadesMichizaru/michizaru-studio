// --- 1. COUNTER ANIMATION ---
        const counters = document.querySelectorAll('.counter');
        const counterSection = document.getElementById('counter-section');
        let started = false;

        function startCounter() {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const increment = target / 90; // Kecepatan hitung

                const updateCount = () => {
                    const count = +counter.innerText;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }

        // Jalankan counter saat user scroll sampai ke bagian About
        window.addEventListener('scroll', () => {
            const rect = counterSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && !started) {
                startCounter();
                started = true;
            }
        });

// 1. Inisialisasi AOS (Animasi saat scroll)
AOS.init({ once: true, offset: 50, duration: 800 });

// 2. Hamburger Menu untuk Mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => { navLinks.classList.toggle('active'); });

// 3. Toggle Tampilan AI Chatbot
const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.getElementById('chat-box');
const closeChat = document.getElementById('close-chat');

chatToggle.addEventListener('click', () => {
    chatBox.classList.remove('hidden');
    chatToggle.style.display = 'none';
});
closeChat.addEventListener('click', () => {
    chatBox.classList.add('hidden');
    chatToggle.style.display = 'block';
});

// 4. Logika AI Chatbot & Security Filter
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input-field');
const chatSendBtn = document.getElementById('chat-send-btn');

// 1. Pola Deteksi Prompt Injection
const injectionPatterns = [
    /ignore previous/i, /system prompt/i, /bypass/i, /act as/i, /forget all/i,
    /jailbreak/i, /override/i, /dan mode/i
];

// 2. Filter Badwords
const badWords = ["bodoh", "tolol", "jelek", "anjing", "bangsat"];

function sanitizeAndCheck(input) {
    const trimmedInput = input.trim();

    // A. Cek Prompt Injection
    for (let pattern of injectionPatterns) {
        if (pattern.test(trimmedInput)) {
            return {
                isValid: false,
                message: "⚠️ Peringatan: Input ditolak karena terdeteksi upaya manipulasi prompt."
            };
        }
    }

    // B. Cek Input Acak / Ngasal (Kurang dari 3 karakter atau tidak ada huruf)
    const hasLetters = /[a-zA-Z]/.test(trimmedInput);
    if (trimmedInput.length < 3 || !hasLetters) {
        return {
            isValid: false,
            message: "⚠️ Input tidak dikenali. Silakan ketikkan pertanyaan yang sesuai, seperti: <strong>'Berapa harga website?'</strong>, <strong>'Berapa total klien?'</strong>, atau <strong>'Lihat katalog'</strong>."
        };
    }

    // C. Sensor Badwords
    let sanitizedText = trimmedInput;
    badWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        sanitizedText = sanitizedText.replace(regex, "***");
    });

    return { isValid: true, message: sanitizedText };
}

function processAIResponse(userInput) {
    const lowerInput = userInput.toLowerCase();

    // 1. SALAM & SAPAAN
    if (lowerInput.includes("hai") || lowerInput.includes("hello") || lowerInput.includes("halo") || lowerInput.includes("pagi") || lowerInput.includes("siang") || lowerInput.includes("malam")) {
        return "Halo! Selamat datang di Michizaru Studio. Ada yang bisa saya bantu terkait <strong>Pembuatan Website</strong>, <strong>Desain Grafis</strong), <strong> atau Tugas Akademik</strong>?";
    }

    // 2. HARGA & PRICING
    else if (lowerInput.includes("harga") || lowerInput.includes("biaya") || lowerInput.includes("tarif") || lowerInput.includes("bayar") || lowerInput.includes("paket")) {
        return "Berikut ringkasan estimasi biaya layanan kami:<br>" +
               "• <strong>Joki Tugas Akademik:</strong> Mulai Rp 20.000 / tugas<br>" +
               "• <strong>Layanan Desain Grafis/UI:</strong> Mulai Rp 70.000 / desain<br>" +
               "• <strong>Pembuatan Website:</strong> Mulai Rp 450.000 / proyek<br><br>" +
               "Untuk detail rincian fitur, silakan cek section <strong>Harga</strong> pada halaman ini.";
    }

    // 3. JOKI TUGAS / ACADEMIC SOLUTION
    else if (lowerInput.includes("tugas") || lowerInput.includes("joki") || lowerInput.includes("skripsi") || lowerInput.includes("makalah") || lowerInput.includes("ppt") || lowerInput.includes("kuliah")) {
        return "Kami menyediakan bantuan pengerjaan tugas akademik (PPT, Makalah, Skripsi, Web Scraping, & Analisis Data) dengan kerahasiaan 100% terjaga. Pengerjaan ditangani langsung oleh spesialis kami. Silakan isi form di bagian <strong>Kontak</strong> untuk konsultasi instan.";
    }

    // 4. PEMBUATAN WEBSITE & TEKNOLOGI
    else if (lowerInput.includes("website") || lowerInput.includes("web") || lowerInput.includes("bikin web") || lowerInput.includes("buat web") || lowerInput.includes("toko online")) {
        return "Kami melayani pembuatan Company Profile, Toko Online, Web Sekolah, hingga Sistem Kustom (React, Laravel, NextJS). Paket sudah termasuk desain responsive, garansi, dan bantuan setup domain/hosting. Anda dapat melihat contohnya di section <strong>Katalog Web</strong>.";
    }

    // 5. ESTIMASI PROSES & SEO
    else if (lowerInput.includes("seo") || lowerInput.includes("google") || lowerInput.includes("proses") || lowerInput.includes("lama") || lowerInput.includes("waktu") || lowerInput.includes("durasi")) {
        return "• <strong>Proses Pengerjaan Web:</strong> Rata-rata 3-7 hari kerja tergantung kompleksitas.<br>" +
               "• <strong>Optimasi & Indeks SEO Google:</strong> Membutuhkan waktu sekitar 2-4 hari agar struktur On-Page terindeks sempurna di Google.";
    }

    // 6. TOTAL KLIEN & REPUTASI
    else if (lowerInput.includes("klien") || lowerInput.includes("client") || lowerInput.includes("pelanggan") || lowerInput.includes("total") || lowerInput.includes("portofolio") || lowerInput.includes("katalog") || lowerInput.includes("contoh")) {
        return "Hingga saat ini, Michizaru Studio bersama tim Birohmatika telah menyelesaikan <strong>30+ proyek besar</strong> dan melayani lebih dari <strong>250+ klien</strong> dengan tingkat kepuasan mencapai 98%. Anda bisa meninjau contoh karya kami pada section <strong>Katalog</strong>.";
    }

    // 7. CARA ORDER / KONTAK / WHATSAPP
    else if (lowerInput.includes("order") || lowerInput.includes("pesan") || lowerInput.includes("kontak") || lowerInput.includes("wa") || lowerInput.includes("whatsapp") || lowerInput.includes("hubungi")) {
        return "Untuk pemesanan langsung, silakan gulir ke section <strong>Kontak</strong> di bagian bawah halaman ini, isi form sesuai kebutuhan Anda, lalu klik tombol <strong>'Kirim via WhatsApp'</strong> untuk terhubung langsung dengan tim kami.";
    }

    // 8. FALLBACK PENGALIHAN CERDAS (Jika input di luar keyword namun tetap mengarahkan ke alur website)
    else {
        return "Saya tidak menemukan jawaban pasti untuk pertanyaan tersebut. Namun, berikut <strong>alur kerja di Michizaru Studio</strong> yang bisa Anda ikuti:<br><br>" +
               "1. <strong>Eksplorasi:</strong> Cek section <i>Layanan</i> & <i>Katalog Web</i> untuk melihat jenis produk.<br>" +
               "2. <strong>Cek Biaya:</strong> Lihat rincian di section <i>Harga</i>.<br>" +
               "3. <strong>Pemesanan:</strong> Isi formulir di section <i>Kontak</i> untuk konsultasi via WhatsApp.<br><br>" +
               "Anda juga bisa menanyakan hal khusus seperti: <strong>'Berapa harga website?'</strong>, <strong>'Layanan joki tugas'</strong>, atau <strong>'Proses SEO'</strong>.";
    }
}

function sendMessage() {
    const rawText = chatInput.value.trim();
    if (rawText === "") return;

    const checkResult = sanitizeAndCheck(rawText);

    // Render pesan dari User
    chatBody.innerHTML += `<p style="text-align: right; background: rgba(0, 123, 255, 0.1);"><strong>Anda:</strong> ${checkResult.message}</p>`;
    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll ke bawah

    // Render balasan AI dengan jeda waktu seakan sedang mengetik
    setTimeout(() => {
        let aiReply = "";
        if (!checkResult.isValid) {
            aiReply = `<span style="color: red;">${checkResult.message}</span>`;
        } else {
            aiReply = processAIResponse(checkResult.message);
        }
        chatBody.innerHTML += `<p><strong>AI:</strong> ${aiReply}</p>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);
}

// Event Listener Klik Tombol & Enter
chatSendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});
