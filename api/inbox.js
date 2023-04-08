const express = require("express");
const { sendDirectMessage } = require("../db/models/inbox");
const router = express.Router();

router.post("/:senderId/:recipientId", async (req, res, next) => {
    try {
        const senderId = req.params.senderId;
        const recipientId = req.params.recipientId;
        const {message} = req.body
        const directMessage = await sendDirectMessage(senderId, recipientId, message)
        res.send(directMessage)
    } catch (err) {
        console.log(err);
        
    }
})


module.exports = router