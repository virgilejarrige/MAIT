import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Container
} from '@mui/material';

interface AgentFormProps {
  onSubmit: (agent: { name: string; role: string }) => void;
}

export function AgentForm({ onSubmit }: AgentFormProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ name, role });
    setName('');
    setRole('');
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Create New Agent
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Agent Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Agent Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            fullWidth
          >
            Create Agent
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
