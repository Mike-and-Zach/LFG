import { useState } from "react";
import { callApi } from "../api/utils";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';

const MessageForm= ({postUserId, postUsername, token}) => {

  const [showMessageForm, setShowMessageForm] = useState(false);
  const [directMessage, setDirectMessage] = useState("");
  const userId = localStorage.getItem("userId");

  const sendDirectMessage = async (recipientId, recipientUsername) => {
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
        <div>
        {showMessageForm && (
          <form className="message-form">
            <textarea
              type="text"
              placeholder="Message"
              onChange={(e) => setDirectMessage(e.target.value)}
            ></textarea>
            <div className="send-message-btn-container">
              <input
                type="submit"
                value="send"
                className="send-message-btn"
                onClick={() => sendDirectMessage(postUserId, postUsername)}
              />
        <p className="message-form-arrow-left"><ArrowLeftOutlinedIcon sx={{fontSize: 50}}/></p>

            </div>
          </form>
        )}
        {postUserId != userId && (
          <div className="message-user-btn-container">
        <button
          className="message-user-btn"
          onClick={() => setShowMessageForm(!showMessageForm)}
        >
          Message User
        </button>

        </div>
        
      )}
      </div>
      
      
    )
}

export default MessageForm