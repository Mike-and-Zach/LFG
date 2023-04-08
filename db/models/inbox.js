const { client } = require("../client")

async function getUserInboxById(userId) {
    const { rows } = await client.query(`
        SELECT * FROM direct_messages
        WHERE recipient_id = $1
    `, [userId])

    return rows
}

async function sendDirectMessage(senderId, recipientId, messageText) {
    const { rows: [message] } = await client.query(`
        INSERT INTO direct_messages(sender_id, recipient_id, message_text)
        VALUES($1, $2, $3)
        RETURNING *;
    `, [senderId, recipientId, messageText])

    return message
}

module.exports = {
getUserInboxById,
sendDirectMessage
}