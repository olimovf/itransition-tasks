import { forwardRef } from "react";

const ChatList = forwardRef(({ children }, scrollRef) => {
  return (
    <ul className="messages mb-0 d-flex align-items-start flex-column gap-3">
      {children}
      <span ref={scrollRef}></span>
    </ul>
  );
});

export default ChatList;
