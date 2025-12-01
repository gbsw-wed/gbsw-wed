import { useNavigate } from "react-router-dom";

function Post({ isSignup, data = [], onPostClick }) {
  const navigate = useNavigate();
  return (
    <div className="post-lists">
      {(Array.isArray(data) ? data : []).map((item) => (
        <div
          key={item.post_id}
          onClick={() => {
            if (!isSignup) {
              alert("로그인을 먼저 진행해주세요.");
            } else if (onPostClick) {
              onPostClick(item.post_id);
            }
          }}
          className="post-row"
          style={{ cursor: "pointer" }}
        >
          <span className="col-title">{item.title}</span>
          <span className="col-category">{item.tag || "# 일반"}</span>
          <span className="col-author">{item.username || "익명"}</span>
          <span className="col-date">
            {item.updated_at
              ? item.updated_at.slice(0, 10).replace(/-/g, ".")
              : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Post;
