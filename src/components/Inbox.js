import { useEffect, useState } from "react";
import { callApi } from "../api/utils";
import moment from "moment";


const Inbox = ({token}) => {
    const [userInbox, setUserInbox] = useState([]);

    const timeNow = moment();
    
    const fetchUserInbox = async () => {
        try {
            const data = await callApi({
                path:"/direct_message/user_inbox",
                token
            })
            setUserInbox(data)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUserInbox();
    }, []);

    return (
        <div className="inbox-container">
            <h3 className="inbox-header">Inbox</h3>
            {userInbox.map(message => {
                return (
                    <div key={message.id} className="inbox-inner">
                        <div className="inbox-user-and-time">
                            <p className="sender-username">{message["sender_username"]}</p>
                            <p className="inbox-sent-time">{timeNow.diff(message["sent_time"], "minutes")} min ago</p>
                        </div>
                        <p className="inbox-message">{message["message_text"]}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Inbox;