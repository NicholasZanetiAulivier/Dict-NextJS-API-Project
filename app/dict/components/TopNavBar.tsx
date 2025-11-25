'use server';
import { Container, Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavLink } from 'react-bootstrap';

function NavbarComponent() {
    return (
        <Navbar expand="lg" bg="primary">
            <Container >
                <NavbarBrand href="#home" className="text-white fw-bold">English Words</NavbarBrand>
                <NavbarToggle aria-controls="basic-navbar-nav" />
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink href="#home" className="text-white">Home</NavLink>
                        <NavLink href="#link" className="text-white">Favourites</NavLink>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;