const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db/models/user");

router.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    if (!auth) { 
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
        if (id) {
          req.user = await getUserById(id);
          next();
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });

const usersRouter = require("./users");
router.use("/users", usersRouter);
const postsRouter = require("./posts")
router.use("/posts", postsRouter)
const directMessage = require("./inbox")
router.use("/direct_message", directMessage)


module.exports = router