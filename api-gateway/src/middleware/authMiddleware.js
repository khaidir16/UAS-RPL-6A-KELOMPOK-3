const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Ambil header 'Authorization' dari request client
    const authHeader = req.headers['authorization'];
    
    // 2. Ambil tokennya saja (Biasanya formatnya: "Bearer <token_acak>")
    const token = authHeader && authHeader.split(' ')[1];

    // 3. Kalau token tidak ada, langsung tolak di gerbang!
    if (!token) {
        return res.status(401).json({ error: 'Akses Ditolak! Token tidak ditemukan.' });
    }

    try {
        // 4. Cek apakah tokennya asli dan belum kadaluarsa
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // 5. Simpan data user (opsional) dan persilakan masuk ke route tujuan
        req.user = verified;
        next(); 
    } catch (err) {
        // Kalau token palsu / salah
        return res.status(403).json({ error: 'Token tidak valid atau sudah kadaluarsa.' });
    }
};

module.exports = verifyToken;