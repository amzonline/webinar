var express = require('express');
var router = express.Router();
var QRCode = require('qrcode');

/* GET home page. */
router.get('/:text', function (req, res, next) {
    const text = req.params.text;

    QRCode.toDataURL(text, function (err, url) {
        let data = url.replace(/.*,/, '');
        let image = new Buffer(data, 'base64');

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': image.length
        });
        res.end(image);
    });
});

module.exports = router;
