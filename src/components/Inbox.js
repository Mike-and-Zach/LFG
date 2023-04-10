import { useEffect, useState } from "react";
import { callApi } from "../api/utils";


const Inbox = ({token}) => {
    const [userInbox, setUserInbox] = useState([]);
    const userId = localStorage.getItem("userId")

    console.log('userInbox :>> ', userInbox);
    const fetchUserInbox = async () => {
        try {
            const data = await callApi({
                path:`/direct_message/user_inbox/${userId}`,
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
                    <div></div>
                )
            })}
            <hr />
        </div>
    )
}

export default Inbox;