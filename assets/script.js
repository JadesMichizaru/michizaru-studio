// ============================================================
// MICHIZARU STUDIO — MAIN SCRIPT
// Counter Animation | AOS | Mobile Nav | AI Chatbot (Client-First)
// ============================================================

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
    if (!counterSection) return;
    const rect = counterSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && !started) {
        startCounter();
        started = true;
    }
});

// --- 2. INISIALISASI AOS ---
AOS.init({ once: true, offset: 50, duration: 800 });

// --- 3. HAMBURGER MENU (MOBILE) ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => { navLinks.classList.toggle('active'); });

// Tutup menu mobile saat link diklik
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// --- 4. TOGGLE AI CHATBOT ---
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

// ============================================================
// 5. AI CHATBOT — CONVERSION-DRIVEN RESPONSE ENGINE
// Bahasa: hangat, profesional, berfokus pada solusi & hasil klien
// ============================================================
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input-field');
const chatSendBtn = document.getElementById('chat-send-btn');

// --- 5.1 Security Filter: Prompt Injection ---
const injectionPatterns = [
    /ignore previous/i, /system prompt/i, /bypass/i, /act as/i, /forget all/i,
    /jailbreak/i, /override/i, /dan mode/i
];

// --- 5.2 Security Filter: Badwords ---
const badWords = ["bodoh", "tolol", "jelek", "anjing", "bangsat"];

function sanitizeAndCheck(input) {
    const trimmedInput = input.trim();

    // A. Cek Prompt Injection
    for (let pattern of injectionPatterns) {
        if (pattern.test(trimmedInput)) {
            return {
                isValid: false,
                message: "Mohon maaf, saya tidak dapat memproses permintaan tersebut. Mari kita fokus pada kebutuhan website atau proyek Anda — saya siap membantu dengan senang hati. 😊"
            };
        }
    }

    // B. Cek Input Acak / Terlalu Pendek
    const hasLetters = /[a-zA-Z]/.test(trimmedInput);
    if (trimmedInput.length < 3 || !hasLetters) {
        return {
            isValid: false,
            message: "Maaf, saya kurang memahami maksud Anda. Silakan coba pertanyaan seperti: <strong>'Berapa estimasi biaya website?'</strong> atau <strong>'Lihat demo katalog'</strong>. Anda juga bisa memilih tombol cepat di atas. 👆"
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

// --- 5.3 Response Engine: Benefit-Driven & Client-First ---
function processAIResponse(userInput) {
    const lowerInput = userInput.toLowerCase();

    // 1. SALAM & SAPAAN
    if (/\b(hai|haii|hello|hallo|halo|hei|pagi|siang|sore|malam|selamat)\b/.test(lowerInput)) {
        return "Halo! 👋 Selamat datang di <strong>Michizaru Studio</strong>. Senang Anda berkunjung!<br><br>Ada yang bisa kami bantu hari ini? Misalnya:<br>🌐 Estimasi biaya website<br>🎨 Jasa desain UI/UX<br>📚 Bantuan tugas akademik<br><br>Silakan ketik, atau pilih tombol cepat di atas. 😊";
    }

    // 2. HARGA & ESTIMASI BIAYA
    else if (/(harga|biaya|tarif|bayar|berapa|mahal|murah|paket|estimasi|budget|range|ongkos)/.test(lowerInput)) {
        return "Pertanyaan yang tepat! 💡 Berikut estimasi transparan kami:<br><br>" +
               "🌐 <strong>Website Company Profile</strong> — mulai <strong>Rp 1,5 Jt</strong><br>" +
               "🛒 <strong>Toko Online / E-Commerce</strong> — mulai <strong>Rp 3,5 Jt</strong><br>" +
               "🏨 <strong>Website Booking Penginapan</strong> — mulai <strong>Rp 4 Jt</strong><br>" +
               "🎨 <strong>Desain Grafis/UI</strong> — mulai <strong>Rp 70K</strong>/desain<br>" +
               "📚 <strong>Bantuan Tugas</strong> — mulai <strong>Rp 20K</strong>/tugas<br><br>" +
               "Harga final selalu menyesuaikan kebutuhan Anda — dan <strong>konsultasi untuk menentukannya gratis</strong>. Mau saya arahkan ke form konsultasi?";
    }

    // 3. DEMO & PORTOFOLIO
    else if (/(demo|contoh|katalog|portofolio|preview|coba|lihat|liat|sample|sampel)/.test(lowerInput)) {
        return "Tentu! Kami percaya <strong>lihat langsung jauh lebih meyakinkan</strong> daripada sekadar janji. 👀<br><br>Gulir ke section <strong>\"Katalog Sistem\"</strong> — setiap kartu punya tombol <strong>\"▶ Lihat Live Demo\"</strong> yang bisa Anda coba langsung tanpa registrasi apa pun.<br><br>Mau saya bawa ke sana sekarang?";
    }

    // 4. WEBSITE & E-COMMERCE
    else if (/(website|web\b|toko online|e-?commerce|landing page|company profile|company|profil|blog)/.test(lowerInput)) {
        return "Bagus sekali! Website yang baik bukan cuma tampil cantik — tapi <strong>mengubah pengunjung menjadi pembeli</strong>. 🚀<br><br>Yang Anda dapatkan di setiap paket:<br>✓ Desain premium mobile-first<br>✓ SEO ready + loading cepat<br>✓ Tombol WhatsApp strategis<br>✓ Setup domain, hosting & SSL<br>✓ Garansi revisi & support pasca-launching<br><br>Ingin saya bantu hitung estimasi untuk kebutuhan spesifik Anda?";
    }

    // 5. BOOKING / HOTEL / PENGINAPAN
    else if (/(booking|hotel|penginapan|villa|homestay|kamar|reservasi|pms)/.test(lowerInput)) {
        return "Pilihan cerdas! 🏨 Dengan website booking mandiri, Anda <strong>hemat komisi OTA hingga 20%</strong> di setiap reservasi.<br><br>Fitur unggulannya:<br>✓ Kalender kamar real-time<br>✓ Payment gateway otomatis<br>✓ Tarif musiman & weekend<br>✓ Notifikasi reservasi instan<br><br>Estimasi mulai <strong>Rp 4 Jt</strong>. Mau konsultasikan jumlah kamar & kebutuhan Anda?";
    }

    // 6. DESAIN GRAFIS & UI/UX
    else if (/(desain|design|logo|ui|ux|banner|feed|instagram|poster|branding|grafis)/.test(lowerInput)) {
        return "Visual yang kuat membuat brand Anda <strong>diingat dalam 3 detik pertama</strong>. 🎨<br><br>Kami melayani:<br>✓ Logo & identitas brand<br>✓ Feed Instagram & banner promosi<br>✓ Wireframe & prototype UI/UX<br><br>Mulai <strong>Rp 70K/desain</strong> dengan revisi hingga 2x. Punya referensi style yang Anda suka? Kirim saja saat konsultasi!";
    }

    // 7. BANTUAN TUGAS AKADEMIK
    else if (/(tugas|joki|skripsi|makalah|ppt|kuliah|mahasiswa|kampus|laporan|olah data|statistik|scraping|erd|uml)/.test(lowerInput)) {
        return "Tenang, Anda tidak sendirian. 😊 Kami membantu penulisan dokumen, perancangan sistem (ERD/UML), olah data & statistik — semua dikerjakan spesialis, dengan <strong>privasi & identitas 100% terjaga</strong>.<br><br>💰 Mulai <strong>Rp 20K/tugas</strong>, deadline mendesak pun bisa didiskusikan.<br><br>Silakan isi form di section Kontak, atau ceritakan singkat kebutuhan Anda di sini — saya catatkan dulu ya.";
    }

    // 8. PROSES, WAKTU & SEO
    else if (/(seo|google|proses|lama|waktu|durasi|berapa hari|kapan selesai|indeks|ranking)/.test(lowerInput)) {
        return "Transparan dari awal, ya! 📋<br><br>⏱️ <strong>Pengerjaan website:</strong> rata-rata 3–7 hari kerja (tergantung kompleksitas)<br>🔍 <strong>Indeks SEO Google:</strong> struktur on-page kami siap sejak hari launching; peringkat organik berkembang 2–4 minggu dengan konten rutin<br><br>Progress proyek selalu kami update berkala — Anda tidak akan dibiarkan menebak-nebak.";
    }

    // 9. REPUTASI & KEPERCAYAAN
    else if (/(klien|client|pelanggan|total|pengalaman|terpercaya|aman|garansi|revisi|testimoni)/.test(lowerInput)) {
        return "Pertanyaan yang bijak — kepercayaan itu penting. 🛡️<br><br>✅ <strong>30+ sistem</strong> telah kami deploy<br>✅ <strong>95% klien puas</strong> dan banyak yang repeat order<br>✅ Garansi revisi di setiap paket<br>✅ Support aktif pasca-launching<br>✅ Kemitraan resmi dengan Birohmatika Alliance<br><br>Coba salah satu <strong>live demo</strong> kami — kualitas kami serahkan pada bukti, bukan kata-kata.";
    }

    // 10. CARA ORDER / KONTAK / WHATSAPP
    else if (/(order|pesan|kontak|wa\b|whatsapp|hubungi|telepon|email|gmail|dm|mulai|daftar|konsultasi)/.test(lowerInput)) {
        return "Mudah sekali! 🚀 Cukup 2 langkah:<br><br>1️⃣ Isi form singkat di section <strong>Kontak</strong> (nama + jenis layanan + kebutuhan)<br>2️⃣ Klik <strong>\"Kirim via WhatsApp\"</strong> — pesan Anda otomatis terkirim ke tim kami<br><br>Tim kami membalas <strong>dalam kurang dari 30 menit</strong> pada jam kerja, lengkap dengan estimasi biaya. Tanpa komitmen, tanpa biaya konsultasi. 😊";
    }

    // 11. TERIMA KASIH
    else if (/(makasih|terima kasih|thank|thanks|oke|ok|sip|mantap|baik)/.test(lowerInput)) {
        return "Sama-sama! 🙏 Senang bisa membantu. Jika ada pertanyaan lain — kapan pun — saya di sini. Atau langsung saja ke form Kontak, tim kami siap menyambut Anda. Semoga harinya menyenangkan! ✨";
    }

    // 12. FALLBACK — Pengalihan Cerdas & Tetap Membantu
    else {
        return "Terima kasih atas pertanyaannya! Agar saya bisa membantu secara maksimal, boleh diperjelas kebutuhan Anda? 😊<br><br>Beberapa hal yang paling sering ditanyakan klien kami:<br>🚀 <strong>'Berapa estimasi biaya web?'</strong><br>🖥️ <strong>'Lihat demo katalog web'</strong><br>📚 <strong>'Konsultasi tugas akademik'</strong><br><br>Atau pilih tombol cepat di atas — lebih praktis!";
    }
}

// --- 5.4 Send Message Handler ---
function sendMessage() {
    const rawText = chatInput.value.trim();
    if (rawText === "") return;

    const checkResult = sanitizeAndCheck(rawText);

    // Render pesan User
    chatBody.innerHTML += `<p style="text-align: right; background: rgba(236, 72, 153, 0.15);"><strong>Anda:</strong> ${checkResult.message}</p>`;
    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll ke bawah

    // Render balasan AI dengan jeda "mengetik"
    setTimeout(() => {
        const aiReply = checkResult.isValid
            ? processAIResponse(checkResult.message)
            : checkResult.message;
        chatBody.innerHTML += `<p><strong>Asisten:</strong> ${aiReply}</p>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);
}

chatSendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

// --- 6. WHATSAPP FORM GATEWAY ---
const waForm = document.getElementById('whatsappForm');
if (waForm) {
    waForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        const phone = '6281288677669';

        const text = `Halo Michizaru Studio! 👋%0A%0A` +
                     `Nama: ${encodeURIComponent(name)}%0A` +
                     `Layanan: ${encodeURIComponent(service)}%0A` +
                     `Kebutuhan: ${encodeURIComponent(message)}%0A%0A` +
                     `Dikirim dari website — mohon info estimasinya ya. Terima kasih! 🙏`;

        window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    });
}
