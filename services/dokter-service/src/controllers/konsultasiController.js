const konsultasiModel = require("../models/konsultasiModel");

function getAllDokter(req, res) {
  res.json({ service: "dokter-service", message: "Daftar dokter berhasil ditampilkan", data: konsultasiModel.getAllDokter() });
}

function getDokterById(req, res) {
  const dokter = konsultasiModel.getDokterById(req.params.id);
  if (!dokter) return res.status(404).json({ message: "Dokter tidak ditemukan" });
  res.json({ service: "dokter-service", message: "Detail dokter berhasil ditampilkan", data: dokter });
}

function createDokter(req, res) {
  const { nama_dokter, spesialisasi } = req.body;
  if (!nama_dokter || !spesialisasi) return res.status(400).json({ message: "nama_dokter dan spesialisasi wajib diisi" });
  const dokter = konsultasiModel.createDokter(req.body);
  res.status(201).json({ service: "dokter-service", message: "Dokter berhasil ditambahkan", data: dokter });
}

function buatKonsultasi(req, res) {
  const { pasien_id, nama_pasien, dokter_id, keluhan_utama } = req.body;
  if (!pasien_id || !nama_pasien || !dokter_id || !keluhan_utama) return res.status(400).json({ message: "pasien_id, nama_pasien, dokter_id, keluhan_utama wajib diisi" });
  const dokter = konsultasiModel.getDokterById(dokter_id);
  if (!dokter) return res.status(404).json({ message: "Dokter tidak ditemukan" });
  if (!dokter.tersedia) return res.status(400).json({ message: "Dokter sedang tidak tersedia" });
  const konsultasi = konsultasiModel.createKonsultasi(req.body);
  res.status(201).json({ service: "dokter-service", message: "Konsultasi berhasil dibuat", data: konsultasi });
}

function getRiwayatKonsultasiPasien(req, res) {
  const data = konsultasiModel.getKonsultasiByPasien(req.params.pasien_id);
  res.json({ service: "dokter-service", message: "Riwayat konsultasi pasien berhasil ditampilkan", total: data.length, data });
}

function getKonsultasiDokter(req, res) {
  const data = konsultasiModel.getKonsultasiByDokter(req.params.dokter_id);
  res.json({ service: "dokter-service", message: "Daftar konsultasi dokter berhasil ditampilkan", total: data.length, data });
}

function responKonsultasi(req, res) {
  const { diagnosa, rekomendasi } = req.body;
  if (!diagnosa || !rekomendasi) return res.status(400).json({ message: "diagnosa dan rekomendasi wajib diisi" });
  const konsultasi = konsultasiModel.responKonsultasi(req.params.id, req.body);
  if (!konsultasi) return res.status(404).json({ message: "Konsultasi tidak ditemukan" });
  res.json({ service: "dokter-service", message: "Respon dokter berhasil disimpan", data: konsultasi });
}

module.exports = { getAllDokter, getDokterById, createDokter, buatKonsultasi, getRiwayatKonsultasiPasien, getKonsultasiDokter, responKonsultasi };