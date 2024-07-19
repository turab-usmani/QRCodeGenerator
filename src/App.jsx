// src/App.js
import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setQrCodeDataURL(data.qrCodeDataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div className="App">
      <title> QR Code</title>
      <h1>QR Code Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter URL: &nbsp;&nbsp;&nbsp;   
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <button style={{ marginLeft: '30px' }} type="submit" >Generate QR Code</button>
      </form>
      {qrCodeDataURL && (
        <div>
          <p>URL: {url}</p>
          <img src={qrCodeDataURL} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default App;
