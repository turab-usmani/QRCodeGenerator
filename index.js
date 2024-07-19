const express = require('express');
const QRCode = require('qrcode');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/generate', async (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const qrCodeDataURL = await QRCode.toDataURL(url);
    res.json({ qrCodeDataURL });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Error generating QR code' });
  }
});

app.listen(port, () => {
  console.log(`QR code generator app listening at http://localhost:${port}`);
});
