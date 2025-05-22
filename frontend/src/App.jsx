import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AgentForm from './components/AgentForm';
import CrewForm from './components/CrewForm';
import ProjectForm from './components/ProjectForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <>
            <AgentForm />
            <CrewForm />
          </>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/new" element={<ProjectForm />} />
      </Routes>
    </Router>
  );
}

export default App;
