// Simulasi data pasar real-time (bisa diubah saat integrasi API)
const HARGATON_IDR = 85000;
const RATIO_KUDA_TON = 0.001; // 1 KUDA = 0.001 TON
const DISKON_KUDA = 0.05; // 5% diskon

function updateTotal() {
    const serviceSelect = document.getElementById('serviceType');
    const hargaIdr = parseFloat(serviceSelect.value);
    const methodIdr = document.getElementById('methodIdr').checked;
    const summaryElement = document.getElementById('summaryAmount');

    if (methodIdr) {
        summaryElement.innerHTML = `Total Tagihan: <strong>Rp ${hargaIdr.toLocaleString('id-ID')}</strong>`;
    } else {
        // Menghitung konversi ke KUDA
        const hargaKudaIdr = RATIO_KUDA_TON * HARGATON_IDR;
        const totalKuda = (hargaIdr / hargaKudaIdr) * (1 - DISKON_KUDA);
        summaryElement.innerHTML = `Total Tagihan: <strong>${totalKuda.toFixed(2)} $KUDA</strong>`;
    }
}

// Event Listener saat mengganti dropdown layanan
document.getElementById('serviceType').addEventListener('change', updateTotal);

// Menjalankan fungsi pertama kali saat halaman dimuat
updateTotal();

async function processPayment() {
    const methodIdr = document.getElementById('methodIdr').checked;
    const phone = document.getElementById('phoneNo').value;
    const serviceSelect = document.getElementById('serviceType');
    const selectedItem = serviceSelect.options[serviceSelect.selectedIndex].getAttribute('data-name');
    const hargaIdr = parseFloat(serviceSelect.value);
    
    if (!phone) {
        alert("Mohon masukkan nomor tujuan atau ID pelanggan.");
        return;
    }

    if (methodIdr) {
        alert(`Memproses tagihan ${selectedItem} sebesar Rp ${hargaIdr.toLocaleString('id-ID')} via Rupiah.`);
    } else {
        alert("Membuka TON Connect (Tonkeeper) untuk pembayaran Token $KUDA...");
    }
}