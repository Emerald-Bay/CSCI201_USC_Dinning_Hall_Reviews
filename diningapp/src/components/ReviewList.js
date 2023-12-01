import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Review from '../components/Review.js';


const ReviewList = ({reviewArray}) => {
    return (
        <Stack gap={3}>
            {reviewArray.map((review, index) => (
                <Review key={index} review={review} />
            ))}
        </Stack>
    );
};

export default ReviewList;