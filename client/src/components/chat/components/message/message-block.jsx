import PropTypes from "prop-types";
import styles from "../message/styles.module.css";
import { useState } from "react";
import Emojis from "./emojis";
import smileIcon from "../../../../images/smile.svg";

const MessageBlock = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const isTyping = () => {
    socket.emit("typing", `${localStorage.getItem("user")} is typing...`);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("user")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("user"),
        id: `${socket.id}-${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };

  const toggleEmojis = () => {
    setShowEmojis((prevShowEmojis) => !prevShowEmojis);
  };

  const handleEmojiPick = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji); // Используйте emoji напрямую, если он содержит символ смайлика
    setShowEmojis(false); // Закройте окно смайликов после выбора смайлика
  };

  return (
    <div className={styles.messageBlock}>
      <form className={styles.form} onSubmit={handleSend}>
        <input
          type="text"
          className={styles.userMessage}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={isTyping}
        />
        <div style={{ position: "relative" }}>
          <button className={styles.btn} onClick={toggleEmojis}>
            <img src={smileIcon} alt="" width="16" height="16" />
          </button>
          {showEmojis && <Emojis pickEmoji={handleEmojiPick} />}{" "}
        </div>
        <button type="submit" className={styles.btn}>
          Сказать
        </button>
      </form>
    </div>
  );
};

MessageBlock.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default MessageBlock;
