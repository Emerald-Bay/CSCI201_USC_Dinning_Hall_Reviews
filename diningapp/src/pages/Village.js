import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Menu from '../components/Menu.js';
import ReviewList from '../components/ReviewList.js';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Villageimg from '../img/VillagePageimg.jpg';

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

    const fakeReview =  {
        "username" : "Qball",
        "content": "This french hoagie sucks!",
        "rating": "3.0",
        "date": "11/30/23",
        "time": "10:30AM",
        "diningHall": "Village",
    };

    const fakeReview2 =  {
        "username" : "Jake201",
        "content": "The braised brisket is amazing I'm going to eat so much",
        "rating": "4.5",
        "date": "11/31/23",
        "time": "1:00PM",
        "diningHall": "Village",
    };

    const fakeReview3 =  {
        "username" : "Jeannie201",
        "content": "The Veggie Lovers Pizza is to DIE for!!!!!! Coming back every day until I throw up",
        "rating": "5.0",
        "date": "12/1/23",
        "time": "5:00PM",
        "diningHall": "Village",
    };

    const fakeReviewList = [
        fakeReview,
        fakeReview2,
        fakeReview3
    ];

    const navigate = useNavigate();
    const handleReviewClick = () => {
        // Navigate to addReview page
        navigate('/add-review');
      };

    return (
        <Container>
            <Row className='justify-content-md-center mt-3 mb-3'>
                <Col md={12} className='text-center'>
                    <h1><code>USC Village Dining Hall:</code></h1>
                    <h3><b>Overall Rating:</b> 2.5</h3>
                </Col>
                <Col md={12} className='text-center'>
                    <Image
                            src={Villageimg}
                            rounded
                            
                    />
                </Col>
            </Row>

            <Row className='justify-content-md-center mt-3 mb-3'>
            <Col md={6} className='text-center'>
                    <h2><code>Menu:</code></h2>
                </Col>
                <Col md={6} className='text-center'>
                    <h2><code>Reviews</code></h2>
                </Col>
            </Row>
            <Row className='justify-content-md-center'>
                <Col md={6}>
                    <Menu
                        items={parkItems} 
                    />
                </Col>
                <Col md={6}>
                    <ReviewList
                        reviewArray={fakeReviewList}
                    />
                    <Row className='mt-3'>
                        <Col className='text-center'>
                            <Button
                                className='text-center mb-3'
                                variant="danger"
                                onClick={handleReviewClick}
                            >
                                Add Review
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Village;