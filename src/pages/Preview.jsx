import "./Preview.css";

function Preview() {
  return (
    <div className="preview">
      <div className="preview-title">
        <p className="preview-title-p">제목</p>
        <span className="preview-title-span">댓글수</span>
      </div>
      <div className="preview-about">
        <p className="preview-about-p"># 분류</p>
        <p className="preview-about-p">최근 수정일</p>
      </div>
    </div>
  );
}
export default Preview;
