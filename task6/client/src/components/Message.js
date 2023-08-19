import { format } from "date-fns";

const Message = ({ text, timestamp, tags }) => {
  return (
    <li className="msg reverse">
      {text}
      <div>{tags.join(" ")}</div>
      <span className="msg-date text-end d-block">
        {format(new Date(timestamp), "HH:mm")}
      </span>
    </li>
  );
};

export default Message;
