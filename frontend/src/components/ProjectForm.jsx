import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectForm() {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: '',
    description: '',
    priority: 1,
    crews: []
  });
  const [availableCrews, setAvailableCrews] = useState([]);

  useEffect(() => {
    fetchCrews();
  }, []);

  const fetchCrews = async () => {
    try {
      const response = await fetch('/api/crews');
      if (response.ok) {
        const crews = await response.json();
        setAvailableCrews(crews);
      }
    } catch (error) {
      console.error('Error fetching crews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      });
      if (response.ok) {
        alert('Project created successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project');
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Priority (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={project.priority}
            onChange={(e) => setProject({ ...project, priority: parseInt(e.target.value) })}
            required
          />
        </div>
        <div>
          <label>Select Crews:</label>
          <div className="crews-list">
            {availableCrews.map(crew => (
              <div key={crew.id} className="crew-item">
                <input
                  type="checkbox"
                  checked={project.crews.includes(crew.id)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setProject({
                      ...project,
                      crews: isChecked
                        ? [...project.crews, crew.id]
                        : project.crews.filter(id => id !== crew.id)
                    });
                  }}
                />
                <span>{crew.name}</span>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default ProjectForm;
