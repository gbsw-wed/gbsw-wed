import { useState, useEffect } from "react";
import { signup, login } from "../api/userApi";
import "./login.css";

export default function LoginPage({ isSignup, setIsSignup }) {
  const [fade, setFade] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [studentId, setStudentId] = useState("");

  const toggleSignup = () => {
    setFade(true);
  };

  useEffect(() => {
    if (fade) {
      const timeout = setTimeout(() => {
        setIsSignup(!isSignup);
        setFade(false);

        // 폼 초기화
        setUsername("");
        setPassword("");
        setCheckPassword("");
        setStudentId("");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [fade, isSignup, setIsSignup]);

  const handleSignup = async () => {
    try {
      const res = await signup({
        username,
        password,
        checkPassword,
        stuNum: studentId,
      });

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "회원가입 실패");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await login({ username, password });
  
      window.location.href = "/notice";  
  
    } catch (err) {
      alert(err.response?.data?.message || "로그인 실패");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) handleSignup();
    else handleLogin();
  };

  return (
    <div className={isSignup ? "signup-active login-container" : "login-container"}>
      <div className="color-div"></div>
      <p className="color-div-text">{isSignup ? "SignUp" : "Login"}</p>

      <div className={`loginvar ${fade ? "fade" : ""}`}>
        <form onSubmit={handleSubmit}>
          {isSignup ? (
            <>
              <input
                type="text"
                placeholder="사용자 아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="학번 입력"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />

              <input type="submit" value="회원가입" />
              <p className="singupText" onClick={toggleSignup}>
                이미 계정이 있으신가요?
              </p>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="사용자 아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input type="submit" value="로그인" />
              <p className="singupText" onClick={toggleSignup}>
                회원가입이 필요하다면?
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}


///