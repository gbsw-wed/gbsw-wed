import "./Post.css";
import { useNavigate } from "react-router-dom";

function Post({ isSignup, data }) {
  const navigate = useNavigate();
  return (
    <div className="post-list">
      {data.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            if (isSignup === false) {
              alert("로그인을 먼저 진행해주세요.");
            } else {
              navigate(`posts/${item.id}`);
            }
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
