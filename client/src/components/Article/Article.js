import React from "react";
import formatDate from "../../utils/formatDate";
import { ListItem } from "../List";

const Article = ({ title, url, _id, date, handleClick, buttonText, saved }) => (
  <ListItem>
    <h3>
      <em>{title}</em>{" "}
      <span className="btn-group pull-right">
        <a className="btn btn-default" href={url} rel="noopener noreferrer" target="_blank">
          View Article
        </a>
        <button onClick={() => handleClick(_id)} className="btn btn-primary">
          {buttonText}
        </button>
      </span>
    </h3>
    <p>
      Date {saved ? "Saved" : "Published"}: {formatDate(date)}
    </p>
  </ListItem>
);

export default Article;
