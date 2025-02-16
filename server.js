const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


const dotnetApiUrl = 'https://apicom-frcmfscvgze7h9cf.westeurope-01.azurewebsites.net/';


app.get('/api/items', async (req, res) => {
    try {
        const response = await axios.get(`${dotnetApiUrl}/api/items`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error: error.message });
    }
});


app.post('/api/items', async (req, res) => {
    try {
        const response = await axios.post(dotnetApiUrl, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error adding item', error: error.message });
    }
});


app.get('/', (req, res) => {
    res.send(`
        <h1>Express API</h1>
        <p>Endpoints:</p>
        <ul>
            <li>GET /api/items - Fetch items from .NET API</li>
            <li>POST /api/items - Add an item via .NET API</li>
        </ul>
    `);
});

app.listen(port, () => {
    console.log(`Express API running on http://localhost:${port}`);
});