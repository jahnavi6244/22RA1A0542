import { useState } from 'react';
import ShortenerForm from '../components/ShortenerForm';
import URLCard from '../components/URLCard';

const ShortenerPage = () => {
  const [urls, setUrls] = useState([]);

  const handleShorten = ({ url, validity, customCode }) => {
    const code = customCode || Math.random().toString(36).substr(2, 5);
    const newEntry = {
      original: url,
      short: `http://localhost:3000/${code}`,
      expiry: new Date(Date.now() + validity * 60000).toLocaleString(),
    };
    setUrls(prev => [newEntry, ...prev]);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Shorten URLs</h2>
      <ShortenerForm onShorten={handleShorten} />
      {urls.map((entry, idx) => <URLCard key={idx} {...entry} />)}
    </div>
  );
};

export default ShortenerPage;
