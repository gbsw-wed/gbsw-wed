import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function NavarPage({ isSignup }) {
  const [keyword, setKeyword] = useState("");  
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/posts/search/${keyword}`);   
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary Navbar">
        <Container fluid>
          <Link to="/" className="NavTitle">
            경소마고실록
          </Link>

          <Nav className="me-auto my-2 my-lg-0" navbarScroll />

          {/* 검색창 */}
          <Form
            className="d-flex searchBar"
            onSubmit={(e) => {
              e.preventDefault();  
              handleSearch();
            }}
          >
            <Form.Control
              type="search"
              placeholder="🎓 검색"
              className="me-2 searchText"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <Button className="searchBtn" type="submit">
              <i className="fa-solid fa-magnifying-glass reading"></i>
            </Button>
          </Form>

          <Link to="/notice">
            <Button className="noticeBtn">게시글 보기</Button>
          </Link>

          {isSignup ? (
            <Link to="/myAbout">
              <Button className="myAbout">내정보</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button className="loginBtn">로그인</Button>
            </Link>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default NavarPage;
