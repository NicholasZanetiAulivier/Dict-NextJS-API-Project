'use server';
import { Container, Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavLink } from 'react-bootstrap';

function NavbarComponent() {
    return (
        <Navbar expand="lg" bg="primary">
            <Container >
                <NavbarBrand href="/explore" className="text-white fw-bold">English Words</NavbarBrand>
                <NavbarToggle aria-controls="basic-navbar-nav" />
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink href="/explore" className="text-white">Home</NavLink>
                        <NavLink href="/favorites" className="text-white">Favourites</NavLink>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;