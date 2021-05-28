var express = require('express');
var router = express.Router();
const verifyToken = require("../middleware/authJwt");
const controller = require("../controllers/add.controller");
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
router.post("/api/add", [verifyToken], controller.add);
module.exports = router;