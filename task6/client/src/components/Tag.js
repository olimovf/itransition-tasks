const Tag = ({ tagName }) => {
  return (
    <li className="tag d-inline-flex align-items-center gap-1 m-1">
      <span className="tag-name text-lowercase">{tagName}</span>
      <span className="delete-btn d-grid place-items-center">
        <svg
          fill="var(--tag-color)"
          height="16"
          width="16"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </span>
    </li>
  );
};

export default Tag;
