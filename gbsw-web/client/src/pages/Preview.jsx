import "./Preview.css";
import React from "react";


function Preview({ size = 30 }) {
  return (
    <div>
      {dummyData.slice(0, 5).map((item, index) => (
        <div className="preview" key={item.id}>
          <div className="preview-title">
            <p
              className="preview-title-p"
              style={{ width: `${size}vw` }}
            >
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