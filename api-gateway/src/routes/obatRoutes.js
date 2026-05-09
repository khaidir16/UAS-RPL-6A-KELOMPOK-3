const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

router.use('/', createProxyMiddleware({
    target: process.env.OBAT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/obat': '',
    },
    onError: (err, req, res) => {
        console.error('[Gateway Error]', err.message);
        res.status(502).json({ error: 'Service Obat sedang down atau tidak merespon.' });
    }
}));

module.exports = router;