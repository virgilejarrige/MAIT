const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const apiRoutes = require('./api/index');

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');

// Initialize data files
['projects.json', 'agents.json', 'crews.json'].forEach(file => {
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
  }
});

app.use(bodyParser.json());
app.use('/api', apiRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '..', 'frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
