const express = require("express");
const { sendDirectMessage, getUserInboxById } = require("../db/models/inbox");
const router = express.Router();

router.get("/user_inbox", async (req, res, next) => {
    try {
        const userId = req.user.id;
        const inbox = await getUserInboxById(userId)
        res.send(inbox)
    } catch (err) {
        next(console.log(err))
    }
})

router.post("/:recipientId", async (req, res, next) => {
    try {
        const {recipientId} = req.params
        const senderId = req.user.id
        const sender_username = req.user.username
        console.log('senderId :>> ', typeof(senderId));
        const { message_text, recipient_username } = req.body
        const directMessage = await sendDirectMessage(senderId, sender_username, recipient_username, recipientId, message_text)
        res.send(directMessage)
    } catch (err) {
        next(console.log(err))
        
    }
})


module.exports = router