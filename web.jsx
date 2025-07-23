import { createContext, useContext } from 'react';

const LoggerContext = createContext();

export const useLogger = () => useContext(LoggerContext);

export const LoggerProvider = ({ children }) => {
  const log = (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  };

  return (
    <LoggerContext.Provider value={log}>
      {children}
    </LoggerContext.Provider>
  );
};
import { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { useLogger } from '../context/LoggerContext';

const ShortenerForm = ({ onShorten }) => {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [customCode, setCustomCode] = useState('');
  const log = useLogger();

  const handleSubmit = () => {
    const regex = /^(http|https):\/\/[^ "]+$/;
    if (!regex.test(url)) {
      log('Invalid URL entered');
      return alert('Enter a valid URL');
    }

    const minutes = validity ? parseInt(validity, 10) : 30;
    if (isNaN(minutes)) {
      log('Invalid validity value');
      return alert('Validity must be a number (in minutes)');
    }

    const payload = { url, validity: minutes, customCode };
    log(`Submitting URL to shorten: ${JSON.stringify(payload)}`);
    onShorten(payload);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField fullWidth label="Original URL" value={url} onChange={e => setUrl(e.target.value)} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Validity (minutes)" value={validity} onChange={e => setValidity(e.target.value)} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Custom Shortcode (optional)" value={customCode} onChange={e => setCustomCode(e.target.value)} />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit}>Shorten</Button>
      </Grid>
    </Grid>
  );
};

