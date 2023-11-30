import './styles/App.css'; 
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Welcome from './pages/Welcome';
import EVK from './pages/EVK';
import Parkside from './pages/Parkside';
import Village from './pages/Village';
import Profile from './pages/Profile';
import USCImage from './img/USCDining.jpg'; 
import AddReview from './pages/AddReview';



function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <Navbar
        className="custom-navbar justify-content-center"
        data-bs-theme="light"
      >
        <Container style={{
          marginBottom: "0px",
        }}>
          <Navbar.Brand 
            href="/"
            className="d-flex align-items-center"
          >
            <img
              alt="Your Logo"
              src={USCImage}
              style={{ 
                width: "100px",
                height: "100px",
                // marginTop: "-20px",
                paddingTop: "0px"
               }}
              className="d-inline-block align-top"
            />
            {/* <span style={{ marginLeft: "10px", fontSize: "23px" }}>
              DripDoctor
            </span> */}
          </Navbar.Brand>
          <Nav className="mx-auto">
            <Nav.Link href="/">Welcome</Nav.Link>
            <Nav.Link href="/evk">EVK</Nav.Link>
            <Nav.Link href="/parkside">Parkside</Nav.Link>
            <Nav.Link href="/village">Village</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            {/* <Nav.Link href="/add-review">Add Review</Nav.Link> */}
            {loggedInUser ? (
              <>
                <Nav.Link href="/add-review">Add Review</Nav.Link>
              </>
            ) : null}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Welcome setLoggedInUser={setLoggedInUser} />} />
        {/* <Route path="/" element={<Welcome />} /> */}
        <Route path="/evk" element={<EVK />} />
        <Route path="/parkside" element={<Parkside />} />
        <Route path="/village" element={<Village />} />
        {/* <Route path="/add-review" element={<AddReview />} /> */}
        <Route
          path="/add-review"
          element={<AddReview loggedInUser={loggedInUser} />}
        />
      </Routes>
    </Router>
  );
};
export default App;
