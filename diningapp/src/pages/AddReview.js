import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const AddReview = ({ loggedInUser }) => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    const locations = ['EVK', 'Village', 'Parkside'];

    const handleSubmit = () => {
        if (!selectedLocation || !reviewText || rating === 0) {
            alert('Please fill out all the fields');
            return;
        }
        const storedUser = localStorage.getItem('loggedInUser');
        let temp = JSON.parse(storedUser)
        // console.log(storedUser);
        console.log(selectedLocation);
        const reviewData = {
            username: temp.username,
            // password: loggedInUser.password, // Consider security implications
            diningHall: selectedLocation,    
            body: reviewText,          
            rating: rating,  
        };

        fetch('http://localhost:8080/201Final/AddReview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        })
        .then(response => response.json())
        .then(jsonData => {
            console.log('Response from backend:', jsonData);
            resetForm();
        })
        .catch(error => {
            console.error('Error sending review data:', error);
        });
    };

    const resetForm = () => {
        setSelectedLocation('');
        setReviewText('');
        setRating(0);
    };

    return (
        <div className='text-center'>
            <h2 style={{ marginBottom: '50px', marginTop: '20px', }}><code>Add Review:</code></h2>
            <div style={{ marginBottom: '50px' }}>
                <h4>Select Restaurant:</h4>
                {locations.map(location => (
                    <label key={location} style={{ marginRight: '15px' }}>
                        <input
                            type="radio"
                            name="location"
                            value={location}
                            checked={selectedLocation === location}
                            onChange={() => setSelectedLocation(location)}
                            style={{marginRight: '10px'}}
                        />
                        {location}
                    </label>
                ))}
            </div>

            <div style={{ marginBottom: '50px' }}>
                <h4>Write Your Review:</h4>
                <textarea
                    rows="4"
                    cols="50"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />
            </div>

            <div style={{ marginBottom: '50px' }}>
                <h4>Rating:</h4>
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

            <Button variant="warning" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
};

export default AddReview;