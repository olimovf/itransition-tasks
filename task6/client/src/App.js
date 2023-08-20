import React, { useEffect, useRef, useState } from "react";
import { MESSAGES_URL, TAGS_URL } from "./api/urls";
import axios from "./api/axios";
import ChatBody from "./components/ChatBody";
import ChatHeader from "./components/ChatHeader";
import ChatList from "./components/ChatList";
import Message from "./components/Message";
import Tag from "./components/Tag";
import { socket } from "./socket";

const App = () => {
  // ======== MESSAGES ======== /
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [isMessageSending, setIsMessageSending] = useState(false);
  const scrollRef = useRef(null);

  // ======== TAGS ======== /
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [isTagAdding, setIsTagAdding] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState([]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsMessageSending(true);
      const resp = await axios.post(MESSAGES_URL, {
        text: newMessageText,
      });

      setMessages((prevMessages) => [...prevMessages, resp.data]);
      socket.emit("user-message", resp.data);

      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Error sending message:", err.message);
    } finally {
      setIsMessageSending(false);
    }

    setNewMessageText("");
    await fetchMessages();
    await fetchTags();
  };

  const handleTagSubmit = async (e) => {
    e.preventDefault();

    if (!tags.includes(tagName)) {
      setTags((prevTags) => {
        const combinedTags = [...prevTags, tagName];
        sessionStorage.setItem("tags", JSON.stringify(combinedTags));
        return combinedTags;
      });
    }

    setTagName("");

    try {
      setIsTagAdding(true);
      await axios.post(TAGS_URL, { name: tagName });
    } catch (err) {
      console.error("Error adding tag:", err.message);
    } finally {
      setIsTagAdding(false);
    }

    await fetchTags();
  };

  const deleteTag = (tagName) => {
    const tagsLeft = tags.filter((tag) => tag !== tagName);
    sessionStorage.setItem("tags", JSON.stringify(tagsLeft));
    setTags(tagsLeft);
  };

  const fetchTags = async () => {
    try {
      const resp = await axios.get(TAGS_URL);
      setSuggestedTags(resp.data?.map((item) => item.name));
    } catch (err) {
      console.error("Error fetching tags:", err.message);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [tags]);

  // socket
  useEffect(() => {
    socket.on("message", (newMessage) => {
      const tags = JSON.parse(sessionStorage.getItem("tags")) || [];
      if (
        newMessage.tags.length === 0 ||
        newMessage.tags.some((t) => tags.includes(t))
      ) {
        console.log(newMessage.tags, tags);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // ===== FETCH MESSAGES BASED ON TAGS ====== //
  const fetchMessages = async () => {
    try {
      const resp = await axios.get(MESSAGES_URL);
      const data = resp.data;
      const filteredData = data.filter(
        (msg) =>
          msg.tags.some((tag) => tags.includes(tag)) || msg.tags.length === 0
      );
      setMessages(filteredData);
    } catch (err) {
      console.error("Error fetching messages:", err.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [tags]);

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col col-12 col-md-5 p-2">
          <div className="tag-box">
            <ChatHeader title="My tags" />
            <ChatBody>
              <ul className="tags mb-0">
                {tags.map((tag, i) => (
                  <Tag key={i} tagName={tag} onDelete={deleteTag} />
                ))}
              </ul>
              <form
                className="form py-3 px-4 d-flex tag-form"
                onSubmit={handleTagSubmit}
              >
                <div className="autocomplete-box p-3 w-100">
                  <ul className="autocomplete px-2 m-0 py-2">
                    {suggestedTags
                      .filter(
                        (tag) =>
                          tagName && tag.startsWith(tagName) && tag !== tagName
                      )
                      .slice(0, 5)
                      .map((tag, ind) => (
                        <li
                          className="p-1"
                          key={ind}
                          onClick={() => setTagName(tag)}
                        >
                          {tag}
                        </li>
                      ))}
                  </ul>
                </div>
                <input
                  className="pe-3 py-1"
                  type="text"
                  placeholder="Enter your tag"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value.toLowerCase())}
                />
                <button
                  className="d-flex align-items-center"
                  disabled={
                    !tagName.trim() || tags.includes(tagName) || isTagAdding
                  }
                >
                  <i className="bi bi-plus-circle"></i>
                </button>
              </form>
            </ChatBody>
          </div>
        </div>
        <div className="col col-12 col-md-7 p-2">
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
                onSubmit={handleMessageSubmit}
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
                  disabled={!newMessageText.trim() || isMessageSending}
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
