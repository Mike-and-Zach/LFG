import { useState } from "react";
import { callApi } from "../api/utils";

const MessageForm= ({postUserId, postUsername, token}) => {

  const [directMessage, setDirectMessage] = useState("");
  const [showMessageForm, setShowMessageForm] = useState(false);
  const userId = localStorage.getItem("userId");


  const sendDirectMessage = async ( recipientId, recipientUsername) => {
    try {
      const data = callApi({
        method: "POST",
        path: `/direct_message/${recipientId}`,
        body: {
          message_text: directMessage,
          recipient_username: recipientUsername,
        },
        token,
      });
    } catch (err) {
      console.error(err);
    }
  };


    return (
        <div className="message-container">
           {postUserId != userId && token && <button
                        className="message-user-btn"
                        onClick={() => setShowMessageForm(!showMessageForm)}
                      >
                        Message User
                      </button>}
          {showMessageForm && <div className="message-form-container"><form className="message-form">
            <textarea
              type="text"
              placeholder="Message"
              onChange={(e) => setDirectMessage(e.target.value)}
            ></textarea>
            { directMessage.length > 0 &&
               <input
               type="submit"
               value="send"
               className="send-message-btn"
               onClick={() => sendDirectMessage( postUserId, postUsername)}
             />
            }

            
          </form></div>}

        
      </div>
      
      
    )
}

export default MessageForm