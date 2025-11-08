import { useState } from "react";
import data from "./data";
import "./Post.css";

function Post() {
  let [Post, setPost] = useState(data);
  return (
    <div className="post-list">
      {Post.slice(0, 3).map((item, index) => (
        <div key={index} className="post-row">
          <span className="col-title">{Post[index].title}</span>
          <span className="col-category">{Post[index].category}</span>
          <span className="col-author">{Post[index].author}</span>
          <span className="col-date">{Post[index].lastEdited}</span>
        </div>
      ))}
    </div>
  );
}

export default Post;
