import sys
import json
import os
from crewai import Agent, Crew, Task

def read_json_file(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

def main(project_id):
    # Load project data
    data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
    projects = read_json_file(os.path.join(data_dir, 'projects.json'))
    agents = read_json_file(os.path.join(data_dir, 'agents.json'))
    crews = read_json_file(os.path.join(data_dir, 'crews.json'))

    # Find project
    project = next((p for p in projects if p['id'] == project_id), None)
    if not project:
        print(f"Project {project_id} not found")
        sys.exit(1)

    # Create agents for the project's crews
    crew_agents = []
    for crew_id in project.get('crews', []):
        crew = next((c for c in crews if c['id'] == crew_id), None)
        if crew:
            for agent_id in crew.get('agents', []):
                agent_data = next((a for a in agents if a['id'] == agent_id), None)
                if agent_data:
                    agent = Agent(
                        name=agent_data['name'],
                        role=agent_data['role'],
                        goal=f"Complete tasks for project: {project['name']}",
                        backstory=f"An AI agent specialized in {agent_data['role']}"
                    )
                    crew_agents.append(agent)

    if not crew_agents:
        print("No agents found for the project's crews")
        sys.exit(1)

    # Create crew
    crew = Crew(
        agents=crew_agents,
        tasks=[
            Task(
                description=project['description'],
                agent=crew_agents[0]  # Assign to first agent, can be modified based on needs
            )
        ],
        verbose=True
    )

    # Execute the crew's task
    result = crew.kickoff()
    print("Project execution completed")
    print("Result:", result)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python crewai-runner.py <project_id>")
        sys.exit(1)
    main(sys.argv[1])
