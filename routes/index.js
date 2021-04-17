const express = require('express');
const router = express.Router();

const { createProxyMiddleware } = require ('http-proxy-middleware');

router.use('/api', createProxyMiddleware({
    target: 'http://localhost:5050',
    headers: {
        accept: 'application/json, application/x-www-form-urlencoded'
    },
    changeOrigin: true
}))

router.use('/ums', createProxyMiddleware({
    target: 'http://localhost:5050',
    headers: {
        accept: 'application/json, application/x-www-form-urlencoded'
    },
    changeOrigin: true
}))

router.get('/', (req, res) => {
    res.render('index')
})

router.use((req, res) => {
    res.status(404);
    res.render("error", { layout: "errorLayout.hbs", errormessage: "you've lost your way, this page doesn't exist"})
})

module.exports = router;