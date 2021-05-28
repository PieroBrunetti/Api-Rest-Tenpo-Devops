var express = require('express');
var router = express.Router();
router.get("/", (req, res) => {
    console.log('wii');
    res.send({
        message: "Hola mundo"
    });
});
module.exports = router;