require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const obatRoutes = require("./routes/obatRoutes");

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    service: process.env.SERVICE_NAME || "Obat Service",
    message: "Service manajemen obat dan stok berjalan",
    endpoints: {
      daftar_obat: "GET /api/obat",
      detail_obat: "GET /api/obat/:id",
      tambah_obat: "POST /api/obat",
      update_obat: "PUT /api/obat/:id",
      update_stok: "PUT /api/obat/:id/stok",
      hapus_obat: "DELETE /api/obat/:id",
      health_check: "GET /api/obat/health"
    }
  });
});

app.use("/api/obat", obatRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint tidak ditemukan di obat-service"
  });
});

app.listen(PORT, () => {
  console.log(`Obat Service berjalan di http://localhost:${PORT}`);
});
