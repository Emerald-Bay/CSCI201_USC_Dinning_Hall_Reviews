import React, { useState } from 'react';

const AddReview = ({ loggedInUser }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = () => {
        const reviewData = {
            username: loggedInUser.username,
            password: loggedInUser.password,
            title: selectedLocation,    
            body: reviewText,          
            rating: rating.toString(),  
        };

        // Send a POST request to the backend
        fetch('http://localhost:8080/ModifyReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        })
            .then(response => response.json())
            .then(jsonData => {
                console.log('Response from backend:', jsonData);
            })
            .catch(error => {
                console.error('Error sending review data:', error);
            });

        setSelectedLocation(null);
        setReviewText('');
        setRating(0);
    };

    return (
        <div className='text-center'>
            <h2>Add Review</h2>

            <div>
                <p>Select Restaurant:</p>
                <lable>
                <input
                    type="radio"
                    name="location"
                    value="EVK"
                    checked={selectedLocation === 'EVK'}
                    onChange={() => setSelectedLocation('EVK')}
                />
                EVK
                </lable>
                <label>
                <input
                    type="radio"
                    name="location"
                    value="Village"
                    checked={selectedLocation === 'Village'}
                    onChange={() => setSelectedLocation('Village')}
                />
                Village
                </label>
                <label>
                <input
                    type="radio"
                    name="location"
                    value="Parkside"
                    checked={selectedLocation === 'Parkside'}
                    onChange={() => setSelectedLocation('Parkside')}
                />
                Parkside
                </label>
            </div>


            {/* <p>AddReview Component</p> */}

            <div>
                <p>Write Your Review:</p>
                <textarea
                rows="4"
                cols="50"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                />
            </div>

            <div>
                <p>Rating:</p>
                {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                >
                    ★
                </span>
                ))}
            </div>

            <button onClick={() => handleSubmit}>Submit Review</button>
        </div>
    );
};

export default AddReview;