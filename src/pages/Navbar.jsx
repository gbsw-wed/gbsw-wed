import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import { Link } from "react-router-dom";

function NavarPage() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary Navbar">
        <Container fluid>
          <Link to="/" className="NavTitle">
            경소마고실록
          </Link>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <Form className="d-flex searchBar">
            <Form.Control
              type="search"
              placeholder="🎓 검색"
              className="me-2 searchText"
              aria-label="Search"
            />
            <Button variant="outline-success" className="searchBtn">
              🔍
            </Button>
          </Form>
          <Link to="/notice">
            <Button className="noticeBtn">게시글 만들기</Button>
          </Link>
          <Link to="/login">
            <Button className="loginBtn">로그인</Button>
          </Link>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavarPage;
