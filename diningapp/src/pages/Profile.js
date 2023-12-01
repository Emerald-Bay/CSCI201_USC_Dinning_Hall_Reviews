import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import userimg from '../img/userimg.png';
import Image from 'react-bootstrap/Image';

const Profile = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    // const [user, setUser] = useState(null); // Initialize user as null

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
    // useEffect(() => {
    //     if (loggedInUser && loggedInUser.username) {
    //         fetch(`http://localhost:8080/LoginServlet?username=${encodeURIComponent(loggedInUser.username)}`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (data.username) {
    //                     setUser(data);
    //                 } else {
    //                     console.error('User not found');
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching user data:', error);
    //             });
    //     }
    // }, [loggedInUser]); // Depend on loggedInUser

    // Loading state
    // if (!user) {
    //     return <div>Loading...</div>;
    // }

    // JSX for profile display
    return (
        <Container>
            <Row className='justify-content-md-center mt-3 mb-3'>
                <Col className='text-center'>
                    {loggedInUser ? (
                        <>
                            <h2>{loggedInUser.username}'s Profile</h2>
                        </>
                    ) : null}
                    
                    
                </Col>
            </Row>
            <Row className='justify-content-md-center'>
                <Col md={6}>
                    {loggedInUser ? (
                        <>
                            <Card>
                                <Card.Body>
                                    <div className="text-center mb-3">
                                        <Image
                                            src={userimg}
                                            rounded
                                            width="60%"
                                        />
                                    </div>
                                    <Card.Title>{loggedInUser.username}</Card.Title>
                                    <Card.Text>
                                        <p><b>Username:</b> {loggedInUser.username}</p>
                                        {/* <p><b>Join Date:</b> {new Date(loggedInUser.timestamp).toLocaleDateString()}</p> */}
                                    </Card.Text>
                                    <Card.Text className='text-center'>
                                        <Button variant="primary" type="submit" onClick={handleLogout}>
                                            Logout
                                        </Button>
                                    </Card.Text>
                                    
                                    
                                </Card.Body>
                            </Card>
                        </>
                    ) : null}
                    
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
