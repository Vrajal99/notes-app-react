import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router"; //to get params

//import notes from "../assets/data";
import { Link } from "react-router";
import ArrowLeft from "../assets/arrow-left.svg?react"; //as per svgr doc .svg?react treats the svg as ReactComponent

const NotePage = () => {
  let { id } = useParams(); //remember to destructure it
  let navigate = useNavigate();
  //let note = notes.find((note) => note.id === Number(id));

  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if (id == "new") return;
    let response = await fetch(`http://localhost:8000/notes/${id}`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    let resp = await fetch(`http://localhost:8000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }), //because its a dummy db backend, so explicit;y change the datetime
    });
  };

  let updateNote = async () => {
    let resp = await fetch(`http://localhost:8000/notes/${id}`, {
      method: "PUT", //To update data in db or add data in db
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }), //because its a dummy db backend, so explicit;y change the datetime
    });
  };

  let deleteNote = async () => {
    let resp = await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE", //To update data in db or add data in db
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    navigate(-1);
  };

  //handles submit whne user clicks back button
  let handleSubmit = () => {
    if (id !== "new" && !note.body) {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id == "new" && note != null) {
      createNote();
    }
    navigate(-1);
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>

        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value }); //spread operator to update original note
        }}
        value={note?.body}
      ></textarea>

      {/* we need to add a function above onChange={()=>{}} so that it does not fire immediately*/}
    </div>
  );
};

export default NotePage;
