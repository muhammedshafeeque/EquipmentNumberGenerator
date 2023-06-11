import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";


function Header() {
  const navigate=useNavigate()
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={()=>{
          navigate('/')
        }}>Equipment Number Generator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{
          navigate('/excel')
        }} >Excel Generate </Nav.Link>
            <Nav.Link onClick={()=>{
          navigate('/sets')
        }}  >Sets</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
