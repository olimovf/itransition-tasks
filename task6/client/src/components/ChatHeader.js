const ChatHeader = ({ title }) => {
  return (
    <div className="chat-header d-flex justify-content-between">
      <h2 className="chat-title mb-0 text-uppercase d-flex align-items-center text-light user-select-none">
        <span className="bg-light" /> {title}
      </h2>
    </div>
  );
};

export default ChatHeader;
