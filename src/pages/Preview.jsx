import "./Preview.css";

function Preview() {
  return (
    <div className="preview">
      <div className="preview-title">
        <h4 className="preview-title-h4">제목</h4>
        <span className="preview-title-span">댓글수</span>
      </div>
      <div className="preview-about">
        <p className="preview-about-p"># 카테고리</p>
        <p className="preview-about-p">글생성일</p>
      </div>
    </div>
  );
}
export default Preview;
