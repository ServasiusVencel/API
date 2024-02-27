// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.user;
const saltRounds = 10;
require("dotenv").config();
const { authenticate } = require('../middleware/index')
const secretAccessToken = 'acaadsadsadadgiwjtiwje9'

exports.register = (req, res) => {
    const plainPassword = req.body.password;

    User.findOne({ username: req.body.username }).then((user) => {
        if (user) {
            return res.status(400).json({ username: "User already exists" });
        } else {
            bcrypt.hash(plainPassword, saltRounds)
                .then((hashedPassword) => {
                    const newUser = new User({
                        username: req.body.username,
                        password: hashedPassword
                    });

                    // Simpan pengguna yang baru diregistrasi ke database
                    newUser.save()
                        .then(() => {
                            res.status(201).json({ status: true, code: 201, message: "User registered successfully" });
                        })
                        .catch((saveError) => {
                            res.status(500).json({ status: false, code: 500, message: saveError.message });
                        });
                })
                .catch((hashError) => {
                    return res.status(500).json({ error: hashError.message });
                });
        }   
    });
};


exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ status: false, code: 401, message: 'Invalid credentials' });
    }

    bcrypt.compare(password, user.password)
        .then((match) => {
            if (match) {
                // const token = generateToken(user); // Generate token upon successful login
                const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_PASS, { expiresIn: '1h' });
                res.json({ status: true, code: 200, token, message: 'Login successful' });
            } else {
                return res.status(401).json({ status: false, code: 401, message: 'Invalid credentials' });
            }
        })
        .catch((error) => {
            return res.status(500).json({ status: false, code: 500, error: error.message });
        });

        
        
};

