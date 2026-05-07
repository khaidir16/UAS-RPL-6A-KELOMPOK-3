const express = require("express");
const router = express.Router();
const obatController = require("../controllers/obatController");

router.get("/health", (req, res) => {
  res.json({
    service: "obat-service",
    status: "running",
    port: 8001
  });
});

router.get("/", obatController.getAllObat);
router.get("/:id", obatController.getObatById);
router.post("/", obatController.createObat);
router.put("/:id", obatController.updateObat);
router.put("/:id/stok", obatController.updateStok);
router.delete("/:id", obatController.deleteObat);

module.exports = router;
