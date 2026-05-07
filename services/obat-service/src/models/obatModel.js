let obats = [
  {
    id: 1,
    nama_obat: "Paracetamol",
    kategori: "Obat Demam",
    stok: 100,
    harga: 5000,
    deskripsi: "Obat untuk membantu meredakan demam dan nyeri ringan."
  },
  {
    id: 2,
    nama_obat: "Amoxicillin",
    kategori: "Antibiotik",
    stok: 40,
    harga: 12000,
    deskripsi: "Antibiotik yang digunakan sesuai resep dokter."
  },
  {
    id: 3,
    nama_obat: "Vitamin C",
    kategori: "Vitamin",
    stok: 75,
    harga: 8000,
    deskripsi: "Suplemen untuk membantu menjaga daya tahan tubuh."
  }
];

let nextId = 4;

function getAllObat() {
  return obats;
}

function getObatById(id) {
  return obats.find((obat) => obat.id === Number(id));
}

function createObat(data) {
  const newObat = {
    id: nextId++,
    nama_obat: data.nama_obat,
    kategori: data.kategori,
    stok: Number(data.stok) || 0,
    harga: Number(data.harga) || 0,
    deskripsi: data.deskripsi || ""
  };

  obats.push(newObat);
  return newObat;
}

function updateObat(id, data) {
  const obat = getObatById(id);

  if (!obat) {
    return null;
  }

  obat.nama_obat = data.nama_obat ?? obat.nama_obat;
  obat.kategori = data.kategori ?? obat.kategori;
  obat.stok = data.stok !== undefined ? Number(data.stok) : obat.stok;
  obat.harga = data.harga !== undefined ? Number(data.harga) : obat.harga;
  obat.deskripsi = data.deskripsi ?? obat.deskripsi;

  return obat;
}

function updateStok(id, stok) {
  const obat = getObatById(id);

  if (!obat) {
    return null;
  }

  obat.stok = Number(stok);
  return obat;
}

function deleteObat(id) {
  const index = obats.findIndex((obat) => obat.id === Number(id));

  if (index === -1) {
    return null;
  }

  const deletedObat = obats.splice(index, 1);
  return deletedObat[0];
}

module.exports = {
  getAllObat,
  getObatById,
  createObat,
  updateObat,
  updateStok,
  deleteObat
};
