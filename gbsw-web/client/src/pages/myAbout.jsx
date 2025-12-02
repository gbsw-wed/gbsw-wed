import "./myAbout.css";
import axios from "axios";
import { useState, useEffect } from "react";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function MyAbout() {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImg, setProfileImg] = useState("/images/gbs-mascot.png");
  const [userInfo, setUserInfo] = useState({
    username: "로딩중...",
    stuNum: "로딩중...",
  });

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response?.status === 401) {
          alert("로그인이 만료되었습니다.");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/users/me");
        const user = res.data.user || res.data;
  
        setUserInfo({
          username: user.username || "알 수 없음",
          stuNum: user.stuNum || "미등록",
        });
  
        // 이 부분만 이렇게 바꾸세요!!!
        const savedImg = user.profile_img?.trim();
        if (savedImg && savedImg !== "" && savedImg !== "null" && savedImg !== "undefined") {
          setProfileImg(`http://localhost:3000/uploads/profile/${savedImg}?t=${Date.now()}`);
        } else {
          setProfileImg("/images/gbs-mascot.png");  // ← 이 줄이 생명이에요!!!
        }
      } catch (err) {
        console.log("프로필 로드 실패 → 기본 이미지");
        setProfileImg("/images/gbs-mascot.png");
      }
    };
    fetchProfile();
  }, []);

// MyAbout.jsx의 handleProfileChange만 이걸로 통째로 바꾸세요
const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // 1. 즉시 미리보기 (게시글 쓰는 페이지처럼!)
    setProfileImg(URL.createObjectURL(file));
  
    const formData = new FormData();
    formData.append("profile_img", file);
  
    try {
      const res = await axios.post("/users/updateProfileImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (res.data.filename) {
        // 2. 성공하면 진짜 URL로 교체 (새로고침해도 유지됨)
        setProfileImg(`http://localhost:3000/uploads/profile/${res.data.filename}?t=${Date.now()}`);
      }
    } catch (err) {
      alert("업로드 실패했지만 일단 보이긴 해요");
      // 실패해도 미리보기는 유지 → UX 최고
    } finally {
      e.target.value = null; // 다음에 같은 사진 또 올릴 수 있게
    }
  };

  const changeUsername = async () => {
    if (!newUsername.trim()) return alert("새 이름을 입력해주세요.");
    try {
      const res = await axios.put("/users/changeUsername", { username: newUsername.trim() });
      alert(res.data.message);
      setUserInfo(prev => ({ ...prev, username: newUsername.trim() }));
      setNewUsername("");
    } catch (err) {
      alert(err.response?.data?.message || "이름 변경 실패");
    }
  };

  const changePassword = async () => {
    if (!newPassword.trim()) return alert("새 비밀번호를 입력해주세요.");
    try {
      const res = await axios.put("/users/changePassword", { password: newPassword });
      alert(res.data.message);
      setNewPassword("");
      alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "비밀번호 변경 실패");
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm("정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) return;
    try {
      await axios.delete("/users/deleteAccount");
      alert("계정이 삭제되었습니다.");
      document.cookie = "connect.sid=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "계정 삭제 실패");
    }
  };

  // 로그아웃 추가!!!
  const handleLogout = async () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) return;
    try {
      await axios.post("/users/logout");
    } catch (err) {
      console.log("로그아웃 요청 실패 → 강제 정리");
    } finally {
      document.cookie = "connect.sid=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      window.location.href = "/login";
    }
  };

  return (
    <div className="mainBg">
      <div className="mainBgCircle1"></div>
      <div className="mainBgCircle2"></div>

      <div className="myAboutContent">
        <h4 className="myAboutTitle">내정보</h4>

        <div className="myAboutImgBox">
          <img
            src={profileImg}
            alt="프로필"
            onError={(e) => {
              e.currentTarget.src = "/images/gbs-mascot.png";
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <label htmlFor="input-file" className="myAbout-input-file">
            <p>프로필 변경</p>
          </label>
          <input
            type="file"
            id="input-file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfileChange}
          />
        </div>

        <div style={{ textAlign: "center", marginTop: "20px", color: "#333" }}>
          <div style={{ fontSize: "2.8vw", fontWeight: "bold" }}>
            {userInfo.username}
          </div>
          <div style={{ fontSize: "1.8vw", color: "#666", marginTop: "8px" }}>
            학번: {userInfo.stuNum}
          </div>
        </div>

        {/* 로그아웃 버튼 복구!!! */}
        <button className="myAbout-logout" onClick={handleLogout} style={{ marginTop: "15px" }}>
          로그아웃
        </button>

        <button className="myAbout-delete" onClick={deleteAccount}>
          계정 삭제
        </button>
      </div>

      <div className="myAboutContentChange">
        <div className="myAoutChange">
          <p className="myAboutTileChange">사용자 이름</p>
          <input
            placeholder={userInfo.username || "로딩중..."}
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            style={{
              width: "70%",
              padding: "12px 15px",
              fontSize: "1.6vw",
              fontWeight: "500",
              border: "2px solid #ddd",
              borderRadius: "12px",
              backgroundColor: "#fff",
              color: "#333",
            }}
          />
          <button
            className="myAboutChangeBtn"
            onClick={changeUsername}
            disabled={!newUsername.trim()}
            style={{ opacity: newUsername.trim() ? 1 : 0.5 }}
          >
            변경
          </button>
        </div>

        <div className="myAoutChange">
          <p className="myAboutTileChange">비밀번호</p>
          <input
            type="password"
            placeholder="******"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              width: "70%",
              padding: "12px 15px",
              fontSize: "1.6vw",
              fontWeight: "500",
              border: "2px solid #ddd",
              borderRadius: "12px",
              backgroundColor: "#fff",
              color: "#333",
            }}
          />
          <button
            className="myAboutChangeBtn"
            onClick={changePassword}
            disabled={!newPassword.trim()}
            style={{ opacity: newPassword.trim() ? 1 : 0.5 }}
          >
            변경
          </button>
        </div>

        <div className="myAoutChange">
          <p className="myAboutTileChange">학번</p>
          <input
            value={userInfo.stuNum || "로딩중..."}
            readOnly
            style={{
              width: "70%",
              padding: "12px 15px",
              fontSize: "1.6vw",
              border: "2px solid #ddd",
              borderRadius: "12px",
              backgroundColor: "#f3f3f3",
              color: "#555",
              fontWeight: "bold",
              outline: "none",
              cursor: "not-allowed",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MyAbout;