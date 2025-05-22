const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, 'data');

async function initializeData() {
  try {
    // Create data directory if it doesn't exist
    await fs.mkdir(dataDir, { recursive: true });

    // Initialize empty data files if they don't exist
    const files = ['agents.json', 'crews.json', 'projects.json'];
    
    for (const file of files) {
      const filePath = path.join(dataDir, file);
      try {
        await fs.access(filePath);
      } catch (error) {
        // File doesn't exist, create it with empty array
        await fs.writeFile(filePath, '[]');
        console.log(`Created empty ${file}`);
      }
    }
    
    console.log('Data initialization completed successfully');
  } catch (error) {
    console.error('Error initializing data:', error);
    process.exit(1);
  }
}

// Run initialization
initializeData();
