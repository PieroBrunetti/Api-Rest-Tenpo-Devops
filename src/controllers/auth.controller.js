const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        res.send({
            message: "Usuario registrado correctamente"
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User Not found."
            });
        }
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid user or password"
            });
        }
        let token = jwt.sign({
            id: user.id
        }, process.env.SECRET, {
            expiresIn: parseInt(process.env.JWT_EXPIRE)
        });
        res.status(200).send({
            username: user.username,
            accessToken: token
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};