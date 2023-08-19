import React, { useEffect, useRef, useState } from "react";
import { MESSAGES_URL } from "./api/urls";
import axios from "./api/axios";
import ChatBody from "./components/ChatBody";
import ChatHeader from "./components/ChatHeader";
import ChatList from "./components/ChatList";
import Message from "./components/Message";
import Tag from "./components/Tag";
import { socket } from "./socket";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");
  const scrollRef = useRef(null);
  const [isSending, setIsSending] = useState(false);

  const fetchMessages = async () => {
    try {
      const resp = await axios.get(MESSAGES_URL);
      setMessages(resp.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();

    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSendMessage = async () => {
    try {
      setIsSending(true);
      const resp = await axios.post(MESSAGES_URL, {
        text: newMessageText,
      });

      setMessages((prevMessages) => [...prevMessages, resp.data]);
      socket.emit("user-message", resp.data);

      setNewMessageText("");

      scrollRef.current.scrollIntoView({
        behavior: "smooth",
      });
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-12 col-md-5 p-2">
          <div className="tag-box">
            <ChatHeader title="My tags" />
            <ChatBody>
              <ul className="tags mb-0">
                {[
                  "javascript",
                  "react",
                  "angular",
                  "python",
                  "c++",
                  "frontend",
                ].map((tag, i) => (
                  <Tag key={i} tagName={tag} />
                ))}
              </ul>
              <form className="form py-3 px-4 d-flex">
                <input
                  className="pe-3 py-1"
                  type="text"
                  placeholder="Enter your tags"
                />
                <button className="d-flex align-items-center">
                  <i className="bi bi-plus-circle"></i>
                </button>
              </form>
            </ChatBody>
          </div>
        </div>
        <div className="col-12 col-md-7 p-2">
          <div className="chat-box">
            <ChatHeader title="General chat" />
            <ChatBody>
              <ChatList ref={scrollRef}>
                {messages.map(({ text, timestamp, tags }, ind) => (
                  <Message
                    key={ind}
                    text={text}
                    timestamp={timestamp}
                    tags={tags}
                  />
                ))}
              </ChatList>
              <form
                className="form py-3 px-4 d-flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <input
                  className="pe-3 py-1"
                  type="text"
                  placeholder="Enter your message"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                />
                <button
                  className="d-flex align-items-center"
                  disabled={!newMessageText.trim() || isSending}
                >
                  <i className="bi bi-send"></i>
                </button>
              </form>
            </ChatBody>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
