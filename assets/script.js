// --- 1. COUNTER ANIMATION ---
        const counters = document.querySelectorAll('.counter');
        const counterSection = document.getElementById('counter-section');
        let started = false;

        function startCounter() {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const increment = target / 100; // Kecepatan hitung

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

        // --- 2. PORTFOLIO FILTER ---
        const filterBtns = document.querySelectorAll('.filter-btn');
        const items = document.querySelectorAll('.portfolio-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Ubah gaya tombol aktif
                filterBtns.forEach(b => b.classList.remove('bg-blue-600', 'active'));
                filterBtns.forEach(b => b.classList.add('bg-slate-800'));
                btn.classList.add('bg-blue-600', 'active');
                btn.classList.remove('bg-slate-800');

                const filter = btn.getAttribute('data-filter');

                items.forEach(item => {
                    item.classList.add('animate-fade');
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });

        // Inisialisasi AOS
        AOS.init({
            duration: 1000, // durasi animasi 1 detik
            once: true,    // animasi terulang saat di-scroll lagi (set true jika ingin sekali saja)
            mirror: true,   // animasi jalan saat scroll ke atas atau bawah
            offset: 120,    // mulai animasi saat elemen 120px dari viewport
        });

        // Whatsapp Form

        document.getElementById('whatsappForm').addEventListener('submit', function(e) {
            e.preventDefault();

            // Ambil data dari input
            const name = document.getElementById('name').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            const phoneNumber = "6281288677669"; // Format harus angka tanpa '+' atau spasi

            // Template Pesan
            const text = `Halo Admin, saya *${name}*.\n\n` +
                         `Saya tertarik dengan layanan: *${service}*\n` +
                         `*Pesan:* ${message}`;

            // Encode pesan untuk URL
            const encodedText = encodeURIComponent(text);

            // Redirect ke WhatsApp
            window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
        });
