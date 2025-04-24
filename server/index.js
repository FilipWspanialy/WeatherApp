import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;

app.use(cors());

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;

  try {
    const { data } = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );

    res.json({
      city: data.location.name,
      temperature: data.current.temp_c + '°C',
      condition: data.current.condition.text,
      icon: data.current.condition.icon
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
