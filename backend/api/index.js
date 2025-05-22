const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');

// Data file paths
const PROJECTS_FILE = path.join(__dirname, '../data/projects.json');
const AGENTS_FILE = path.join(__dirname, '../data/agents.json');
const CREWS_FILE = path.join(__dirname, '../data/crews.json');

// Helper function to read JSON file
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(filePath, '[]');
      return [];
    }
    throw error;
  }
}

// Helper function to write JSON file
async function writeJsonFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Agents routes
router.get('/agents', async (req, res) => {
  try {
    const agents = await readJsonFile(AGENTS_FILE);
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: 'Error reading agents' });
  }
});

router.post('/agents', async (req, res) => {
  try {
    const agents = await readJsonFile(AGENTS_FILE);
    const newAgent = {
      id: Date.now().toString(),
      ...req.body
    };
    agents.push(newAgent);
    await writeJsonFile(AGENTS_FILE, agents);
    res.status(201).json(newAgent);
  } catch (error) {
    res.status(500).json({ error: 'Error creating agent' });
  }
});

// Crews routes
router.get('/crews', async (req, res) => {
  try {
    const crews = await readJsonFile(CREWS_FILE);
    res.json(crews);
  } catch (error) {
    res.status(500).json({ error: 'Error reading crews' });
  }
});

router.post('/crews', async (req, res) => {
  try {
    const crews = await readJsonFile(CREWS_FILE);
    const newCrew = {
      id: Date.now().toString(),
      ...req.body
    };
    crews.push(newCrew);
    await writeJsonFile(CREWS_FILE, crews);
    res.status(201).json(newCrew);
  } catch (error) {
    res.status(500).json({ error: 'Error creating crew' });
  }
});

// Projects routes
router.get('/projects', async (req, res) => {
  try {
    const projects = await readJsonFile(PROJECTS_FILE);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error reading projects' });
  }
});

router.post('/projects', async (req, res) => {
  try {
    const projects = await readJsonFile(PROJECTS_FILE);
    const newProject = {
      id: Date.now().toString(),
      status: 'pending',
      ...req.body
    };
    projects.push(newProject);
    await writeJsonFile(PROJECTS_FILE, projects);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Error creating project' });
  }
});

// Run project
router.post('/projects/:id/run', async (req, res) => {
  try {
    const projects = await readJsonFile(PROJECTS_FILE);
    const project = projects.find(p => p.id === req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Update project status
    project.status = 'running';
    await writeJsonFile(PROJECTS_FILE, projects);

    // Run the Python script
    const pythonProcess = spawn('python3', [
      path.join(__dirname, 'crewai-runner.py'),
      req.params.id
    ]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python error: ${data}`);
    });

    pythonProcess.on('close', async (code) => {
      const updatedProjects = await readJsonFile(PROJECTS_FILE);
      const projectToUpdate = updatedProjects.find(p => p.id === req.params.id);
      if (projectToUpdate) {
        projectToUpdate.status = code === 0 ? 'completed' : 'failed';
        await writeJsonFile(PROJECTS_FILE, updatedProjects);
      }
    });

    res.json({ message: 'Project started' });
  } catch (error) {
    res.status(500).json({ error: 'Error running project' });
  }
});

module.exports = router;
