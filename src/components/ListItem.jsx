import React from "react";
import { Link } from "react-router";

let getTitle = (note) => {
  const title = note.body.split("\n")[0];
  return title.slice(0, 45);
};

let getContent = (note) => {
  let title = getTitle(note);
  let content = note.body.replaceAll("\n", " ");
  content = content.replaceAll(title, "");

  return content.length > 45 ? content.slice(0, 45) : content;
};

let getDate = (note) => {
  return new Date(note.updated).toLocaleDateString();
};

const ListItem = ({ note }) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span>{getDate(note)}</span>
          {getContent(note)}
        </p>
      </div>
    </Link>
  );
};

export default ListItem;

//can also be written as strcuctured notice the props.note.body

// const ListItem = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <h3>{props.note.body}</h3>
//     </div>
//   );
// };
