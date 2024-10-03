# Project Title

## Overview

This project consists of a frontend and a backend service that can be run using Docker and Docker Compose. This README provides instructions on how to set up and run both services.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

/project-root │ ├── /frontend # Frontend application directory │ ├── Dockerfile # Dockerfile for frontend │ └── ... │ ├── /backend # Backend application directory │ ├── Dockerfile # Dockerfile for backend │ └── ... │ └── docker-compose.yml # Docker Compose configuration

## Getting Started

### Step 1: Clone the Repository

git clone <repository-url>
cd <project-directory>

Step 2: Build and Run the Project
Run the following command in the root directory of the project to build the services and start the containers:

docker-compose up --build

This command will build the Docker images for both the frontend and backend and start the services. You should see output indicating that both services are running.

Step 3: Access the Applications
Frontend: Open your web browser and navigate to http://localhost:3001.
Backend: The backend API should be accessible at http://localhost:3003.
Step 4: Stopping the Services
To stop the running services, press CTRL + C in the terminal where Docker Compose is running, or run:

docker-compose down

Step 5: Running Tests (Optional)
If you have tests configured for either the frontend or backend, you can run them using Docker Compose. Make sure you have defined the necessary commands in your respective Dockerfile or docker-compose.yml.

### Key Changes
- Added a specific mention of running the project with `docker-compose up --build` in the **Getting Started** section to clarify that this command needs to be executed from the root directory.

Feel free to make any additional changes or adjustments as necessary!
