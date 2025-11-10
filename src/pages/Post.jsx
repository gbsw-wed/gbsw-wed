import "./Post.css";

function Post({ data }) {
  return (
    <div className="post-list">
      {data.map((item, index) => (
        <div key={index} className="post-row">
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
