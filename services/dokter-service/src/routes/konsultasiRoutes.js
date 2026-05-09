const express = require("express");
const router = express.Router();
const {
  getAllDokter,
  getDokterById,
  createDokter,
  buatKonsultasi,
  getRiwayatKonsultasiPasien,
  getKonsultasiDokter,
  responKonsultasi
} = require("../controllers/konsultasiController");

router.get("/dokter", getAllDokter);
router.get("/dokter/:id", getDokterById);
router.post("/dokter", createDokter);

router.post("/konsultasi", buatKonsultasi);
router.get("/konsultasi/pasien/:pasien_id", getRiwayatKonsultasiPasien);
router.get("/konsultasi/dokter/:dokter_id", getKonsultasiDokter);
router.put("/konsultasi/:id/respon", responKonsultasi);

router.get("/health", (req, res) => {
  res.json({ status: "ok", service: "dokter-service" });
});

module.exports = router;