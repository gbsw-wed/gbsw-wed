import { useState } from "react";
import LoginPage from "./pages/login";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import PostPage from "./pages/PostPage";
import Pages404 from "./pages/Page404";
import Preview from "./pages/Preview";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout></Layout>}>
          <Route path="/" element={<MainPage></MainPage>}></Route>
          <Route path="/notice" element={<PostPage></PostPage>}></Route>
          <Route path="/write" element={<div>게시글 작성 페이지</div>}></Route>
        </Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="*" element={<Pages404></Pages404>}></Route>
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
            <div>
              <p className="mainContentTitle">개요</p>
              <video
                className="mainContentImg"
                muted
                autoPlay
                loop
                src="/images/gbsw.mp4"
              ></video>
              <p className="outlineTitle">
                경북소프트웨어마이스터고등학교의 기록과 이야기가 모이는 곳,
                경소마고실록입니다. <br />
                이곳은 경소마고 학생이라면 누구나 자유롭게 문서를 작성하고
                편집할 수 있는 열린 위키입니다. <br /> 교내의 행사, 동아리,
                프로젝트, 개발 문화, 진로 이야기 등<br /> 학교를 이루는 모든
                순간들을 함께 기록해 나갑니다
                <br />
                <br />
                경소마고실록은 학생들의 손으로 만들어가는 학교의 역사이자,
                <br />
                후배들에게 전해질 기술과 이야기의 아카이브입니다.
              </p>

              <p className="mainContentTitle">학과</p>

              <img className="mainContentImg" src="/images/course.png" alt="" />
              <p className="outlineTitle">
                1학년때에는 공통이며, 2학년부터 세부코스제로 나뉘어 전공을 골라
                공부 할 수 있게 된다. <br />
                세부 코스로는 게임개발, 인공지능, 웹개발 코스가 존재하며,
                1학년에는 공통으로 전공을 탐색하게 되고,
                <br />
                2학년부터 본격적인 세부 트랙 선택이 이루어진다.
              </p>

              <p className="mainContentTitle">연혁</p>
              <table className="history">
                <tbody>
                  <tr>
                    <td className="TH">날짜</td>
                    <td className="TH">연혁</td>
                  </tr>
                  <tr>
                    <td>2025년 03월 04일</td>
                    <td>제 1회 64명 입학</td>
                  </tr>
                  <tr>
                    <td>2025년 03월 01일</td>
                    <td>경북소프트웨어마이스터고등학교 전환</td>
                  </tr>
                  <tr>
                    <td>2025년 01월 13일</td>
                    <td>제 57회 73명 졸업</td>
                  </tr>
                  <tr>
                    <td>2024년 03월 04일</td>
                    <td>제 57회 81명 입학</td>
                  </tr>
                  <tr>
                    <td>2024년 09월 01일</td>
                    <td>제54회 졸업식 72명 졸업</td>
                  </tr>
                  <tr>
                    <td>2024년 01월 12일</td>
                    <td>제33대 이창석 교장 취임</td>
                  </tr>
                  <tr>
                    <td>2023년 10월 11일</td>
                    <td>제 18차 디지털분야 마이스터고 지정</td>
                  </tr>
                  <tr>
                    <td>2023년 09월 01일</td>
                    <td>제32대 김성완 교장 취임</td>
                  </tr>
                  <tr>
                    <td>2023년 03월 02일</td>
                    <td>제 56회 80명 입학</td>
                  </tr>
                  <tr>
                    <td>2022년 01월 11일</td>
                    <td>제52회 졸업식 14명 졸업</td>
                  </tr>
                  <tr>
                    <td>2021년 06월 15일</td>
                    <td>고졸 성공취업대박람회 창업경진대회 입상</td>
                  </tr>
                  <tr>
                    <td>2021년 03월 02일</td>
                    <td>
                      2021~2022 경상북도 교육청 지정 교육과정 연구학교 운영
                    </td>
                  </tr>
                  <tr>
                    <td>2021년 03월 01일</td>
                    <td>경북소프트웨어고등학교로 교명 변경</td>
                  </tr>
                  <tr>
                    <td>2020년 10월 01일</td>
                    <td>
                      다목적강당(호연관), 기숙사(정심관), 실습동(코딩관) 준공
                    </td>
                  </tr>
                  <tr>
                    <td>2017년 01월 12일</td>
                    <td>
                      교육부 지정 경상북도 최초 기숙형 소프트웨어 고등학교 선정
                    </td>
                  </tr>
                  <tr>
                    <td>2013년 07월 09일</td>
                    <td>특성화고등학교 지정 (경영회계과)</td>
                  </tr>
                  <tr>
                    <td>2000년 03월 01일</td>
                    <td>봉양정보고등학교로 교명 변경</td>
                  </tr>
                  <tr>
                    <td>1968년 03월 01일</td>
                    <td>봉양상업고등학교 개교 (3학급)</td>
                  </tr>
                  <tr>
                    <td>1967년 12월 26일</td>
                    <td>봉양상업고등학교 설립 인가</td>
                  </tr>
                  <tr>
                    <td>1954년 06월 10일</td>
                    <td>봉양중학교 개교 (3학급)</td>
                  </tr>
                  <tr>
                    <td>1948년 04월 01일</td>
                    <td>봉양야간중학교 설립</td>
                  </tr>
                </tbody>
              </table>

              <p className="mainContentTitle">학교 캐릭터</p>
              <img className="mainContentImg" src="/images/mascot.png" alt="" />
              <table className="history">
                <tbody>
                  <tr>
                    <td className="mTable">학교 캐릭터</td>
                    <td className="mTable">인공지능개발코스</td>
                    <td className="mTable">게임개발코스</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="popular">
          <div className="contentTitle">인기 검색어</div>
          <div className="content2">
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
          </div>
        </div>

        <div className="recommend">
          <div className="contentTitle">추천 검색어</div>
          <div className="content2">
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
