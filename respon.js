
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const form = document.querySelector("#my-form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Mencegah reload halaman

  // Ambil nilai dari input form
  const nama = document.querySelector("#nama").value;
  const pesan = document.querySelector("#pesan").value;
  const status = document.querySelector("#status").value;

  // Simpan ke Firebase
  const responseRef = ref(db, "responses");
  push(responseRef, { nama, pesan, status })
    .then(() => {
      alert("Respon berhasil dikirim!");
      form.reset();
    })
    .catch((error) => {
      console.error("Gagal menyimpan data:", error);
    });
});

const responseList = document.querySelector("#response-list");

// Dapatkan data dari Firebase
const responseRef = ref(db, "responses");
onValue(responseRef, (snapshot) => {
  const data = snapshot.val();
  responseList.innerHTML = ""; // Kosongkan daftar sebelum menambahkan data baru

  if (data) {
    // Ambil 3 data terakhir
    const entries = Object.entries(data).slice(-3).reverse();
    entries.forEach(([id, { nama, pesan, status }]) => {
      const responseItem = document.createElement("div");
      responseItem.innerHTML = `
        <h4>${nama} (${status})</h4>
        <p>${pesan}</p>
      `;
      responseList.appendChild(responseItem);
    });
  }
});
