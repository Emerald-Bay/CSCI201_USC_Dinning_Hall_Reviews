import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Profile = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [user, setUser] = useState(null); // Initialize user as null

    // Effect to retrieve stored user information
    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);

    // Handler for logout
    const handleLogout = () => {
        setLoggedInUser(null);
        localStorage.removeItem('loggedInUser');
    };

    // Effect to fetch user data from the servlet
    useEffect(() => {
        if (loggedInUser && loggedInUser.username) {
            fetch(`http://localhost:8080/UserProfileServlet?username=${encodeURIComponent(loggedInUser.username)}`)
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
        }
    }, [loggedInUser]); // Depend on loggedInUser

    // Loading state
    if (!user) {
        return <div>Loading...</div>;
    }

    // JSX for profile display
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
                                <p><b>Join Date:</b> {new Date(user.timestamp).toLocaleDateString()}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='justify-content-md-center mt-3 mb-3'>
                <Col md={12} className='text-center'>
                    {loggedInUser ? (
                        <>
                            <p>Welcome {loggedInUser.username}</p>
                            <Button variant="primary" type="submit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : null}
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
