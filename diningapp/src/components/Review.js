import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Review = ({review}) => {
    return (
        <Card
            // style={{ width: '100%' }}
        >
        <Card.Body>
          <Card.Title>{review.username}</Card.Title>
          <Card.Text>
            {review.content}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <b>Rating:</b> {review.rating}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Date:</b> {review.date}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Time:</b> {review.time}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Dining Hall:</b> {review.diningHall}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
};

export default Review;