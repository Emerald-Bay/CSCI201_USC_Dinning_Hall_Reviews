import React, { useState } from 'react';

const Profile = () => {
    // Sample user data, you would normally get this from a backend server
    const [user, setUser] = useState({ username: 'sampleUser', password: 'password123' });

    return (
        <div>
            <h1>Profile Component</h1>
            <p><b>Username:</b> {user.username}</p>
            <p><b>Password:</b> {user.password}</p>
        </div>
    );
};

export default Profile;
