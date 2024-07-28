import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { styled } from '@mui/system';

const Root = styled('div')({
  fontFamily: 'Roboto, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
  gap: '1rem',
  padding: '1rem',
});

const Result = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '1rem',
});

const ErrorText = styled(Typography)({
  color: 'red',
});

const ConfirmationCode: React.FC = () => {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEncode = async () => {
    setLoading(true);
    setError('');
    setEncoded('');
    setDecoded('');

    try {
      const response = await axios.post('http://localhost:8000/api/encode/', { code: input });
      setEncoded(response.data.encoded);
    } catch (err) {
      setError('Failed to encode the confirmation code');
    } finally {
      setLoading(false);
    }
  };

  const handleDecode = async () => {
    setLoading(true);
    setError('');
    setEncoded('');
    setDecoded('');

    try {
      const response = await axios.post('http://localhost:8000/api/decode/', { encoded: input });
      setDecoded(response.data.decoded);
    } catch (err) {
      setError('Failed to decode the confirmation code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Root>
      <Typography variant="h4" component="h2">
        VeriPhrase - Human readable confirmation codes.
      </Typography>
      <TextField
        label="Enter Code"
        variant="outlined"
        value={input}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setInput(e.target.value)}
        inputProps={{ maxLength: 32 }}
        fullWidth
        margin="normal"
        className='bg-white rounded-lg'

      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleEncode}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Encode'}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDecode}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Decode'}
      </Button>
      {encoded && (
        <Result>
          <CheckCircleIcon color="success" />
          <Typography variant="body1">Encoded: {encoded}</Typography>
        </Result>
      )}
      {decoded && (
        <Result>
          <CheckCircleIcon color="success" />
          <Typography variant="body1">Decoded: {decoded}</Typography>
        </Result>
      )}
      {error && (
        <Result>
          <ErrorIcon color="error" />
          <ErrorText variant="body1">{error}</ErrorText>
        </Result>
      )}
    </Root>
  );
};

export default ConfirmationCode;
