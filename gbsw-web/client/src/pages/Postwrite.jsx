import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Postwrite.css";

function Postwrite() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [files, setFiles] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFile = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendData = new FormData();
    sendData.append("title", formData.title);
    sendData.append("content", formData.content);
    sendData.append("tag", formData.category);
    if (files) sendData.append("file", files);

    try {
      await axios.post("/posts/write", sendData, {
        withCredentials: true,
      });
      alert("게시글 등록 완료!");
      navigate("/notice");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("로그인이 필요합니다!");
        navigate("/login");
      } else {
        alert(err.response?.data?.message || "게시글 작성 실패");
      }
    }
  };

// Postwrite.jsx 안의 useEffect 완전히 교체
useEffect(() => {
  const fetchData = async () => {
    try {
      const [popRes, recRes] = await Promise.all([
        axios.get("/posts/popular-posts"),     // 여기 수정
        axios.get("/posts/recommended-posts"), // 여기 수정
      ]);
      setPopularPosts(popRes.data.posts || []);
      setRecommendedPosts(recRes.data.posts || []);
    } catch (err) {
      console.error("사이드 게시글 로드 실패", err);
    }
  };
  fetchData();
}, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, "0")}.${d.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="mainBg">
        <div className="mainBgCircle1"></div>
        <div className="mainBgCircle2"></div>
        <div className="main-contemt">

          {/* 게시글 작성 폼 */}
          <div className="mainSchool Postwrite-post">
            <form onSubmit={handleSubmit}>
              <div className="Postwrite-post-title">게시글 작성하기</div>
              <input type="file" className="Postwrite-post-file" onChange={handleFile} />
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
                placeholder="내용 입력"
                value={formData.content}
                onChange={handleChange}
              ></textarea>
              <input
                className="Postwrite-post-category"
                type="text"
                name="category"
                placeholder="카테고리"
                value={formData.category}
                onChange={handleChange}
              />
              <input className="Postwrite-post-submit" type="submit" value="등록하기" />
            </form>
          </div>

            {/* 인기 게시글 */}
            <div className="popular Postwrite-popular">
              <div className="contentTitle">인기 게시글</div>
              <Link to="/notice" className="content-notice">
                <img src="/images/btn-left.png" alt="더보기" />
              </Link>
              <div className="content2">
                {popularPosts.length > 0 ? (
                  popularPosts.map((post, idx) => (
                    <Link
                      key={post.post_id}
                      to={`/notice/${post.post_id}`}
                      className="post-link"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div style={{ padding: "10px 0", cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: "500" }}>
                          {idx + 1}. {post.title}
                        </span>
                        <span style={{ color: "#888", fontSize: "12px", minWidth: "85px", textAlign: "right" }}>
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div style={{ color: "#aaa", padding: "20px 0" }}>게시글 없음</div>
                )}
              </div>
            </div>

            {/* 추천 게시글 */}
            <div className="recommend Postwrite-recommend">
              <div className="contentTitle">추천 게시글</div>
              <Link to="/notice" className="content-notice">
                <img src="/images/btn-left.png" alt="더보기" />
              </Link>
              <div className="content2">
                {recommendedPosts.length > 0 ? (
                  recommendedPosts.map((post, idx) => (
                    <Link
                      key={post.post_id}
                      to={`/notice/${post.post_id}`}
                      className="post-link"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div style={{ padding: "10px 0", cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: "500" }}>
                          {idx + 1}. {post.title}
                        </span>
                        <span style={{ color: "#888", fontSize: "12px", minWidth: "85px", textAlign: "right" }}>
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div style={{ color: "#aaa", padding: "20px 0" }}>게시글 없음</div>
                )}
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default Postwrite;