# LavishEscapes | Luxury Travel Experiences

LavishEscapes is a beautiful, full-stack luxury travel web application. It features a dynamically styled static frontend with an Express API backend that handles customer inquiries (such as contact forms) by forwarding them via email using Nodemailer. 

This project is fully Dockerized for a smooth and isolated deployment experience.

## Project Architecture

1. **Frontend**: The user interface is built securely utilizing HTML, Javascript, and responsive design patterns. It runs via an isolated **NGINX Container** configured to securely host your static `assets` while dynamically functioning as a reverse API proxy for all `/send-email` requests.
2. **Backend**: An Express API utilizing **Node.js**:
   - Parses the contact forms in standard JSON format.
   - Routes outgoing messages intelligently through Gmail SMTP (or related mailing interfaces).

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Docker** and **Docker Compose** (e.g., Docker Desktop)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 1. Configure the Environment
The backend API requires an email account to send inquiries. Head over to the backend folder and adjust your parameters:

```bash
# Edit the file: ./backend/.env
PORT=5500
EMAIL_USER=your_real_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_RECEIVER=receiver_email@gmail.com
```

### 2. Build and Launch using Docker
Once your Docker daemon is successfully running, you can execute Docker Compose in the root of the LavishEscapes directory. This spins up the NGINX host and the backend Node instance.

```bash
docker-compose up -d --build
```

### 3. Usage & Access
- The LavishEscapes webpage will seamlessly run and be accessible exclusively at [http://localhost:8500](http://localhost:8500/).
- The backend handles endpoints securely starting at port `5500`. Since NGINX operates as an active API gateway, no separate calls need to hit port `5500` manually—everything interacts purely through the frontend client.

## Project Structure

```text
LavishEscapes/
├── backend/                  # The Node.js / Express API Backend
│   ├── .env                  # Environment Variables (Mail config)
│   ├── Dockerfile            # Container Instruction (Node-based)
│   ├── package.json          # Node Modules Mapping
│   └── server.js             # Route Handling & Server Logic
├── frontend/                 # The Static NGINX Frontend
│   ├── assets/               # Local images & styling
│   ├── Dockerfile            # Container Instruction (Nginx-based)
│   ├── index.html            # Core DOM structure
│   ├── nginx.conf            # Custom Proxy configurations 
│   └── script.js             # Client Scripting (Form API connections)
├── docker-compose.yml        # Orchestration Config for Both Services
└── README.md                 # Instruction documentation
```

## Useful Commands
- Tail logs and track events: `docker-compose logs -f`
- Safely bring down the containers: `docker-compose down` 
