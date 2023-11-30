import React, { useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

const Profile = () => {
    
    const [user] = useState({ 
        username: 'sampleUser', 
        email: 'sample@email.com', 
        joinDate: 'January 1, 2023',
        avatar: 'path/to/avatar.jpg' // Replace with actual image path
    });
    

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
                            <div className='text-center mb-3'>
                                <Image src={user.avatar} roundedCircle width="150" height="150" />
                            </div>
                            <Card.Title>{user.username}'s Profile</Card.Title>
                            <Card.Text>
                                <p><b>Username:</b> {user.username}</p>
                                <p><b>Email:</b> {user.email}</p>
                                <p><b>Join Date:</b> {user.joinDate}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
