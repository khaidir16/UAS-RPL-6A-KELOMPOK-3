require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const konsultasiRoutes = require("./routes/konsultasiRoutes");

const app = express();
const PORT = process.env.PORT || 8002;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    service: process.env.SERVICE_NAME || "Dokter Service",
    message: "Service dokter online dan konsultasi berjalan",
    endpoints: {
      daftar_dokter: "GET /api/dokter",
      detail_dokter: "GET /api/dokter/:id",
      tambah_dokter: "POST /api/dokter",
      buat_konsultasi: "POST /api/konsultasi",
      riwayat_pasien: "GET /api/konsultasi/pasien/:pasien_id",
      konsultasi_dokter: "GET /api/konsultasi/dokter/:dokter_id",
      respon_konsultasi: "PUT /api/konsultasi/:id/respon",
      health_check: "GET /api/health"
    }
  });
});

app.use("/api", konsultasiRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint tidak ditemukan di dokter-service"
  });
});

app.listen(PORT, () => {
  console.log(`Dokter Service berjalan di http://localhost:${PORT}`);
});