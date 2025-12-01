// PostDetails.jsx — 너가 제일 좋아했던 그 시절로 돌아감
import "./PostDetails.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function PostDetails({ isSignup }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, popRes] = await Promise.all([
          axios.get(`/posts/${id}`),
          axios.get("/posts/popular-posts"),
        ]);
        setPost(postRes.data);
        setPopularPosts(popRes.data.posts || []);
      } catch (err) {
        alert("게시글을 불러오지 못했습니다.");
      }
    };
    fetchData();
  }, [id]);

  // 처음에 너가 좋아했던 그 모달 로직 그대로
  const openModal = (src) => {
    setModalImage(src);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage("");
    document.body.style.overflow = "auto";
  };

  // ESC 키도 먹히고
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!post) return <div className="loading">불러오는 중...</div>;

  const imageUrl = post.file_path 
    ? `http://localhost:3000${post.file_path.replace(/^\/+/, "/")}` 
    : null;

  return (
    <>
      <div className="mainBg postDetails-only">
        <div className="mainBgCircle1"></div>
        <div className="mainBgCircle2"></div>

        {/* 사이드바 */}
        <div className="postPage-login">
          {isSignup ? (
            <>
              <div className="contentTitle">인기 게시글</div>
              <Link to="/notice" className="content-notice">
                <img src="/images/btn-left.png" alt="더보기" />
              </Link>
              <div className="postPage-login-content">
                {popularPosts.map((p, idx) => (
                  <Link key={p.post_id} to={`/notice/${p.post_id}`} className="keyword-item">
                    <div style={{ padding: "12px 0" }}>
                      {idx + 1}. {p.title}
                      <span style={{ float: "right", color: "#888", fontSize: "12px" }}>
                        {new Date(p.created_at).toLocaleDateString("ko-KR").slice(2, -1)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="contentTitle">로그인 하기</div>
              <div className="postPage-login-content">
                <button className="postPage-login-btn" onClick={() => navigate("/login")}>로그인</button>
                <button className="postPage-singup-btn" onClick={() => navigate("/login")}>회원가입</button>
              </div>
            </>
          )}
        </div>

        <div className="postPage-write">
          <div className="contentTitle">게시글 작성하기</div>
          <button onClick={() => isSignup ? navigate("/write") : alert("로그인 해주세요!")}
            className="postPage-write-btn">
            게시글 작성하기
          </button>
        </div>

        <img className="postPage-img" src="/images/gbs-mascot.png" alt="" />

        {/* 스케치북 */}
        <div className="postPage-bg">
          <img className="postPage-content-bg" src="/images/postPage-content-bg.png" alt="" />
          {/* 이 녀석이 클릭 가로채던 범인 */}
          <img className="postPage-content" src="/images/postPage-content.png" alt="" style={{ pointerEvents: "none" }} />

          <div className="postPage-content-titleBox">
            <p className="postDetail-title">{post.title}</p>
            <div className="postDetail-info-line">
              <span className="postDetail-author">작성자: {post.username}</span>
              <span className="postDetail-lastEdited">
                최근 수정일: {new Date(post.updated_at || post.created_at).toLocaleDateString("ko-KR").slice(0, -1)}
              </span>
            </div>
            <div className="postDetail-category-box">
              <p>분류: {post.tag || "없음"}</p>
            </div>
            <div className="postDetail-content-box">
              <p>{post.content}</p>
            </div>

            {/* 첨부 이미지 – 클릭하면 모달 */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="첨부 이미지"
                className="postDetail-image"
                onClick={() => openModal(imageUrl)}
              />
            )}
          </div>
        </div>
      </div>

      {/* 너가 처음에 완전 좋아했던 그 모달 */}
      {modalOpen && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={closeModal}>×</span>
            <img src={modalImage} alt="큰 이미지" className="modal-image" />
          </div>
        </div>
      )}
    </>
  );
}

export default PostDetails;