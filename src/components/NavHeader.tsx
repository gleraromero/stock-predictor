import { Container, Nav, Navbar } from "react-bootstrap";

export const NavHeader = () => (
    <Navbar expand="lg" className="bg-body-tertiary mb-4">
        <Container>
            <Navbar.Brand href="/">Stock Predictor</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);
