let dokters = [
  { id: 1, nama_dokter: "Dr. Andi Pratama", spesialisasi: "Umum", no_lisensi: "DU-001", pengalaman: 5, tersedia: true, rating: 4.8 },
  { id: 2, nama_dokter: "Dr. Sari Dewi", spesialisasi: "Anak", no_lisensi: "DA-002", pengalaman: 8, tersedia: true, rating: 4.9 },
  { id: 3, nama_dokter: "Dr. Budi Santoso", spesialisasi: "Jantung", no_lisensi: "DJ-003", pengalaman: 12, tersedia: false, rating: 4.7 }
];

let konsultasis = [];
let nextDokterID = 4;
let nextKonsultasiId = 1;

function getAllDokter() { return dokters; }
function getDokterById(id) { return dokters.find((d) => d.id === Number(id)); }
function createDokter(data) {
  const newDokter = { id: nextDokterID++, nama_dokter: data.nama_dokter, spesialisasi: data.spesialisasi, no_lisensi: data.no_lisensi || "", pengalaman: Number(data.pengalaman) || 0, tersedia: true, rating: 0 };
  dokters.push(newDokter);
  return newDokter;
}

function getKonsultasiByPasien(pasien_id) { return konsultasis.filter((k) => k.pasien_id === pasien_id); }
function getKonsultasiByDokter(dokter_id) { return konsultasis.filter((k) => k.dokter_id === Number(dokter_id)); }
function createKonsultasi(data) {
  const dokter = getDokterById(data.dokter_id);
  const newKonsultasi = { id: nextKonsultasiId++, pasien_id: data.pasien_id, nama_pasien: data.nama_pasien, dokter_id: Number(data.dokter_id), nama_dokter: dokter ? dokter.nama_dokter : "", spesialisasi: dokter ? dokter.spesialisasi : "", keluhan_utama: data.keluhan_utama, deskripsi_keluhan: data.deskripsi_keluhan || "", status: "menunggu", respon_dokter: null, tanggal_konsultasi: new Date().toISOString() };
  konsultasis.push(newKonsultasi);
  return newKonsultasi;
}
function responKonsultasi(id, data) {
  const konsultasi = konsultasis.find((k) => k.id === Number(id));
  if (!konsultasi) return null;
  konsultasi.respon_dokter = { diagnosa: data.diagnosa, rekomendasi: data.rekomendasi, resep: data.resep || [], catatan: data.catatan || "" };
  konsultasi.status = "selesai";
  return konsultasi;
}

module.exports = { getAllDokter, getDokterById, createDokter, getKonsultasiByPasien, getKonsultasiByDokter, createKonsultasi, responKonsultasi };