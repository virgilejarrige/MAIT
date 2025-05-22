import { useState } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { AgentForm } from './components/AgentForm'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  const handleCreateAgent = (agent: { name: string; role: string }) => {
    console.log('New agent:', agent)
    // TODO: Add API call to create agent
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <header className="app-header">
          <h1>MAIT - My AI Team</h1>
        </header>
        <main>
          <AgentForm onSubmit={handleCreateAgent} />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
