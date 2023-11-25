import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Menu from '../components/Menu.js';

const Parkside = () => {
    const parkItems = [
        'Rotisserie Style Chicken',
        'Roasted Beef with Caramelized Balsamic Onions',
        'Pasta with Creamy Vegan Alfredo and Mushrooms',
        'Sauteed Green Peas',
        'Steamed Green Beans',
        'Sauteed Collard Greens',
        'Loaded Mashed Potatoes',
        'Farro Pilaf'
    ];

    return (
        <Container>
            <Row className='justify-content-md-center mt-3 mb-3'>
                <Col className='text-center'>
                    <h2>Parkside Menu:</h2>
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

export default Parkside;