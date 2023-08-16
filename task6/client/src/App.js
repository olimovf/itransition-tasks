import React, { useState } from "react";
import ChatHeader from "./components/ChatHeader";

import Tag from "./components/Tag";

const App = () => {
  return (
    <div className="container">
      <div className="tag-box">
        <ChatHeader title="My tags" />
        <div className="chat-main">
          <ul className="tags">
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
          <div className="input">
            <input type="text" placeholder="Enter your tags" />
            <button>ADD</button>
          </div>
        </div>
      </div>
      <div className="chat-box">
        <ChatHeader title="General chat" />
        <div className="chat-main">
          <ul className="messages">
            <li className="msg" data-time="10:53">
              Hi, Mark! I made a new design for Messenger App.
            </li>
            <li className="msg reverse" data-time="10:57">
              Yo! Send it to my assistant and we'll review it during the year.
            </li>
            <li className="msg" data-time="11:03">
              But Mark ...
            </li>
            <li className="msg reverse" data-time="11:05">
              You were blocked by the user.
            </li>
          </ul>
          <div className="input">
            <input type="text" placeholder="Enter your message" />
            <button>SEND</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
