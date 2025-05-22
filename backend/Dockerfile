FROM node:18-slim

# Install Python and pip
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Create and activate virtual environment
ENV VIRTUAL_ENV=/app/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create data directory
RUN mkdir -p data

EXPOSE 3000

# Create a script to run both Node.js and Python services
COPY <<-"EOF" /app/start.sh
#!/bin/bash
# Ensure we're using the virtual environment
source /app/venv/bin/activate
# Start the Node.js server
node server.js
EOF

RUN chmod +x /app/start.sh

CMD ["/bin/bash", "/app/start.sh"]
