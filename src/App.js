import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Notestate from './context/notes/Notestate';

function App() {
  return (
    <Notestate>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      </div>
    </Router>
    </Notestate>
  );
}

export default App;
