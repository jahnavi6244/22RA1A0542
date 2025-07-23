import { Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { useLogger } from '../context/LoggerContext';

// --- ShortenerForm ---
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

// --- URLCard ---
const URLCard = ({ original, short, expiry }) => (
  <Card style={{ marginTop: '1rem' }}>
    <CardContent>
      <Typography variant="subtitle1"><strong>Original:</strong> {original}</Typography>
      <Typography variant="body1">
        <strong>Shortened:</strong> <a href={short} target="_blank" rel="noopener noreferrer">{short}</a>
      </Typography>
      <Typography variant="caption">Expires at: {expiry}</Typography>
    </CardContent>
  </Card>
);

export { ShortenerForm, URLCard };

