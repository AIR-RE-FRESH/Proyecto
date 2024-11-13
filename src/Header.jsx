import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

function Header({ theme, toggleTheme }) {
    let user = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    function logout() {
        localStorage.clear();
        navigate('/login');
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search/${searchTerm}`);
        }
    };

    return (
        <>
            {[false].map((expand) => (
                <Navbar
                    sticky="top"
                    bg={theme === 'light' ? 'light' : 'dark'}
                    data-bs-theme={theme}
                    key={expand}
                    expand={expand}
                    className={`mb-3 ${theme === 'light' ? 'bg-light' : 'bg-dark'} relative`}
                >
                    <Container fluid className="flex items-center justify-between">
                        {/* Logo de la empresa */}
                        <Navbar.Brand as={Link} to="/home" className="flex items-center space-x-4">
                            <img
                                src="./logoB.png"
                                alt="Logo de la empresa"
                                className="w-[30%] h-[30%] object-cover"
                            />
                        </Navbar.Brand>

                        {/* Botón de cambio de tema centrado */}
                        <div className="absolute left-1/2 transform -translate-x-1/2">
                            <button
                                onClick={toggleTheme}
                                className="flex items-center space-x-2 p-2"
                            >
                                {theme === 'light' ? (
                                    <>
                                        <Moon className="w-5 h-5 text-dark" strokeWidth={3} />
                                        <span className="text-dark font-bold text-lg">Modo Oscuro</span>
                                    </>
                                ) : (
                                    <>
                                        <Sun className="w-5 h-5 text-yellow-400" strokeWidth={3} />
                                        <span className="text-yellow-400 font-bold text-lg">Modo Claro</span>
                                    </>
                                )}
                            </button>
                        </div>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas bg="dark" data-bs-theme="dark"
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Menú
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link as={Link} to="/home">Inicio</Nav.Link>

                                    {user ? (
                                        <>
                                            <NavDropdown title={user.name} id="offcanvasNavbarDropdown">
                                                <NavDropdown.Item onClick={logout}>Cerrar Sesión</NavDropdown.Item>
                                            </NavDropdown>

                                            {user.role === 'admin' ? (
                                                <NavDropdown title="Acciones" id="adminDropdown">
                                                    <NavDropdown.Item as={Link} to="/addProduct">Agregar Producto</NavDropdown.Item>
                                                    <NavDropdown.Item as={Link} to="/productList">Lista de Productos</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item as={Link} to="/pedidos">Ver Pedidos</NavDropdown.Item>
                                                    <NavDropdown.Item as={Link} to="/entregados">Ver Pedidos Entregados</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item as={Link} to="/ventas">Ventas</NavDropdown.Item>
                                                </NavDropdown>
                                            ) : (
                                                <NavDropdown title="Acciones" id="userDropdown">
                                                    <NavDropdown.Item as={Link} to="/userProductList">Lista de Productos</NavDropdown.Item>
                                                    <NavDropdown.Item as={Link} to="/cart">Carrito de Compras</NavDropdown.Item>
                                                </NavDropdown>

                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                                            <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
                                        </>
                                    )}
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default Header;