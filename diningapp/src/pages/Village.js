import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Menu from '../components/Menu.js';

const Village = () => {
    const parkItems = [
        'French Hoagie Roll',
        'Beef and Pork Meatballs',
        'Meatless Vegan Meatballs',
        'Salami',
        'Shredded Mozzarella Cheese',
        'Black Olives',
        'Pepperoncini',
        'Sliced Tomatoes'
    ];

    return (
        <Container>
            <Row className='justify-content-md-center mt-3 mb-3'>
                <Col className='text-center'>
                    <h2>Village Menu:</h2>
                </Col>
            </Row>
            <Row className='justify-content-md-center'>
                <Col md={8}>
                    <Menu
                        items={parkItems} 
                    />
                </Col>
                
            </Row>
        </Container>
    );
};

export default Village;