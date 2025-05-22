import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function AgentForm() {
  const [agent, setAgent] = useState({ name: '', role: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agent)
      });
      if (response.ok) {
        setAgent({ name: '', role: '' });
        alert('Agent created successfully!');
      }
    } catch (error) {
      console.error('Error creating agent:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Create Agent</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={agent.name}
          onChange={(e) => setAgent({ ...agent, name: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Role"
          value={agent.role}
          onChange={(e) => setAgent({ ...agent, role: e.target.value })}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Create Agent
        </Button>
      </form>
    </Box>
  );
}

export default AgentForm;
