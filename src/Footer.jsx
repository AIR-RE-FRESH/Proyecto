import React from 'react';
import { Container, Row, Col, Stack, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <Container fluid>
                <Row className="bg-dark text-white p-4">
                    <Col className="mx-5">
                        <Stack>
                            <img
                                src='/logo3.png'
                                alt="arf logo"
                                rounded
                                width={150}
                                height={150}
                            />
                            <h2>Air Re-Fresh</h2>
                            <p>El futuro del aire limpio</p>
                        </Stack>
                    </Col>
                    <Col>
                        <Nav className="flex-column fs-5">
                            Links
                            <a href="https://github.com/AIR-RE-FRESH/Proyecto" className="text-white">Repositorio de GitHub</a>
                            <a href="/manualu.pdf" className="text-white" target="_blank" rel="noopener noreferrer">
                                Manual de usuario
                            </a>
                            <a href="https://drive.google.com/file/d/1jA3oOTcfbCXPob5WZuWWrPpK1wv_lMi3/view?usp=sharing " className="text-white">Video de ayuda</a>
                        </Nav>
                    </Col>
                    <Col>
                        <h4>Contactos:</h4>
                        <p>gabrielrojasokk@gmail.com</p>
                        <p>Teléfono: +54 (9) 367-4 414972</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
