import Sidebar from "./components/sidebar/sidebar.jsx";
import Body from "./components/body/body.jsx";
import MessageBlock from "./components/message/message-block.jsx";
import styles from "./styles.module.css";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    socket.on("response", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    socket.on("responseTyping", (data) => {
      setStatus(data);
      setTimeout(() => setStatus(""), 10000);
    });
  }, [socket]);

  return (
    <div className={styles.chat}>
      <Sidebar socket={socket} />
      <main className={styles.main}>
        <Body messages={messages} status={status} />
        <MessageBlock socket={socket} />
      </main>
    </div>
  );
};

ChatPage.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default ChatPage;
