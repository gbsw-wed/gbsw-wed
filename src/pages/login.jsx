import { useState, useEffect } from "react";
import "./login.css";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
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

        setUsername("");
        setPassword("");
        setCheckPassword("");
        setStudentId("");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [fade, isSignup]);

  return (
    <div
      className={isSignup ? "signup-active login-container" : "login-container"}
    >
      <div className="color-div"></div>
      <p className="color-div-text">{isSignup ? "SignUp" : "Login"}</p>

      <div className={`loginvar ${fade ? "fade" : ""}`}>
        <form method="post">
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
                placeholder="학번입력"
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
