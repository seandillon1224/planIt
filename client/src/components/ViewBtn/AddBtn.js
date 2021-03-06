import React from "react";
import "./AddBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const AddBtn = props => (
  <span type = "button" className="btn btn-info add-btn" {...props}>
    View
  </span>
);

export default AddBtn;
