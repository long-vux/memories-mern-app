# Memories MERN app

## Introduction

Welcome to **Memories MERN app**, a dynamic and feature-rich web application designed to help users manage and share their memories seamlessly. Built with a modern tech stack, Memories MERN app offers a responsive frontend, a robust backend, and reliable databases, all orchestrated using Docker. Whether you're looking to create, like, or share posts, Memories MERN app provides an intuitive interface and a scalable architecture to ensure a smooth user experience.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/long-vux/memories-mern-app.git
   cd memories-mern-app
   ```

2. **Set Up Environment Variables**

   Create a `.env` file in the root directory and define any necessary environment variables. For example:

   ```env
   MONGO_URI=mongodb://mongo_db:27017/memories
   REDIS_URL=redis://redis:6379
   PORT=5000
   ```

3. **Build and Start the Containers**

   Use Docker Compose to build and run all services:

   ```bash
   docker-compose up --build
   ```

   This command will:

   - Build the backend and frontend Docker images.
   - Start MongoDB, Redis, and Nginx services.
   - Deploy the backend with 3 replicas and the frontend with 2 replicas.

## Running with Docker Swarm

Docker Swarm provides native clustering functionality for Docker, allowing you to deploy and manage your application across multiple nodes seamlessly. Follow the steps below to run MyApp using Docker Swarm.

### 1. Initialize Docker Swarm

If you haven't already initialized Docker Swarm on your machine, do so with the following command:
```bash
docker swarm init
```
   
### 2. Deploy the Stack

Use the existing `docker-compose.yml` file to deploy the stack to Docker Swarm:

```bash
docker stack deploy -c docker-compose.yml myapp-stack
```

This command will:

- Deploy all services defined in the `docker-compose.yml` file as a stack named `myapp-stack`.
- Utilize Docker Swarm's orchestration features to manage service replicas and networking.

### 3. Verify the Deployment

Check the status of your stack and services:

```bash
docker stack ls
docker stack services myapp-stack
```
   
You should see all services listed with the desired number of replicas running.

### 4. Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **Nginx**: [http://localhost](http://localhost) (Proxies requests to the backend)

### 5. Scaling Services

You can scale services using Docker Swarm with the following command:

```bash
docker service scale myapp-stack_backend=3 myapp-stack_frontend=2
```

Replace `myapp-stack_backend` and `myapp-stack_frontend` with the actual service names if they differ.

### 6. Removing the Stack

To remove the deployed stack from Docker Swarm:

```bash
docker stack rm myapp-stack
```

## Conclusion

This guide provides a comprehensive overview of how to install and run Memories MERN app using Docker Compose and Docker Swarm. Whether you're using Docker Compose for local development or Docker Swarm for production environments, this setup ensures a seamless and scalable deployment process. Enjoy managing your memories with Memories MERN app!

<!-- ## Link to watch the instruction video

- [Memories MERN app](https://www.youtube.com/watch?v=q0B1F4Zy-K8) -->
