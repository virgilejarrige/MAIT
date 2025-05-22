# MAIT (My AI Team)

An AI Project Management System that allows you to create and manage AI agents and crews for your projects.

## Features

- Agent/crew creation interface
- Project tracking dashboard
- Queue system with priority management
- Complex result handling
- Automatic SSL via Let's Encrypt

## Requirements

- NVIDIA GPU with 12GB VRAM
- Docker and Docker Compose
- Domain name (for production deployment)

## Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd MAIT
```

2. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your settings
nano .env
```

3. Install dependencies (optional for development):
```bash
# Frontend dependencies
cd frontend && npm install
cd ..

# Backend dependencies
cd backend && npm install
cd ..

# Python dependencies (if developing the AI components)
cd backend && pip install -r requirements.txt
cd ..
```

4. Start the development environment:
```bash
# Start all services
docker-compose up

# Or start in detached mode
docker-compose up -d

# View logs if running in detached mode
docker-compose logs -f
```

4. Access the application:
- Development: http://localhost:3001
- Production: https://your-domain.com

## Production Deployment

1. Set up your domain and point it to your server.

2. Configure your GitLab CI/CD variables:
- VM_IP: Your server IP
- DOMAIN: Your domain name
- ADMIN_USER: Admin username
- ADMIN_PASSWORD: Admin password (masked)

3. Push to main branch to trigger deployment.

4. Initial SSL certificate setup:
```bash
docker-compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot -d your-domain.com
```

## Project Structure

```
MAIT/
├── .github/                    # GitHub templates and workflows
├── backend/                    # Node.js Express API
│   ├── api/                   # API routes and AI runner
│   ├── data/                 # JSON data storage
│   ├── Dockerfile           # Backend container configuration
│   ├── package.json        # Node.js dependencies
│   └── requirements.txt   # Python dependencies
├── frontend/                  # React application
│   ├── src/                 # Source code
│   │   ├── components/     # React components
│   │   └── assets/        # Static assets
│   ├── Dockerfile         # Frontend container configuration
│   └── package.json      # Frontend dependencies
├── infrastructure/           # Infrastructure configuration
│   ├── nginx/             # Nginx reverse proxy
│   └── certbot/          # SSL certificate management
├── docker-compose.yml       # Container orchestration
├── .env.example            # Environment variables template
└── README.md              # Project documentation
```

## Data Structure

The application uses three main JSON files to store data. You can find examples in `/backend/data/examples/`.

### agents.json
Stores AI agent definitions with their roles and capabilities.

Fields:
- `id`: Unique identifier (timestamp-based)
- `name`: Agent's name
- `role`: Agent's specialized role or function
- `createdAt`: Creation timestamp

### crews.json
Defines teams of agents that work together.

Fields:
- `id`: Unique identifier
- `name`: Crew name
- `description`: Crew's purpose and specialization
- `agents`: Array of agent IDs that form this crew
- `createdAt`: Creation timestamp

### projects.json
Contains project definitions and their execution status.

Fields:
- `id`: Unique identifier
- `name`: Project name
- `description`: Project details and objectives
- `priority`: Importance level (1-5, 1 being highest)
- `status`: Current state (`pending`, `running`, `completed`, `failed`)
- `crews`: Array of crew IDs assigned to this project
- `results`: (Optional) Project outcomes including:
  - `summary`: Result overview
  - `recommendations`: Action items or suggestions
  - `completedAt`: Completion timestamp
- `createdAt`: Creation timestamp

Example files are provided in `/backend/data/examples/`. To initialize your own data:

```bash
# Create empty data files
cd backend/data
echo '[]' > agents.json
echo '[]' > crews.json
echo '[]' > projects.json

# Or copy example files
cp examples/agents.example.json agents.json
cp examples/crews.example.json crews.json
cp examples/projects.example.json projects.json
```

## API Documentation

### Endpoints

#### Agents
- `GET /api/agents` - List all agents
- `POST /api/agents` - Create a new agent
  ```json
  {
    "name": "DataAnalyst",
    "role": "Financial analysis"
  }
  ```

#### Crews
- `GET /api/crews` - List all crews
- `POST /api/crews` - Create a new crew
  ```json
  {
    "name": "Analytics Team",
    "description": "Financial data analysis team",
    "agents": ["agent_id_1", "agent_id_2"]
  }
  ```

#### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create a new project
  ```json
  {
    "name": "Q3 Analysis",
    "description": "Analyze Q3 financial data",
    "priority": 1,
    "crews": ["crew_id_1"]
  }
  ```
- `POST /api/projects/:id/run` - Run a project
  ```json
  {
    "crewIds": ["crew_id_1"]
  }
  ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Troubleshooting

### Common Issues

1. **Docker Compose Issues**
   ```bash
   # Remove all containers and volumes
   docker-compose down -v
   
   # Rebuild all images
   docker-compose build --no-cache
   
   # Start fresh
   docker-compose up
   ```

2. **Permission Issues**
   ```bash
   # Fix data directory permissions
   sudo chown -R 1000:1000 backend/data
   ```

3. **SSL Certificate Issues**
   ```bash
   # Force SSL certificate renewal
   docker-compose run --rm certbot renew --force-renewal
   docker-compose restart nginx
   ```

### Logs

View logs for specific services:
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs nginx
```

## Maintenance

### Updates

1. Update dependencies:
```bash
# Frontend
cd frontend
npm update
npm audit fix

# Backend
cd backend
npm update
npm audit fix
pip install --upgrade -r requirements.txt
```

2. Update Docker images:
```bash
# Pull latest base images
docker-compose pull

# Rebuild services
docker-compose build --pull
```

### Backups

1. Backup data:
```bash
# Create a backup of the data directory
tar -czf mait_backup_$(date +%Y%m%d).tar.gz backend/data/

# Backup environment configuration
cp .env env_backup_$(date +%Y%m%d)
```

### Monitoring

1. Container health:
```bash
# View container status
docker-compose ps

# View container resource usage
docker stats
```

2. System resources:
```bash
# View GPU usage
nvidia-smi

# View system resources
htop
```

## Security Notes

1. Always keep your `.env` file secure and never commit it to version control
2. Regularly update dependencies to patch security vulnerabilities
3. Monitor system logs for suspicious activities
4. Keep Docker and host system updated
5. Follow the security best practices in SECURITY.md

