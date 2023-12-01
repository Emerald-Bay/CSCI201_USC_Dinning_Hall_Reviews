import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const Profile = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    

    useEffect(() => {
        // Check if user data exists in local storage
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
          // Parse the stored user data and set it in the state
          setLoggedInUser(JSON.parse(storedUser));
        }
      }, []); // The empty dependency array ensures this effect runs only once, similar to componentDidMount

    const handleLogout = () => {
        // Clear user data from state and local storage
        setLoggedInUser(null);
        localStorage.removeItem('loggedInUser');
    };

    const [user, setUser] = useState({ 
        username: 'sampleUsername', 
        firstName: 'sampleFirstName',
        lastName: 'sampleLastName',
        timestamp: 'sampleTimestamp',
    });


    const username = 'the username of the logged-in user'; // Replace with actual username retrieval logic

    useEffect(() => {
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
    }, [username]); 

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
                                {/* Assuming timestamp is in a format that can be converted to a Date */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='justify-content-md-center mt-3 mb-3' >
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