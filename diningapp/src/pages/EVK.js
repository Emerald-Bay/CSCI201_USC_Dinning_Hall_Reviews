import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Menu from '../components/Menu.js';

const EVK = () => {
    const evkItems = [
        'Persian Chicken with Turmeric and Lemon',
        'Braised Brisket with Potatoes and Cabbage',
        'Pasta with Creamy Vegan Alfredo and Mushrooms',
        'Braised Garlic Lima Beans',
        'Sauteed Green Beans and Chickpeas',
        'Steamed Farro',
        'Red Wine Braised Mushrooms',
        'Veggie Lovers Pizza'
    ];

    return (
        <Container>
            <Row className='justify-content-md-center mt-3 mb-3'>
                <Col className='text-center'>
                    <h2>EVK Menu:</h2>
                </Col>
            </Row>
            <Row className='justify-content-md-center'>
                <Col md={8}>
                    <Menu
                        items={evkItems} 
                    />
                </Col>
                
            </Row>
        </Container>
    );
};

export default EVK;