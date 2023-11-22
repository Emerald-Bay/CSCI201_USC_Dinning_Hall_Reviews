import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Dining from './pages/Dining';
import Profile from './pages/Dining';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
          <Routes>
            <Route path="/" exact component={Welcome} />
            <Route path="/dining" component={Dining} />
            <Route path="/profile" component={Profile} />
          </Routes>
      </div>
    </Router>
  );
};
export default App;
