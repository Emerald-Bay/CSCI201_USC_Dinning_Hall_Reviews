import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Profile = () => {
    const [user, setUser] = useState({ 
        username: '', 
        firstName: '',
        lastName: '',
        timestamp: '',
    });

    useEffect(() => {
        const username = username;
        fetch(`http://localhost:8080/UserProfileServlet?username=${encodeURIComponent(username)}`)
            .then(response => response.json())
            .then(data => {
                if (data.username) {
                    setUser(data);
                } else {
                    console.error('User not found');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return (
        <Container>
            <Row className='justify-content-md-center mt-3 mb-3'>
                <Col className='text-center'>
                    <h2>{user.firstName}'s Profile</h2>
                </Col>
            </Row>
            <Row className='justify-content-md-center'>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                            <Card.Text>
                                <p><b>Username:</b> {user.username}</p>
                                <p><b>Join Date:</b> {user.timestamp}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
