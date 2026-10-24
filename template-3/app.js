/* ================================================================
   DATA KOLEKSI (contoh OPAC)
================================================================ */
const KOLEKSI = [
  {
    id: 1,
    judul: "Metodologi Penelitian Kuantitatif, Kualitatif, dan R&D",
    pengarang: "Sugiyono",
    penerbit: "Alfabeta",
    tahun: 2023,
    ddc: "001.42 SUG m",
    isbn: "978-602-1219-45-7",
    bahasa: "Indonesia",
    media: "Cetak",
    subjek: ["Metodologi Penelitian", "Statistika"],
    status: "Tersedia",
    edisi: "Ke-4",
    halaman: "xii + 398 hlm.",
    sinopsis:
      "Buku rujukan standar untuk mahasiswa dan peneliti mengenai perancangan penelitian kuantitatif, kualitatif, serta penelitian dan pengembangan (R&D), dilengkapi contoh analisis statistika terapan.",
    rak: [
      {
        unit: "Perpustakaan Pusat",
        rak: "Lantai 2, Rak B-04",
        kode: "001.42 SUG m",
        status: "Tersedia",
      },
      {
        unit: "Perpustakaan Vokasi",
        rak: "Lantai 1, Rak A-11",
        kode: "001.42 SUG m",
        status: "Dipinjam",
        kembali: "12/11/2026",
      },
    ],
  },
  {
    id: 2,
    judul: "Sistem Basis Data: Konsep, Desain, dan Implementasi",
    pengarang: "Fathansyah",
    penerbit: "Informatika",
    tahun: 2022,
    ddc: "005.74 FAT s",
    isbn: "978-602-8756-18-4",
    bahasa: "Indonesia",
    media: "Cetak",
    subjek: ["Basis Data", "Informatika"],
    status: "Referensi",
    edisi: "Ed. Revisi",
    halaman: "xvi + 540 hlm.",
    sinopsis:
      "Membahas perancangan basis data relasional mulai dari model ER, normalisasi, hingga penerapan SQL pada sistem produksi, dengan studi kasus basis data perguruan tinggi.",
    rak: [
      {
        unit: "Perpustakaan Pusat",
        rak: "Lantai 3, Rak C-02 (Referensi)",
        kode: "005.74 FAT s",
        status: "Referensi",
      },
    ],
  },
  {
    id: 3,
    judul: "The Principles of Information Systems",
    pengarang: "Ralph Stair, George Reynolds",
    penerbit: "Cengage Learning",
    tahun: 2021,
    ddc: "658.4038 STA p",
    isbn: "978-0-357-43748-3",
    bahasa: "Inggris",
    media: "E-Book",
    subjek: ["Sistem Informasi", "Manajemen"],
    status: "Ebook",
    edisi: "13th ed.",
    halaman: "704 p.",
    sinopsis:
      "Pengantar komprehensif sistem informasi organisasi, mencakup perangkat keras, perangkat lunak, jaringan, keamanan informasi, dan perkembangan e-business.",
    rak: [
      {
        unit: "Koleksi Digital",
        rak: "ProQuest E-Library",
        kode: "eISBN 978-0-357-43749-0",
        status: "E-Book",
      },
    ],
  },
  {
    id: 4,
    judul: "Pengantar Ilmu Politik",
    pengarang: "Miriam Budiardjo",
    penerbit: "RajaGrafindo Persada",
    tahun: 2024,
    ddc: "320 BUD p",
    isbn: "978-979-769-116-6",
    bahasa: "Indonesia",
    media: "Cetak",
    subjek: ["Ilmu Politik", "Sosial"],
    status: "Tersedia",
    edisi: "Ed. Ketujuh",
    halaman: "x + 346 hlm.",
    sinopsis:
      "Karya klasik pendidikan politik di Indonesia yang membahas konsep negara, konstitusi, demokrasi, dan analisis sistem politik secara sistematis.",
    rak: [
      {
        unit: "Perpustakaan Pusat",
        rak: "Lantai 2, Rak D-07",
        kode: "320 BUD p",
        status: "Tersedia",
      },
    ],
  },
  {
    id: 5,
    judul: "Kimia Organik Edisi Ketujuh Jilid 1",
    pengarang: "T.W. Graham Solomons, Craig B. Fryhle",
    penerbit: "Wiley",
    tahun: 2023,
    ddc: "547 SOL k",
    isbn: "978-1-119-32034-8",
    bahasa: "Inggris",
    media: "Cetak",
    subjek: ["Kimia Organik", "Saintek"],
    status: "Dipinjam",
    edisi: "7th ed.",
    halaman: "720 p.",
    sinopsis:
      "Referensi utama kimia organik yang membahas struktur, ikatan, reaksi, mekanisme, serta spektroskopi dengan pendekatan berbasis mekanisme reaksi.",
    rak: [
      {
        unit: "Perpustakaan Kedokteran",
        rak: "Lantai 1, Rak F-03",
        kode: "547 SOL k",
        status: "Dipinjam",
        kembali: "03/12/2026",
      },
      {
        unit: "Perpustakaan Pusat",
        rak: "Lantai 3, Rak F-03",
        kode: "547 SOL k",
        status: "Tersedia",
      },
    ],
  },
  {
    id: 6,
    judul: "Statistika untuk Penelitian",
    pengarang: "Prof. Dr. Anwar Hidayat, M.Si.",
    penerbit: "Pustaka Setia",
    tahun: 2022,
    ddc: "519.5 HID s",
    isbn: "978-979-297-778-4",
    bahasa: "Indonesia",
    media: "Cetak",
    subjek: ["Statistika", "Metodologi Penelitian"],
    status: "Tersedia",
    edisi: "Edisi Keempat",
    halaman: "xiv + 422 hlm.",
    sinopsis:
      "Pembahasan lengkap statistika deskriptif dan inferensial untuk keperluan penelitian sosial, dilengkapi panduan penggunaan SPSS langkah demi langkah.",
    rak: [
      {
        unit: "Perpustakaan Pusat",
        rak: "Lantai 2, Rak B-05",
        kode: "519.5 HID s",
        status: "Tersedia",
      },
    ],
  },
  {
    id: 7,
    judul: "Machine Learning: A Probabilistic Perspective",
    pengarang: "Kevin P. Murphy",
    penerbit: "MIT Press",
    tahun: 2022,
    ddc: "006.31 MUR m",
    isbn: "978-0-262-01802-9",
    bahasa: "Inggris",
    media: "E-Book",
    subjek: ["Machine Learning", "Kecerdasan Buatan"],
    status: "Ebook",
    edisi: "3rd ed.",
    halaman: "1104 p.",
    sinopsis:
      "Teori probabilistik di balik pembelajaran mesin: regresi, klasifikasi, model grafis, hingga deep learning, dengan fondasi matematika yang ketat.",
    rak: [
      {
        unit: "Koleksi Digital",
        rak: "IEEE Xplore / ProQuest",
        kode: "eISBN 978-0-262-37027-6",
        status: "E-Book",
      },
    ],
  },
  {
    id: 8,
    judul:
      "Sejarah Nasional Indonesia Jilid VI: Zaman Jepang dan Zaman Republik",
    pengarang: "Nugroho Notosusanto, et al.",
    penerbit: "Balai Pustaka",
    tahun: 2021,
    ddc: "959.8 SEJ",
    isbn: "978-979-407-716-0",
    bahasa: "Indonesia",
    media: "Cetak",
    subjek: ["Sejarah Indonesia", "Sosial"],
    status: "Referensi",
    edisi: "Cet. Ke-6",
    halaman: "x + 512 hlm.",
    sinopsis:
      "Volume ensiklopedis sejarah Indonesia periode pendudukan Jepang hingga awal kemerdekaan, disusun oleh tim sejarawan nasional.",
    rak: [
      {
        unit: "Perpustakaan Pusat",
        rak: "Lantai 2, Rak E-01 (Referensi)",
        kode: "959.8 SEJ",
        status: "Referensi",
      },
    ],
  },
  {
    id: 9,
    judul: "Akuntansi Pengantar: Edisi Revisi",
    pengarang: "Supriyono, R. A. Supriyono",
    penerbit: "BPFE UGM",
    tahun: 2023,
    ddc: "657 SUP a",
    isbn: "978-979-769-143-2",
    bahasa: "Indonesia",
    media: "Cetak",
    subjek: ["Akuntansi", "Ekonomi"],
    status: "Dipinjam",
    edisi: "Buku 1",
    halaman: "xii + 360 hlm.",
    sinopsis:
      "Dasar-dasar akuntansi keuangan: siklus akuntansi, penyusunan laporan keuangan, serta pengantar akuntansi biaya untuk program studi ekonomi.",
    rak: [
      {
        unit: "Perpustakaan Pusat",
        rak: "Lantai 1, Rak G-02",
        kode: "657 SUP a",
        status: "Dipinjam",
        kembali: "20/11/2026",
      },
      {
        unit: "Perpustakaan Vokasi",
        rak: "Lantai 1, Rak G-02",
        kode: "657 SUP a",
        status: "Tersedia",
      },
    ],
  },
  {
    id: 10,
    judul: "Jurnal Teknik Informatika dan Sistem Informasi",
    pengarang: "Fakultas Ilmu Komputer UNA",
    penerbit: "UNA Press",
    tahun: 2026,
    ddc: "005 JUR t",
    isbn: "2089-1268 (p) / 2460-0614 (e)",
    bahasa: "Indonesia",
    media: "Jurnal",
    subjek: ["Sistem Informasi", "Jurnal"],
    status: "Ebook",
    edisi: "Vol. 12 No. 1 (2026)",
    halaman: "1 s.d. 118 hlm.",
    sinopsis:
      "Edisi terbaru berisi delapan artikel terbaru penelitian sistem informasi, antara lain analitik pembelajaran dan keamanan siber pada layanan kampus.",
    rak: [
      {
        unit: "Koleksi Digital",
        rak: "Garuda / Portal Jurnal UNA",
        kode: "eISSN 2460-0614",
        status: "E-Book",
      },
    ],
  },
  {
    id: 11,
    judul: "Filsafat Ilmu: Sejarah, Konsep, dan Analisis",
    pengarang: "Jujun S. Suriasumantri",
    penerbit: "Pustaka Sinar Harapan",
    tahun: 2022,
    ddc: "121 SUR f",
    isbn: "978-979-416-630-7",
    bahasa: "Indonesia",
    media: "Cetak",
    subjek: ["Filsafat Ilmu", "Filsafat"],
    status: "Tersedia",
    edisi: "Cet. Ke-12",
    halaman: "xviii + 298 hlm.",
    sinopsis:
      "Pengantar filsafat ilmu yang membedah hakikat ilmu, etika ilmuwan, dan hubungan ilmu dengan kehidupan, ditulis dengan bahasa yang mudah diikuti.",
    rak: [
      {
        unit: "Perpustakaan Pusat",
        rak: "Lantai 2, Rak H-01",
        kode: "121 SUR f",
        status: "Tersedia",
      },
    ],
  },
  {
    id: 12,
    judul: "Human Anatomy & Physiology",
    pengarang: "Elaine N. Marieb, Katja Hoehn",
    penerbit: "Pearson",
    tahun: 2024,
    ddc: "612 MAR h",
    isbn: "978-0-13-516804-5",
    bahasa: "Inggris",
    media: "E-Book",
    subjek: ["Anatomi", "Fisiologi", "Kedokteran"],
    status: "Ebook",
    edisi: "12th ed. (Global)",
    halaman: "1264 p.",
    sinopsis:
      "Referensi standar dunia anatomi dan fisiologi manusia dengan ilustrasi berwarna lengkap, studi klinis, dan modul praktikum interaktif.",
    rak: [
      {
        unit: "Koleksi Digital",
        rak: "VitalSource / Perpustakaan Kedokteran",
        kode: "eISBN 978-0-13-521422-3",
        status: "E-Book",
      },
    ],
  },
];

const GRADIEN_SAMPUL = [
  ["#1E3A5F", "#0F2942"],
  ["#3F4F2F", "#2C3A1E"],
  ["#5C3A21", "#3E2413"],
  ["#4A3A5C", "#2E2138"],
  ["#1F4E4A", "#12332F"],
  ["#6B2D2D", "#471B1B"],
];

/* ================================================================
   STATUS BADGE
================================================================ */
function badgeStatus(b) {
  if (b.status === "Tersedia")
    return `<span class="badge badge-ada"><i data-lucide="check-circle-2" class="w-3 h-3"></i>Tersedia di Rak</span>`;
  if (b.status === "Dipinjam")
    return `<span class="badge badge-pinjam"><i data-lucide="calendar-clock" class="w-3 h-3"></i>Sedang Dipinjam</span>`;
  if (b.status === "Referensi")
    return `<span class="badge badge-ref"><i data-lucide="lock" class="w-3 h-3"></i>Koleksi Referensi</span>`;
  return `<span class="badge badge-ebook"><i data-lucide="tablet-smartphone" class="w-3 h-3"></i>Tersedia E-Book</span>`;
}

function sampulHTML(b) {
  const g = GRADIEN_SAMPUL[b.id % GRADIEN_SAMPUL.length];
  return `<div class="cover" style="background:linear-gradient(155deg,${g[0]},${g[1]})">
    <span class="cover-penulis">${b.pengarang.split(",")[0].toUpperCase().slice(0, 26)}</span>
    <span class="cover-judul">${b.judul}</span>
    <span class="cover-penulis" style="opacity:.7">${b.penerbit} · ${b.tahun}</span>
  </div>`;
}

/* ================================================================
   STATE & PENCARIAN
================================================================ */
let modeTampilan = "grid";
let tersimpan = new Set(
  JSON.parse(localStorage.getItem("opac_bookmark") || "[]"),
);

const $ = (id) => document.getElementById(id);

function ambilFilterLanjutan() {
  return {
    tahun: $("fTahun").value,
    bahasa: $("fBahasa").value,
    media: $("fMedia").value,
    status: $("fStatus").value,
  };
}

function cariKoleksi() {
  const q = $("kataKunci").value.trim().toLowerCase();
  const tipe = $("tipeCari").value;
  const f = ambilFilterLanjutan();

  return KOLEKSI.filter((b) => {
    // kata kunci
    if (q) {
      const bidang = {
        semua: [b.judul, b.pengarang, b.isbn, ...b.subjek]
          .join(" ")
          .toLowerCase(),
        judul: b.judul.toLowerCase(),
        pengarang: b.pengarang.toLowerCase(),
        subjek: b.subjek.join(" ").toLowerCase(),
        isbn: b.isbn.toLowerCase().replace(/-/g, ""),
      }[tipe];
      const cocok =
        tipe === "isbn"
          ? bidang.includes(q.replace(/-/g, ""))
          : bidang.includes(q);
      if (!cocok) return false;
    }
    if (f.tahun) {
      if (f.tahun === "< 2022") {
        if (b.tahun >= 2022) return false;
      } else if (String(b.tahun) !== f.tahun) return false;
    }
    if (f.bahasa && b.bahasa !== f.bahasa) return false;
    if (f.media && b.media !== f.media) return false;
    if (f.status) {
      const map = {
        Tersedia: "Tersedia",
        Dipinjam: "Dipinjam",
        Referensi: "Referensi",
        Ebook: "Ebook",
      };
      if (b.status !== map[f.status]) return false;
    }
    return true;
  });
}

function urutkanData(data) {
  const u = $("urutkan").value;
  const arr = [...data];
  if (u === "judul") arr.sort((a, b) => a.judul.localeCompare(b.judul, "id"));
  else if (u === "tahun-desc") arr.sort((a, b) => b.tahun - a.tahun);
  else if (u === "tahun-asc") arr.sort((a, b) => a.tahun - b.tahun);
  return arr;
}

/* ================================================================
   RENDER
================================================================ */
function render() {
  const hasil = urutkanData(cariKoleksi());
  $("jumlahHasil").textContent = hasil.length;
  const q = $("kataKunci").value.trim();
  $("infoKata").textContent = q ? `untuk "${q}"` : "";
  $("keadaanKosong").classList.toggle("hidden", hasil.length > 0);
  $("wadahHasil").classList.toggle("hidden", hasil.length === 0);

  $("wadahHasil").innerHTML =
    modeTampilan === "grid" ? gridHTML(hasil) : listHTML(hasil);
  lucide.createIcons();
}

function gridHTML(data) {
  return `<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    ${data
      .map(
        (b) => `
    <article class="fade-in bg-white border border-line rounded-lg p-3 flex flex-col gap-3 hover:border-slate-400 transition">
      <button class="text-left" onclick="bukaDetail(${b.id})" aria-label="Lihat detail: ${b.judul}">
        ${sampulHTML(b)}
      </button>
      <div class="flex flex-col gap-2 flex-1">
        <h3 class="font-serif-title font-semibold text-[15px] leading-snug text-navy clamp-2">
          <button class="text-left hover:underline underline-offset-2" onclick="bukaDetail(${b.id})">${b.judul}</button>
        </h3>
        <p class="text-xs text-meta clamp-2">${b.pengarang}</p>
        <div class="flex items-center justify-between gap-2 flex-wrap mt-auto pt-1">
          ${badgeStatus(b)}
          <span class="callno" title="Nomor Panggil (Call No)">${b.ddc}</span>
        </div>
        <div class="flex gap-2">
          <button onclick="bukaDetail(${b.id})" class="flex-1 min-h-[40px] text-[12px] font-bold border border-navy text-navy rounded-md hover:bg-navy hover:text-white transition">Lihat Detail Katalog</button>
          <button onclick="toggleBookmark(${b.id}, this)" class="w-10 min-h-[40px] grid place-items-center border border-line rounded-md hover:border-navy transition" aria-label="Tandai buku" title="Tandai / Bookmark">
            <i data-lucide="bookmark" class="w-4 h-4 ${tersimpan.has(b.id) ? "fill-navy text-navy" : ""}"></i>
          </button>
        </div>
      </div>
    </article>`,
      )
      .join("")}
  </div>`;
}

function listHTML(data) {
  return `<div class="bg-white border border-line rounded-lg overflow-x-auto fade-in">
    <table class="tabel-katalog w-full min-w-[760px]">
      <thead><tr>
        <th>Judul Koleksi</th><th>Pengarang</th><th>Penerbit &amp; Tahun</th><th>Klasifikasi DDC</th><th>Status</th><th></th>
      </tr></thead>
      <tbody>
        ${data
          .map(
            (b) => `
        <tr onclick="bukaDetail(${b.id})">
          <td class="max-w-[280px]">
            <p class="font-serif-title font-semibold text-[14px] text-navy clamp-2">${b.judul}</p>
            <p class="text-[11px] text-meta mt-0.5">${b.media} · ${b.bahasa} · ISBN ${b.isbn}</p>
          </td>
          <td class="whitespace-nowrap">${b.pengarang}</td>
          <td class="whitespace-nowrap">${b.penerbit}<br><span class="text-meta text-xs">${b.tahun}</span></td>
          <td><span class="callno">${b.ddc}</span></td>
          <td>${badgeStatus(b)}</td>
          <td><span class="inline-flex items-center gap-1 text-[12px] font-bold text-navy whitespace-nowrap">Detail <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i></span></td>
        </tr>`,
          )
          .join("")}
      </tbody>
    </table>
  </div>`;
}

/* ================================================================
   DRAWER DETAIL
================================================================ */
let bukuAktif = null;

function sitasi(b, gaya) {
  const nama = b.pengarang.split(",")[0].split(" ").pop();
  const inisial = b.pengarang.split(",")[0].replace(/[^A-Z]/g, "");
  if (gaya === "apa")
    return `${nama}, ${inisial}. (${b.tahun}). <i>${b.judul}</i> (${b.edisi}). ${b.penerbit}.`;
  if (gaya === "mla")
    return `${b.pengarang}. <i>${b.judul}</i>. ${b.edisi}, ${b.penerbit}, ${b.tahun}.`;
  return `${inisial}. ${nama}, <i>${b.judul}</i>, ${b.edisi}. ${b.penerbit}, ${b.tahun}.`;
}

function qrHTML(teks) {
  // Pola QR deterministik sederhana (untuk demonstrasi navigasi rak)
  let hash = 0;
  for (let i = 0; i < teks.length; i++)
    hash = (hash * 31 + teks.charCodeAt(i)) >>> 0;
  let sel = "";
  let seed = hash;
  for (let i = 0; i < 21 * 21; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    const pinggir = i < 21 || i >= 21 * 20 || i % 21 === 0 || i % 21 === 20;
    const on = pinggir ? i % 7 < 3 : (seed >> 8) % 2 === 0;
    sel += `<i class="${on ? "on" : ""}"></i>`;
  }
  return `<div class="qr-grid shrink-0">${sel}</div>`;
}

function bukaDetail(id) {
  const b = KOLEKSI.find((x) => x.id === id);
  if (!b) return;
  bukuAktif = b;

  const barisRak = b.rak
    .map(
      (r) => `
    <div class="border border-line rounded-md bg-white p-3 flex items-start justify-between gap-3">
      <div>
        <p class="text-[13px] font-bold text-navy">${r.unit}</p>
        <p class="text-[12px] text-meta mt-0.5">${r.rak}</p>
        <span class="callno inline-block mt-1.5">${r.kode}</span>
      </div>
      <div class="text-right shrink-0">
        ${
          r.status === "Tersedia"
            ? '<span class="badge badge-ada">Tersedia di Rak</span>'
            : r.status === "Dipinjam"
              ? `<span class="badge badge-pinjam">Dipinjam</span><p class="text-[11px] text-meta mt-1">Kembali: ${r.kembali}</p>`
              : r.status === "Referensi"
                ? '<span class="badge badge-ref">Hanya Baca di Tempat</span>'
                : '<span class="badge badge-ebook">Unduh PDF (E-Resource)</span>'
        }
      </div>
    </div>`,
    )
    .join("");

  $("isiDrawer").innerHTML = `
    <div class="flex gap-4">
      <div class="w-28 shrink-0">${sampulHTML(b)}</div>
      <div class="min-w-0">
        <h3 class="font-serif-title text-xl font-semibold leading-snug text-navy">${b.judul}</h3>
        <p class="text-[13px] text-meta mt-1.5">${b.pengarang}</p>
        <div class="flex items-center gap-2 mt-2 flex-wrap">${badgeStatus(b)}</div>
      </div>
    </div>

    <dl class="mt-5 border-t border-line pt-4 grid grid-cols-1 gap-y-3 text-[13px]">
      ${[
        ["Nomor Panggil (Call No)", b.ddc, true],
        ["Pengarang / Penulis", b.pengarang],
        ["Penerbit &amp; Tahun", `${b.penerbit}, ${b.tahun}`],
        ["Klasifikasi DDC", b.ddc, true],
        ["Tipe Koleksi", `${b.media} · ${b.bahasa}`],
        ["Edisi / Volume", b.edisi],
        ["Halaman", b.halaman],
        ["ISBN / ISSN", b.isbn, true],
        ["Subjek", b.subjek.join("; ")],
      ]
        .map(
          ([l, v, mono]) => `
        <div class="flex gap-3">
          <dt class="w-36 shrink-0 text-[11px] font-bold uppercase tracking-wide text-meta pt-0.5">${l}</dt>
          <dd class="${mono ? "font-mono text-[12px]" : ""}">${v}</dd>
        </div>`,
        )
        .join("")}
    </dl>

    <section class="mt-5">
      <h4 class="text-[11px] font-bold uppercase tracking-widest text-meta mb-2">Ringkasan Isi</h4>
      <p class="text-[13px] leading-relaxed text-slate-700">${b.sinopsis}</p>
    </section>

    <section class="mt-5">
      <h4 class="text-[11px] font-bold uppercase tracking-widest text-meta mb-2">Ketersediaan di Rak</h4>
      <div class="flex flex-col gap-2">${barisRak}</div>
    </section>

    <section class="mt-5 border border-line rounded-md bg-white p-3 flex items-center gap-4">
      ${qrHTML(b.ddc)}
      <div>
        <p class="text-[12px] font-bold text-navy">Navigasi Rak via Ponsel</p>
        <p class="text-[11px] text-meta mt-0.5">Pindai kode untuk membuka lokasi rak fisik di denah perpustakaan.</p>
      </div>
    </section>

    <section class="mt-5">
      <h4 class="text-[11px] font-bold uppercase tracking-widest text-meta mb-2">Salin Sitasi</h4>
      <div class="flex gap-1.5 mb-2" role="tablist">
        ${["apa", "mla", "ieee"].map((g, i) => `<button class="tab-sitasi ${i === 0 ? "active" : ""} flex-1 min-h-[40px] text-[12px] font-bold border border-line rounded-md hover:border-navy transition" data-gaya="${g}" onclick="gantiGaya(this)">${g.toUpperCase()}</button>`).join("")}
      </div>
      <div id="kotakSitasi" class="border border-line rounded-md bg-white p-3 text-[12.5px] leading-relaxed font-serif-title" style="font-family:'Lora',serif"></div>
      <button onclick="salinSitasi()" class="mt-2 w-full min-h-[44px] bg-navy text-white text-[13px] font-bold rounded-md hover:bg-navy2 transition inline-flex items-center justify-center gap-2">
        <i data-lucide="copy" class="w-4 h-4"></i> Salin Sitasi ke Clipboard
      </button>
    </section>

    <div class="flex gap-2 mt-5">
      <button onclick="reservasi()" class="flex-1 min-h-[44px] border border-navy text-navy font-bold text-[13px] rounded-md hover:bg-navy hover:text-white transition inline-flex items-center justify-center gap-2">
        <i data-lucide="book-marked" class="w-4 h-4"></i> Reservasi Buku
      </button>
      ${
        b.media === "E-Book" || b.media === "Jurnal"
          ? `<button onclick="unduhPDF()" class="flex-1 min-h-[44px] bg-sage text-white font-bold text-[13px] rounded-md hover:opacity-90 transition inline-flex items-center justify-center gap-2"><i data-lucide="download" class="w-4 h-4"></i> Unduh PDF</button>`
          : `<button onclick="toggleBookmark(${b.id})" class="flex-1 min-h-[44px] border border-line font-bold text-[13px] rounded-md hover:border-navy transition inline-flex items-center justify-center gap-2"><i data-lucide="bookmark" class="w-4 h-4"></i> Tandai</button>`
      }
    </div>`;

  gantiGaya(document.querySelector(".tab-sitasi"));
  $("overlay").classList.remove("opacity-0", "pointer-events-none");
  $("drawer").classList.remove("translate-x-full");
  $("drawer").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lucide.createIcons();
}

function tutupDrawer() {
  $("overlay").classList.add("opacity-0", "pointer-events-none");
  $("drawer").classList.add("translate-x-full");
  document.body.style.overflow = "";
}

function gantiGaya(btn) {
  document
    .querySelectorAll(".tab-sitasi")
    .forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  const tmp = document.createElement("div");
  tmp.innerHTML = sitasi(bukuAktif, btn.dataset.gaya);
  $("kotakSitasi").textContent = tmp.textContent;
}

function salinSitasi() {
  navigator.clipboard
    .writeText($("kotakSitasi").textContent)
    .then(() => tampilToast("Sitasi tersalin ke clipboard."))
    .catch(() =>
      tampilToast("Gagal menyalin. Salin manual dari kotak sitasi."),
    );
}

function reservasi() {
  tampilToast(
    "Reservasi dikirim. Ambil buku maksimal 3 hari kerja di meja sirkulasi.",
  );
}
function unduhPDF() {
  tampilToast("Membuka tautan E-Resource... (demo)");
}

/* ================================================================
   BOOKMARK
================================================================ */
function toggleBookmark(id) {
  if (tersimpan.has(id)) {
    tersimpan.delete(id);
    tampilToast("Dihapus dari daftar tandai.");
  } else {
    tersimpan.add(id);
    tampilToast("Ditambahkan ke daftar tandai Anda.");
  }
  localStorage.setItem("opac_bookmark", JSON.stringify([...tersimpan]));
  render();
}

/* ================================================================
   BOTTOM SHEET FILTER (MOBILE)
================================================================ */
function salinFilterKeSheet() {
  $("isiSheet").innerHTML = $("panelLanjutan")
    .innerHTML.replace('id="fTahun"', 'id="sTahun"')
    .replace('id="fBahasa"', 'id="sBahasa"')
    .replace('id="fMedia"', 'id="sMedia"')
    .replace('id="fStatus"', 'id="sStatus"')
    .replaceAll("grid-cols-2 md:grid-cols-4", "grid-cols-1");
  const map = {
    fTahun: "sTahun",
    fBahasa: "sBahasa",
    fMedia: "sMedia",
    fStatus: "sStatus",
  };
  for (const [asal, salinan] of Object.entries(map)) {
    $(salinan).value = $(asal).value;
  }
}
function bukaSheet() {
  salinFilterKeSheet();
  $("sheetOverlay").classList.remove("opacity-0", "pointer-events-none");
  $("bottomSheet").classList.remove("translate-y-full");
}
function tutupSheet() {
  $("sheetOverlay").classList.add("opacity-0", "pointer-events-none");
  $("bottomSheet").classList.add("translate-y-full");
}

/* ================================================================
   TOAST
================================================================ */
let timerToast;
function tampilToast(pesan) {
  $("teksToast").textContent = pesan;
  const t = $("toast");
  t.classList.remove("translate-y-24", "opacity-0");
  clearTimeout(timerToast);
  timerToast = setTimeout(
    () => t.classList.add("translate-y-24", "opacity-0"),
    2600,
  );
}

/* ================================================================
   EVENT
================================================================ */
$("formCari").addEventListener("submit", (e) => {
  e.preventDefault();
  render();
});
$("kataKunci").addEventListener("input", () => render());
["fTahun", "fBahasa", "fMedia", "fStatus", "urutkan"].forEach((id) =>
  $(id).addEventListener("change", render),
);

$("btnLanjutan").addEventListener("click", () => {
  const p = $("panelLanjutan");
  const buka = p.classList.toggle("hidden");
  $("btnLanjutan").setAttribute("aria-expanded", String(!buka));
  $("ikonPanah").style.transform = buka ? "" : "rotate(180deg)";
});

$("viewGrid").addEventListener("click", () => setMode("grid"));
$("viewList").addEventListener("click", () => setMode("list"));
function setMode(m) {
  modeTampilan = m;
  $("viewGrid").className =
    "w-10 h-10 grid place-items-center transition " +
    (m === "grid"
      ? "bg-navy text-white"
      : "bg-white text-meta hover:text-navy");
  $("viewList").className =
    "w-10 h-10 grid place-items-center transition " +
    (m === "list"
      ? "bg-navy text-white"
      : "bg-white text-meta hover:text-navy");
  render();
}

$("btnTutupDrawer").addEventListener("click", tutupDrawer);
$("overlay").addEventListener("click", tutupDrawer);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    tutupDrawer();
    tutupSheet();
  }
});

$("btnMenuMobile").addEventListener("click", () =>
  $("menuMobile").classList.toggle("hidden"),
);

$("btnFilterMobile").addEventListener("click", bukaSheet);
$("btnTutupSheet").addEventListener("click", tutupSheet);
$("sheetOverlay").addEventListener("click", tutupSheet);
$("btnTerapkan").addEventListener("click", () => {
  const map = {
    fTahun: "sTahun",
    fBahasa: "sBahasa",
    fMedia: "sMedia",
    fStatus: "sStatus",
  };
  for (const [asal, salinan] of Object.entries(map))
    $(asal).value = $(salinan).value;
  tutupSheet();
  render();
});
$("btnResetSheet").addEventListener("click", () => {
  ["sTahun", "sBahasa", "sMedia", "sStatus"].forEach(
    (id) => ($(id).value = ""),
  );
});

$("btnReset").addEventListener("click", () => {
  $("kataKunci").value = "";
  ["fTahun", "fBahasa", "fMedia", "fStatus"].forEach(
    (id) => ($(id).value = ""),
  );
  render();
});

/* ================================================================
   INIT
================================================================ */
$("jumlahTotal").textContent = KOLEKSI.length.toLocaleString("id-ID");
render();
lucide.createIcons();
