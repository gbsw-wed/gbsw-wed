import "./Post.css";
import { Link, useNavigate } from "react-router-dom";

function Post({ data }) {
  const navigate = useNavigate();
  return (
    <div className="post-list">
      {data.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            navigate(`posts/${item.id}`);
          }}
          className="post-row"
        >
          <span className="col-title">{item.title}</span>
          <span className="col-category">{item.category}</span>
          <span className="col-author">{item.author}</span>
          <span className="col-date">{item.lastEdited}</span>
        </div>
      ))}
    </div>
  );
}

export default Post;
