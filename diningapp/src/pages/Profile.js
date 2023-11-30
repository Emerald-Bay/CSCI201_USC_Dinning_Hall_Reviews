import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Profile = () => {
    
    const [user, setUser] = useState({ username: 'sampleUser', password: 'password123' });

    return (
        <Container>
            <Row className='justify-content-md-center mt-3 mb-3'>
                <Col className='text-center'>
                    <h2>User Profile</h2>
                </Col>
            </Row>
            <Row className='justify-content-md-center'>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{user.username}'s Profile</Card.Title>
                            <Card.Text>
                                <p><b>Username:</b> {user.username}</p>
                                {/* hidden */}
                                {/* <p><b>Password:</b> {user.password}</p> */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
