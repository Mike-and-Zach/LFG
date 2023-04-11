import { useEffect, useState } from "react";
import { callApi } from "../api/utils";


const Inbox = ({token}) => {
    const [userInbox, setUserInbox] = useState([]);

    console.log('userInbox :>> ', userInbox);
    const fetchUserInbox = async () => {
        try {
            const data = await callApi({
                path:"/direct_message/user_inbox",
                token
            })
            setUserInbox(data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUserInbox();
    }, [])
    return (
        <div>
            <h3>Messages:</h3>
            {userInbox.map(message => {
                return (
                    <div key={message.id}>
                        <p>Sender: {message["sender_username"]}</p>
                        <p>{message["message_text"]}</p>
                        <p>{message["sent_time"]}</p>
                    </div>
                )
            })}
            <hr />
        </div>
    )
}

export default Inbox;