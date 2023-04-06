const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

const { createUser, getAllUsers, getUserByEmail, validateAndGetUser } = require("../db/models/user");

router.post("/register", async (req, res, next) => {
    console.log("req.body", req.body);
    try {
        const userExists = await getUserByEmail(req.body.email);
        if (userExists) {
            next({
                name: "Error signing up",
                message: "that email is already in use"
            });
        }
        if (req.body.password.length < 8) {
            next({
                name: "Error signing up",
                message: "Password must be a least 7 characters"
            })
        }
        const user = await createUser(req.body);
        console.log("user ==> ", user);
        if (user) {
            const token = jwt.sign({
                id:user.id,
                email: req.body.email
            },
                process.env.JWT_SECRET
            );
            console.log("token ==>", token);
            res.send({
                user,
                message: "Thank you for signing up!",
                token
            })
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

router.get("/", async (req, res, next) => {
    const users = await getAllUsers();
    res.send(users)
})

router.get("/login", async (req, res, next) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            next({
                name: "Missing CredentialsError",
                message: "Please supply both an email and a password"
            })
        }
        const user = await validateAndGetUser(email, password)

        if (user) {
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET
            );
            res.send({
                message: "You're logged in",
                token,
                user
            })
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

module.exports = router