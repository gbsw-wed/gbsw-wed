import "./myAbout.css";

function MyAbout() {
  return (
    <div>
      <div className="mainBg">
        <div className="mainBgCircle1"></div>
        <div className="mainBgCircle2"></div>
        <div className="myAboutContent">
          <h4 className="myAboutTitle">내정보</h4>
          <div className="myAboutImgBox">
            <img src="/images/gbs-mascot.png" alt="" />
            <label htmlFor="input-file" className="myAbout-input-file">
              <p>프로필 변경</p>
            </label>
            <input type="file" id="input-file" style={{ display: "none" }} />
          </div>
          <button
            onClick={() => {
              alert("계정삭제 구현해라");
            }}
            className="myAbout-input-del"
          >
            계정 삭제
          </button>
        </div>
        <div className="myAboutContentChange">
          <div className="myAoutChange">
            <p className="myAboutTileChange">사용자 이름</p>
            <button className="myAboutChangeBtn">변경</button>
            <div className="myAboutdetail">
              <p></p>
            </div>
          </div>
          <div className="myAoutChange">
            <p className="myAboutTileChange">비밀번호</p>
            <button className="myAboutChangeBtn">변경</button>
            <div className="myAboutdetail">
              <p></p>
            </div>
          </div>
          <div className="myAoutChange">
            <p className="myAboutTileChange">학번</p>
            <button className="myAboutChangeBtn">변경</button>
            <div className="myAboutdetail">
              <p></p>
            </div>
          </div>
          <button className="myAboutSave">저장</button>
        </div>
      </div>
    </div>
  );
}
export default MyAbout;
