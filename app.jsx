import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoggerProvider } from './context/LoggerContext';
import ShortenerPage from './pages/ShortenerPage';
import StatisticsPage from './pages/StatisticsPage';

const App = () => (
  <LoggerProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
      </Routes>
    </Router>
  </LoggerProvider>
);

export default App;
