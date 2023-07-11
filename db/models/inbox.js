const { client } = require("../client")

async function getUserInboxById(userId) {
    const { rows } = await client.query(`
        SELECT * FROM direct_messages
        WHERE recipient_id = $1
    `, [userId])

    return rows
}

async function sendDirectMessage(senderId, senderUsername, recipientUsername, recipientId, messageText) {
    const { rows: [message] } = await client.query(`
        INSERT INTO direct_messages(sender_id, sender_username, recipient_username, recipient_id, message_text)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
    `, [senderId, senderUsername, recipientUsername, recipientId, messageText])

    return message
}

module.exports = {
getUserInboxById,
sendDirectMessage
}