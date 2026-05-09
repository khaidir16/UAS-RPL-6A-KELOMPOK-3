const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

router.use('/', createProxyMiddleware({
    target: process.env.DOKTER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/dokter': '',
    },
    onError: (err, req, res) => {
        console.error('[Gateway Error]', err.message);
        res.status(502).json({ error: 'Service Dokter sedang down atau tidak merespon.' });
    }
}));

module.exports = router;