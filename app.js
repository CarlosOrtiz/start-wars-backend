const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const characterRoutes = require('./src/character/character.router');
const syncRoutes = require('./src/sync/sync.router');
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(`/${process.env.APP_URL_PREFIX}/person`, characterRoutes);
app.use(`/${process.env.APP_URL_PREFIX}/sync`, syncRoutes);

app.get("/", (request, response) => {
  const result = "🚀 Api is running";
  response.send(result);
}).listen(PORT, () => {
  console.log(`🚀 Api running at http://localhost:${PORT}`);
});

module.exports = app;
