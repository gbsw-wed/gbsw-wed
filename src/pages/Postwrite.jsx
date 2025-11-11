import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Preview from "./Preview.jsx";
import data from "../pages/data.js";
import "./Postwrite.css";

function Postwrite() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title: formData.title,
      category: `#${formData.category}`,
      author: "위재성",
      lastEdited: new Date().toISOString().slice(0, 10),
      comments: 0,
    };

    data.push(newPost);

    setFormData({ title: "", category: "", content: "" });

    navigate("/notice");
  };

  return (
    <>
      <div className="mainBg">
        <div className="mainBgCircle1"></div>
        <div className="mainBgCircle2"></div>
        <div className="main-contemt">
          <div className="mainSchool Postwrite-post">
            <form onSubmit={handleSubmit}>
              <div className="Postwrite-post-title">게시글 작성하기</div>

              <input type="file" multiple className="Postwrite-post-file" />

              <input
                type="text"
                name="title"
                placeholder="제목"
                className="Postwrite-post-postTitle"
                value={formData.title}
                onChange={handleChange}
              />

              <textarea
                className="Postwrite-post-textarea"
                name="content"
                id=""
                placeholder="내용 입력"
                value={formData.content}
                onChange={handleChange}
              ></textarea>

              <input
                className="Postwrite-post-category"
                type="text"
                name="category"
                placeholder="카테고리"
                id=""
                value={formData.category}
                onChange={handleChange}
              />

              <input
                className="Postwrite-post-submit"
                type="submit"
                value="등록하기"
              ></input>
            </form>
          </div>

          <div className="popular Postwrite-popular">
            <div className="contentTitle">인기 검색어</div>
            <Link to="/notice" className="content-notice">
              <img src="/images/btn-left.png" alt="" />
            </Link>
            <div className="content2">
              <Preview></Preview>
            </div>
          </div>

          <div className="recommend Postwrite-recommend">
            <div className="contentTitle">추천 검색어</div>
            <Link to="/notice" className="content-notice">
              <img src="/images/btn-left.png" alt="" />
            </Link>
            <div className="content2">
              <Preview></Preview>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Postwrite;
