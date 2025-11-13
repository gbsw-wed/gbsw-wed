import "./Preview.css";
import React from "react";
import { useState } from "react";
import data from "./data.js";

function Preview(props) {
  let [Post, setPost] = useState(data);
  return (
    <div>
      {Post.slice(0, 5).map((item, index) => (
        <div className="preview" key={index}>
          <div className="preview-title">
            <p className="preview-title-p" style={{ width: `${props.size}vw` }}>
              {item.title}
            </p>
            <span className="preview-title-span">{item.comments}</span>
          </div>
          <div className="preview-about">
            <p className="preview-about-p">{item.category}</p>
            <p className="preview-about-p">{item.lastEdited}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Preview;
