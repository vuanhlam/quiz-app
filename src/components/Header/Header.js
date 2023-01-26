import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

import images from '~/assets/images';
import { NavDropdown } from 'react-bootstrap';

function Header() {
    const isAuthenticated = useSelector((state) => state.userAccount.isAuthenticated);
    const account = useSelector((state) => state.userAccount.account);

    const navigate = useNavigate();

    // viết hàm để sau này có thể xử lý logic gì đó xong mới chuyển trang
    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to="/">
                    <img src={images.logo} height="30" alt="Quizlet" className="logo-icon" />
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                        <NavLink className="nav-link" to="/users">
                            Users
                        </NavLink>
                        <NavLink className="nav-link" to="/admins">
                            Admin
                        </NavLink>
                        {/* <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Users</Nav.Link>
                        <Nav.Link href="#link">Admin</Nav.Link> */}
                    </Nav>

                    <Nav>
                        {isAuthenticated === false ? (
                            <>
                                <Button variant="outline-primary" onClick={() => handleLogin()}>
                                    Log In
                                </Button>
                                <Button
                                    className="signUp-btn"
                                    variant="primary"
                                    onClick={() => {
                                        navigate('/register');
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </>
                        ) : (
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item>Log Out</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
