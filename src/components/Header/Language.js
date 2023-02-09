import { NavDropdown } from "react-bootstrap";


function Language(props) {
    return (
        <>
            <NavDropdown title="Việt Nam" id="basic-nav-dropdown" className="languages">
                <NavDropdown.Item>English</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Việt Nam</NavDropdown.Item>
            </NavDropdown>
        </>
    );
}

export default Language; 
