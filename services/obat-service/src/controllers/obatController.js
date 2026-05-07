const obatModel = require("../models/obatModel");

function getAllObat(req, res) {
  res.json({
    service: "obat-service",
    message: "Daftar obat berhasil ditampilkan",
    data: obatModel.getAllObat()
  });
}

function getObatById(req, res) {
  const obat = obatModel.getObatById(req.params.id);

  if (!obat) {
    return res.status(404).json({
      message: "Obat tidak ditemukan"
    });
  }

  res.json({
    service: "obat-service",
    message: "Detail obat berhasil ditampilkan",
    data: obat
  });
}

function createObat(req, res) {
  const { nama_obat, kategori, stok, harga, deskripsi } = req.body;

  if (!nama_obat || !kategori) {
    return res.status(400).json({
      message: "nama_obat dan kategori wajib diisi"
    });
  }

  const obat = obatModel.createObat({
    nama_obat,
    kategori,
    stok,
    harga,
    deskripsi
  });

  res.status(201).json({
    service: "obat-service",
    message: "Obat berhasil ditambahkan",
    data: obat
  });
}

function updateObat(req, res) {
  const obat = obatModel.updateObat(req.params.id, req.body);

  if (!obat) {
    return res.status(404).json({
      message: "Obat tidak ditemukan"
    });
  }

  res.json({
    service: "obat-service",
    message: "Data obat berhasil diperbarui",
    data: obat
  });
}

function updateStok(req, res) {
  const { stok } = req.body;

  if (stok === undefined) {
    return res.status(400).json({
      message: "stok wajib diisi"
    });
  }

  const obat = obatModel.updateStok(req.params.id, stok);

  if (!obat) {
    return res.status(404).json({
      message: "Obat tidak ditemukan"
    });
  }

  res.json({
    service: "obat-service",
    message: "Stok obat berhasil diperbarui",
    data: obat
  });
}

function deleteObat(req, res) {
  const obat = obatModel.deleteObat(req.params.id);

  if (!obat) {
    return res.status(404).json({
      message: "Obat tidak ditemukan"
    });
  }

  res.json({
    service: "obat-service",
    message: "Obat berhasil dihapus",
    data: obat
  });
}

module.exports = {
  getAllObat,
  getObatById,
  createObat,
  updateObat,
  updateStok,
  deleteObat
};
