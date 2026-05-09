require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dokterRoutes = require('./routes/dokterRoutes');
const obatRoutes = require('./routes/obatRoutes'); 
const pengantaranRoutes = require('./routes/pengantaranRoutes'); 
const authMiddleware = require('./middleware/authMiddleware');  

const app = express();

// Middleware Global
app.use(cors());
app.use(morgan('dev')); // Untuk melihat log request di terminal

// Setup Routing Proxy
// Setup Routing Proxy dengan Satpam (authMiddleware)
app.use('/api/dokter', authMiddleware, dokterRoutes);
app.use('/api/obat', authMiddleware, obatRoutes); 
app.use('/api/pengantaran', authMiddleware, pengantaranRoutes);

// Endpoint untuk cek status API Gateway
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API Gateway berjalan normal 🚀' });
});

// Jalankan Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});