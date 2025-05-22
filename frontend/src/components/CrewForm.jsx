import { useState, useEffect } from 'react';

function CrewForm() {
  const [crew, setCrew] = useState({
    name: '',
    description: '',
    agents: []
  });
  const [availableAgents, setAvailableAgents] = useState([]);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agents');
      if (response.ok) {
        const agents = await response.json();
        setAvailableAgents(agents);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/crews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(crew)
      });
      if (response.ok) {
        setCrew({ name: '', description: '', agents: [] });
        alert('Crew created successfully!');
      }
    } catch (error) {
      console.error('Error creating crew:', error);
      alert('Error creating crew');
    }
  };

  const handleAgentSelection = (agentId) => {
    const isSelected = crew.agents.includes(agentId);
    if (isSelected) {
      setCrew({
        ...crew,
        agents: crew.agents.filter(id => id !== agentId)
      });
    } else {
      setCrew({
        ...crew,
        agents: [...crew.agents, agentId]
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Crew</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={crew.name}
            onChange={(e) => setCrew({ ...crew, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={crew.description}
            onChange={(e) => setCrew({ ...crew, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Select Agents:</label>
          <div className="agents-list">
            {availableAgents.map(agent => (
              <div key={agent.id} className="agent-item">
                <input
                  type="checkbox"
                  checked={crew.agents.includes(agent.id)}
                  onChange={() => handleAgentSelection(agent.id)}
                />
                <span>{agent.name} - {agent.role}</span>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Create Crew</button>
      </form>
    </div>
  );
}

export default CrewForm;
