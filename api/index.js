const express = require("express");
const router = express.Router();
// const {} = require("../db/models/user");

// router.use(async (req, res, next) => {
    
// })

const usersRouter = require("./users");
router.use("/users", usersRouter);


module.exports = router