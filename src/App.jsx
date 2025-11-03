import { useState } from "react";
import LoginPage from "./pages/login";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout></Layout>}>
          <Route path="/" element={<MainPage></MainPage>}></Route>
          <Route path="/notice" element={<PostPage></PostPage>}></Route>
        </Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes>
    </>
  );
}

function MainPage() {
  return (
    <div className="mainBg">
      <div className="mainBgCircle1"></div>
      <div className="mainBgCircle2"></div>

      <div className="main-contemt">
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
                  <td className="talbeTitle">교훈</td>
                  <td>
                    <p className="talbeContent">
                      바르게 <span className="span"> 알고</span> 바르게
                      <span className="span"> 행하자</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="talbeTitle">개교</td>
                  <td>
                    <p className="talbeContent">1948년 04월 01일 ( 77 주년 )</p>
                    <p className="talbeContent">1968년 03월 01일 ( 57 주년 )</p>
                  </td>
                </tr>
                <tr>
                  <td className="talbeTitle">유형</td>
                  <td>
                    <p className="talbeContent">마이스터고등학교</p>
                  </td>
                </tr>
                <tr>
                  <td className="talbeTitle">형태</td>
                  <td>
                    <p className="talbeContent">공립</p>
                  </td>
                </tr>
                <tr>
                  <td className="talbeTitle">성별</td>
                  <td>
                    <p className="talbeContent">남녀공학</p>
                  </td>
                </tr>
                <tr>
                  <td className="talbeTitle">관할교육청</td>
                  <td>
                    <p className="talbeContent">경상북도의성교육지원청</p>
                  </td>
                </tr>
                <tr>
                  <td className="talbeTitle">주소</td>
                  <td>
                    <p className="talbeContent">
                      경상북도 의성군 봉양면 봉호로 14
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="popular">
          <div className="contentTitle">인기 검색어</div>
          <div className="content"></div>
        </div>

        <div className="recommend">
          <div className="contentTitle">추천 검색어</div>
          <div className="content"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
