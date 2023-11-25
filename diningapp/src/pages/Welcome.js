import React from 'react';
import '../styles/Welcome.css';
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Welcome = () => {
    return (
        <Container >
            <Row className='justify-content-center mt-3 mb-3'>
                <Col className='text-center'>
                    <h2>Welcome!</h2>
                </Col>
            </Row>

            <Row className='justify-content-md-center'>
                <Col md={6} className="border border-dark p-3">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <div className='text-center'>

                            <Button variant="danger" className='me-4' type="submit">
                                Log in
                            </Button>

                            <Button variant="warning" type="submit">
                                Register
                            </Button>
                        </div>
                        
                    </Form>
                </Col>
            </Row>

        </Container>
    );
};

export default Welcome;