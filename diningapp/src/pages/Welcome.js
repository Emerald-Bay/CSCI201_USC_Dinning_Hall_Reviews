import React, {useState} from 'react';
import '../styles/Welcome.css';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Welcome = ({ setLoggedInUser }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleLoginSubmit = (event) => {
        
        const loggedInUser = {
            email: email,
            password: password
        };

        console.log(loggedInUser);
        fetch('http://localhost:8080/LoginServlet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loggedInUser),
        })
        .then(response => response.json())
        .then(jsonData => {
            setLoggedInUser(jsonData); 
            navigate('/add-review');
        })
        .catch(error => {
            console.error('Error during login:', error);
        });
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        const timestamp = new Date().toISOString();

        const newUser = {
            firstName: firstName,
            lastName: lastName,
            username: email,
            password: password,
            registrationTimestamp: timestamp
        };

        fetch('http://localhost:8080/SignUpServlet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .then(response => response.json())
        .then(jsonData => {
            setLoggedInUser(jsonData); 
            navigate('/add-review');
        })
        .catch(error => {
            console.error('Error during signup:', error);
        });
    };

    return (
        <Container>
            <Row className='justify-content-center mt-3 mb-3'>
                <Col className='text-center'>
                    <h2>Welcome!</h2>
                </Col>
            </Row>

            <Row className='justify-content-md-center'>
                <Col md={6} className="border border-dark p-3">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter first name" onChange={(e) => setFirstName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <div className='text-center'>
                            <Button variant="danger" className='me-4' type="submit" onClick={handleLoginSubmit}>
                                Log in
                            </Button>
                            <Button variant="warning" type="submit" onClick={handleSignupSubmit}>
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