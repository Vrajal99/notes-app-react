import React from "react";
import { Link } from "react-router";
//props: immutable form of data passed down; data that cna be passed down to a child component

//state: can be changed,we can update
const ListItem = ({ note }) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{note.body}</h3>
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
