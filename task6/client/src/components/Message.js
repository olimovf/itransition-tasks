import { format } from "date-fns";

const Message = ({ text, timestamp, tags }) => {
  return (
    <li className="msg reverse">
      {text}
      <div>{tags.map((tag) => `#${tag}`).join(" ")}</div>
      <span className="msg-date text-end d-block">
        {format(new Date(timestamp), "HH:mm")}
      </span>
    </li>
  );
};

export default Message;
