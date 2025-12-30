import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './enhanced-styles.css';
import Home from './pages/Home';
import CountdownPage from './pages/CountdownPage';
import LetterPage from './pages/LetterPage';
import MemoriesPage from './pages/MemoriesPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countdown" element={<CountdownPage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="/memories" element={<MemoriesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
