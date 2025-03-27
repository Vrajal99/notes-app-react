import React, { useState, useEffect } from "react";
//import notes from "../assets/data";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

const NotesListPage = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []); //cannot add async here

  //if you don't add [] it burst with request sending, check network tab to check its effect. it fires for every change

  let getNotes = async () => {
    let response = await fetch("http://localhost:8000/notes/"); //fetch is going to get our notes
    let data = await response.json();
    setNotes(data);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
