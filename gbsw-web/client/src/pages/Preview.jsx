// src/pages/Preview.jsx
import "./Preview.css";
import React from "react";

// 더미 데이터 (실제로는 서버에서 받아올 거예요)
const dummyData = [
  {
    id: 1,
    title: "2025학년도 입학식 안내",
    comments: 42,
    category: "공지사항",
    lastEdited: "2025.03.02",
  },
  {
    id: 2,
    title: "AI 코스 프로젝트 발표회 후기",
    comments: 38,
    category: "자유게시판",
    lastEdited: "2025.02.28",
  },
  {
    id: 3,
    title: "학교 축제 '소마제' 준비 중!",
    comments: 65,
    category: "동아리",
    lastEdited: "2025.02.27",
  },
  {
    id: 4,
    title: "React 공부 팁 공유합니다",
    comments: 29,
    category: "학습",
    lastEdited: "2025.02.26",
  },
  {
    id: 5,
    title: "기숙사 와이파이 속도 개선 요청",
    comments: 87,
    category: "건의사항",
    lastEdited: "2025.02.25",
  },
];

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