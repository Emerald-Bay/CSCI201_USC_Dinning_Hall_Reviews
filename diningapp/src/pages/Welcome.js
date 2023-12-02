import React, {useState, useEffect} from 'react';
import '../styles/Welcome.css';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import USCVillageImg from '../img/USCVillageHall.jpg';

const Welcome = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Check if user data exists in local storage
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
          // Parse the stored user data and set it in the state
          setLoggedInUser(JSON.parse(storedUser));
        }
      }, []); // The empty dependency array ensures this effect runs only once, similar to componentDidMount

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const loginAttempt = {
            username: username,
            password: password,
            email: "filler"
        };

        // console.log(loggedInUser);
        // fetch('http://localhost:8080/201Final/LoginServlet', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(loginAttempt),
        // })
        // .then(response => response.json())
        // .then(jsonData => {
        //     console.log("status: ", jsonData.status)
        //     console.log("msg: ", jsonData.msg)
        //     setLocalLoggedInUser(loginAttempt); 
            
        // })
        // .catch(error => {
        //     console.error('Error during login:', error);
        // });
        setLoggedInUser(loginAttempt);
        localStorage.setItem('loggedInUser', JSON.stringify(loginAttempt));
        navigate('/profile');
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        const newUser = {
            username: username,
            password: password,
        };

        // fetch('http://localhost:8080/201Final/SignUpServlet', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(newUser),
        // })
        // .then(response => response.json())
        // .then(jsonData => {
        //     console.log("status: ", jsonData.status)
        //     console.log("msg: ", jsonData.msg)
        //     setLoggedInUser(newUser); 
        // })
        // .catch(error => {
        //     console.error('Error during signup:', error);
        // });
    };

    return (
        <Container>
            <Row className='justify-content-center mt-3 mb-3'>
                <Col className='text-center'>
                    <h2>Welcome to <code>TrojanBytes!</code></h2>
                </Col>
            </Row>
            <Row className='justify-content-center mt-3 mb-3'>
                <Col className='text-center'>
                    <code>Your one stop shop for USC dining</code>
                </Col>
            </Row>
            <Row className='justify-content-md-center mb-3'>
                <Col md={8} className='text-center'>
                    <Image
                        src={USCVillageImg}
                        rounded
                        width="90%"
                    />
                </Col>
            </Row>
                
            <Row className='justify-content-md-center mt-3 mb-3'>
                <Col md={6} className="border border-dark p-3">
                    <Row>
                        <Col className='text-center'>
                            <h2>
                                <code>
                                    Sign Up
                                </code>
                            </h2>
                            
                        </Col>
                    </Row>
                    <Form>

                        <Form.Group className="mb-3" controlId="formBasicUser">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
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