import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRunProject = async (projectId) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/run`, {
        method: 'POST'
      });
      if (response.ok) {
        alert('Project started successfully!');
        fetchProjects(); // Refresh the list
      }
    } catch (error) {
      console.error('Error running project:', error);
      alert('Error running project');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Projects Dashboard</h2>
        <Link to="/projects/new" className="new-project-button">
          New Project
        </Link>
      </div>
      
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="project-meta">
              <span className="priority">Priority: {project.priority}</span>
              <span className="status">Status: {project.status}</span>
            </div>
            <div className="project-crews">
              <h4>Assigned Crews:</h4>
              <ul>
                {project.crews.map(crew => (
                  <li key={crew.id}>{crew.name}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleRunProject(project.id)}
              disabled={project.status === 'running'}
            >
              {project.status === 'running' ? 'Running...' : 'Run Project'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
