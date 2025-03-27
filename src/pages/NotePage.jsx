import React from "react";
import { useParams } from "react-router"; //to get params
import notes from "../assets/data";
import { Link } from "react-router";
import ArrowLeft from "../assets/arrow-left.svg?react"; //as per svgr doc .svg?react treats the svg as ReactComponent

const NotePage = () => {
  let { id } = useParams(); //remember to destructure it

  let note = notes.find((note) => note.id === Number(id));

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft />
          </Link>
        </h3>
      </div>
      <textarea value={note?.body}></textarea>
    </div>
  );
};

export default NotePage;
