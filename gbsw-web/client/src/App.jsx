// src/App.jsx
import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import axios from "axios";

// ===== Axios 전역 설정 (세션 유지 필수!) =====
// http://localhost:3000 으로 통일
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

// ===== 컴포넌트 임포트 =====
import LoginPage from "./pages/login";
import "./App.css";
import Layout from "./pages/Layout";
import PostPage from "./pages/PostPage.jsx";
import Pages404 from "./pages/Page404";
import Postwrite from "./pages/Postwrite.jsx";
import MyAbout from "./pages/myAbout.jsx";
import PostDetails from "./pages/PostDetails.jsx";
// import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel.js"; // 사용되지 않는 임포트 제거

// ====================== 메인 페이지 컴포넌트 ======================
function MainPage({ isSignup, setIsSignup }) {
  const navigate = useNavigate();
  const [popularPosts, setPopularPosts] = useState([]);
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSidePosts = async () => {
      try {
        const [popRes, recRes] = await Promise.all([
          axios.get("/posts/popular-posts"),
          axios.get("/posts/recommended-posts"),
        ]);
        setPopularPosts(popRes.data.posts || []);
        setRecommendedPosts(recRes.data.posts || []);
        setLoading(false);
      } catch (err) {
        console.error("사이드바 게시글 로드 실패", err);
        setLoading(false);
      }
    };
    fetchSidePosts();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, "0")}.${d.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <div className="mainBg">
      <div className="mainBgCircle1"></div>
      <div className="mainBgCircle2"></div>
      <div className="main-contemt"> {/* 오타 수정: 'main-contemt' -> 'main-content' 권장 */}

        <div className="mainSchool">
          <div className="contentTitle">학교 소개</div>
          <div className="content">
            <div className="schoolImgTitle">
              <p style={{ width: "100%" }}>
                경북소프트웨어마이스터고등학교
                <br />
                Gyeongbuk Software Meister High School
              </p>
            </div>
            <img src="/images/school.png" alt="school" className="schoolImg" />

            <table>
              <tbody>
                <tr>
                  <td className="talbeTitle">교훈</td> {/* 오타 수정: 'talbeTitle' -> 'tableTitle' 권장 */}
                  <td>
                    <p className="talbeContent"> {/* 오타 수정: 'talbeContent' -> 'tableContent' 권장 */}
                      바르게 <span className="span"> 알고</span> 바르게
                      <span className="span"> 행하자</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="talbeTitle">개교</td>
                  <td>
                    <p className="talbeContent">1948년 04월 01일 ( 77 주년 )</p>
                    {/* 중복된 개교일 제거 또는 수정 */}
                    {/* <p className="talbeContent">1968년 03월 01일 ( 57 주년 )</p> */}
                  </td>
                </tr>
                <tr>
                  <td className="talbeTitle">유형</td>
                  <td><p className="talbeContent">마이스터고등학교</p></td>
                </tr>
                <tr>
                  <td className="talbeTitle">형태</td>
                  <td><p className="talbeContent">공립</p></td>
                </tr>
                <tr>
                  <td className="talbeTitle">성별</td>
                  <td><p className="talbeContent">남녀공학</p></td>
                </tr>
                <tr>
                  <td className="talbeTitle">관할교육청</td>
                  <td><p className="talbeContent">경상북도의성교육지원청</p></td>
                </tr>
                <tr>
                  <td className="talbeTitle">주소</td>
                  <td><p className="talbeContent">경상북도 의성군 봉양면 봉호로 14</p></td>
                </tr>
              </tbody>
            </table>

            <div>
              <p className="mainContentTitle">개요</p>
              <video className="mainContentImg" muted autoPlay loop src="/images/gbsw.mp4"></video>
              <p className="outlineTitle">
                경북소프트웨어마이스터고등학교의 기록과 이야기가 모이는 곳, 경소마고실록입니다. <br />
                이곳은 경소마고 학생이라면 누구나 자유롭게 문서를 작성하고 편집할 수 있는 열린 위키입니다. <br />
                교내의 행사, 동아리, 프로젝트, 개발 문화, 진로 이야기 등<br />
                학교를 이루는 모든 순간들을 함께 기록해 나갑니다<br /><br />
                경소마고실록은 학생들의 손으로 만들어가는 학교의 역사이자,<br />
                후배들에게 전해질 기술과 이야기의 아카이브입니다.
              </p>

              <p className="mainContentTitle">학과</p>
              <img className="mainContentImg" src="/images/course.png" alt="" />
              <p className="outlineTitle">
                1학년때에는 공통이며, 2학년부터 세부코스제로 나뉘어 전공을 골라 공부 할 수 있게 된다. <br />
                세부 코스로는 게임개발, 인공지능, 웹개발 코스가 존재하며,<br />
                1학년에는 공통으로 전공을 탐색하게 되고, 2학년부터 본격적인 세부 트랙 선택이 이루어진다.
              </p>

              <p className="mainContentTitle">연혁</p>
              <table className="history">
                <tbody>
                  <tr><td className="TH">날짜</td><td className="TH">연혁</td></tr>
                  <tr><td>2025년 03월 04일</td><td>제 1회 64명 입학</td></tr>
                  <tr><td>2025년 03월 01일</td><td>경북소프트웨어마이스터고등학교 전환</td></tr>
                  <tr><td>2025년 01월 13일</td><td>제 57회 73명 졸업</td></tr>
                  <tr><td>2024년 03월 04일</td><td>제 57회 81명 입학</td></tr>
                  <tr><td>2024년 09월 01일</td><td>제54회 졸업식 72명 졸업</td></tr>
                  <tr><td>2024년 01월 12일</td><td>제33대 이창석 교장 취임</td></tr>
                  <tr><td>2023년 10월 11일</td><td>제 18차 디지털분야 마이스터고 지정</td></tr>
                  <tr><td>2023년 09월 01일</td><td>제32대 김성완 교장 취임</td></tr>
                  <tr><td>2023년 03월 02일</td><td>제 56회 80명 입학</td></tr>
                  <tr><td>2022년 01월 11일</td><td>제52회 졸업식 14명 졸업</td></tr>
                  <tr><td>2021년 06월 15일</td><td>고졸 성공취업대박람회 창업경진대회 입상</td></tr>
                  <tr><td>2021년 03월 02일</td><td>2021~2022 경상북도 교육청 지정 교육과정 연구학교 운영</td></tr>
                  <tr><td>2021년 03월 01일</td><td>경북소프트웨어고등학교로 교명 변경</td></tr>
                  <tr><td>2020년 10월 01일</td><td>다목적강당(호연관), 기숙사(정심관), 실습동(코딩관) 준공</td></tr>
                  <tr><td>2017년 01월 12일</td><td>교육부 지정 경상북도 최초 기숙형 소프트웨어 고등학교 선정</td></tr>
                  <tr><td>2013년 07월 09일</td><td>특성화고등학교 지정 (경영회계과)</td></tr>
                  <tr><td>2000년 03월 01일</td><td>봉양정보고등학교로 교명 변경</td></tr>
                  <tr><td>1968년 03월 01일</td><td>봉양상업고등학교 개교 (3학급)</td></tr>
                  <tr><td>1967년 12월 26일</td><td>봉양상업고등학교 설립 인가</td></tr>
                  <tr><td>1954년 06월 10일</td><td>봉양중학교 개교 (3학급)</td></tr>
                  <tr><td>1948년 04월 01일</td><td>봉양야간중학교 설립</td></tr>
                </tbody>
              </table>

              <p className="mainContentTitle">학교 캐릭터</p>
              <img className="mainContentImg" src="/images/mascot.png" alt="" />
            </div>
          </div>
        </div>

        {/* 로그인 상태에 따른 사이드바 */}
        {isSignup ? (
          <>
            {/* 인기 게시글 */}
            <div className="popular">
              <div className="contentTitle">인기 게시글</div>
              <Link to="/notice" className="content-notice">
                <img src="/images/btn-left.png" alt="더보기" />
              </Link>
              <div className="content2">
                {loading ? (
                  <div style={{ color: "#aaa", padding: "20px 0", textAlign: "center" }}>로딩 중...</div>
                ) : popularPosts.length > 0 ? (
                  popularPosts.map((post, idx) => (
                    <Link
                      key={post.post_id}
                      to={`/notice/${post.post_id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div style={{ padding: "10px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: "500" }}>
                          {idx + 1}. {post.title}
                        </span>
                        <span style={{ color: "#888", fontSize: "12px" }}>
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
            <div className="recommend">
              <div className="contentTitle">추천 게시글</div>
              <Link to="/notice" className="content-notice">
                <img src="/images/btn-left.png" alt="더보기" />
              </Link>
              <div className="content2">
                {loading ? (
                  <div style={{ color: "#aaa", padding: "20px 0", textAlign: "center" }}>로딩 중...</div>
                ) : recommendedPosts.length > 0 ? (
                  recommendedPosts.map((post, idx) => (
                    <Link
                      key={post.post_id}
                      to={`/notice/${post.post_id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div style={{ padding: "10px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: "500" }}>
                          {idx + 1}. {post.title}
                        </span>
                        <span style={{ color: "#888", fontSize: "12px" }}>
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
          </>
        ) : (
          <div className="notLogin">
            <div className="notLoginTitle">로그인 하기</div>
            <button className="notLogin-login-btn" onClick={() => navigate("/login")}>
              로그인
            </button>
            <button className="notLogin-singup-btn" onClick={() => navigate("/login")}> {/* 오타/중복 수정 */}
              회원가입
            </button>
            <h4 className="notText">로그인을 먼저 진행해주세요</h4>
          </div>
        )}

      </div>
    </div>
  );
}

// ====================== App 컴포넌트 (메인) ======================
function App() {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 상태 체크 (App.jsx의 첫 번째 App 컴포넌트에 있었던 내용과 중복되므로, 아래의 최종 App 컴포넌트의 로직을 따름)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/users/me");  
        if (res.data.loggedIn) {             
          setIsSignup(true);
          if (location.pathname === "/login") {
            navigate("/", { replace: true });
          }
        }
      } catch (err) {
        setIsSignup(false);
        const protectedPaths = ["/notice", "/write", "/myAbout"];
        if (protectedPaths.some(p => location.pathname.startsWith(p) && location.pathname !== "/")) {
          navigate("/login", { replace: true });
        }
      }
    };
    checkAuth();
  }, [location, navigate]);

  return (
    <Routes>
      <Route element={<Layout isSignup={isSignup} />}>
        {/* 메인 페이지 */}
        <Route path="/" element={<MainPage isSignup={isSignup} setIsSignup={setIsSignup} />} />
        
        {/* 게시글 목록 (전체) */}
        <Route path="/notice" element={<PostPage isSignup={isSignup} setIsSignup={setIsSignup} />} />
        
        <Route path="/posts/search/:keyword" element={<PostPage isSignup={isSignup} setIsSignup={setIsSignup} />} />
        
        <Route path="/notice/:id" element={<PostDetails isSignup={isSignup} setIsSignup={setIsSignup} />} />
        
        {/* 게시글 작성 */}
        <Route path="/write" element={<Postwrite />} />
        
        {/* 내 정보 */}
        <Route path="/myAbout" element={<MyAbout />} />
      </Route>
      
      {/* 로그인 */}
      <Route path="/login" element={<LoginPage isSignup={isSignup} setIsSignup={setIsSignup} />} />
      
      {/* 404 페이지 */}
      <Route path="*" element={<Pages404 />} />
    </Routes>
  );
}

export default App;