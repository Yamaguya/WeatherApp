const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors());

const API_KEY = process.env.API_KEY || "default_api_key";

app.get('/weather', async (req, res) => {
    const city = req.query.city;
  
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
      }

    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
