import "./myAbout.css";
import axios from "axios";
import { useState, useEffect } from "react";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function MyAbout() {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [profileImg, setProfileImg] = useState("");  
  const [userInfo, setUserInfo] = useState({
    username: "로딩중...",
    stuNum: "로딩중...",
  });

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response?.status === 401) {
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
        console.log("서버에서 온 데이터:", res.data);
  
        if (res.data?.user) {
          setUserInfo({
            username: res.data.user.username,
            stuNum: res.data.user.stuNum || "미등록",
          });
  
          if (res.data?.user?.profile_img) {
            const imgUrl = `http://localhost:3000/uploads/profile/${res.data.user.profile_img}?t=${Date.now()}`;
            console.log("설정하려는 이미지 URL:", imgUrl);
            setProfileImg(imgUrl);
          } else {
            setProfileImg(""); 
          }
        }
      } catch (err) {
        console.log("프로필 불러오기 실패:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profile_img", file);
    try {
      const res = await axios.post("/users/updateProfileImage", formData);
      // 2번 수정 (줄 48 근처)
        if (res.data.filename) {
            setProfileImg(
            `http://localhost:3000/uploads/profile/${res.data.filename}?t=${Date.now()}`
            );
        }
    } catch (err) {
      alert(err.response?.data?.message || "업로드 실패");
    }
  };

  const changeUsername = async () => {
    if (!newUsername.trim()) return alert("새 이름을 입력해주세요.");
    try {
      const res = await axios.put("/users/changeUsername", { username: newUsername });
      alert(res.data.message);
      setUserInfo((prev) => ({ ...prev, username: newUsername }));
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
    } catch (err) {
      alert(err.response?.data?.message || "비밀번호 변경 실패");
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm("정말 계정을 삭제하시겠습니까?")) return;
    try {
      await axios.delete("/users/deleteAccount");
      alert("계정이 삭제되었습니다.");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "계정 삭제 실패");
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
            src={profileImg ? profileImg : "/images/gbs-mascot.png"}
            alt="프로필"
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

        <button className="myAbout-delete" onClick={deleteAccount}>
          계정 삭제
        </button>
        <button className="myAbout-logout" onClick={async () => {
          if (!window.confirm("로그아웃 하시겠습니까?")) return;
          try {
            await axios.post("/users/logout", {}, { withCredentials: true });
          } catch {}
          document.cookie = "connect.sid=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          window.location.href = "/login";
        }}>
          로그아웃
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