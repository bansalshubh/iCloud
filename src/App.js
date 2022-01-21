import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Notestate from './context/notes/Notestate';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useContext } from 'react';
import alertContext from './context/alerts/alertContext';
function App() {

  const context = useContext(alertContext)
  const {alert} = context
  return (
    <Notestate>
    <Router>
        <Navbar />
        <Alert alert={alert}/>
      <div className="container">
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
      </div>
    </Router>
    </Notestate>
  );
}

export default App;
