import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'

export const Footer = () => {
    return (
        <footer className="mt-4">
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; ProShop
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
