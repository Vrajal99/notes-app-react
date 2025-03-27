import React from "react";
import { Link } from "react-router";
import AddIcon from "../assets/add.svg?react";

const AddButton = () => {
  return (
    <Link to="/note/new" className="floating-button">
      <AddIcon />
    </Link>
  );
};

export default AddButton;
