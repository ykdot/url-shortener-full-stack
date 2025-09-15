# Scalable URL Shortener (Bitly Clone)

[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

## Project Overview

This project is a scalable, full-stack URL shortening service inspired by Bitly. It serves as a practical application of system design principles, addressing challenges in scalability, availability, and data management. 

### Key Features
* **URL Shortening**: Convert long URLs into unique, easy-to-share short links.
* **Click Analytics**: A user-facing dashboard to visualize real-time click analytics.
* **User Accounts**: Users can register and manage their own links.
* **Asynchronous Processing**: A decoupled background worker handles analytics to ensure link redirection is instantaneous.

---
## System Design & Architecture

The project follows a multi-container architecture where each core component runs in an isolated Docker container, orchestrated by Docker Compose.



* **1. The Frontend: Analytics Dashboard (Next.js)**
    A user-facing dashboard where users can log in, and create short URLs. In the admin dashboard, the admin can view real-time analytics for all links.

* **2. The Backend: A Multi-Service Approach (Express.js)**
    * **`server`**: The core API that handles user authentication and link creation.
    * **`worker`**: A dedicated background worker that consumes events from a message queue to process click analytics asynchronously. This ensures the main API remains fast and responsive.

* **3. The Database & Services**
    * **`postgres`**: A PostgreSQL database for all data persistence.
    * **`rabbitmq`**: A RabbitMQ message broker to manage the queue of click events.
    * **`redis`**: An in-memory Redis cache for frequently accessed links to reduce database load.

### Key Engineering Challenges Solved
* **Scalability**: The decoupled worker system allows the analytics processing to be scaled independently of the main API.
* **High Availability**: The use of a message queue ensures that click data is not lost even if the worker is temporarily unavailable.
* **Performance**: Caching popular links in Redis minimizes database latency for the read-heavy redirect workload.

---
## Getting Started (Development)

This project is configured to run entirely within Docker.

### Prerequisites

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

### Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Configure Environment Variables**
    Create a local environment file by copying the example template.
    ```bash
    cp .env.example .env
    ```
    Open the new `.env` file and fill in your configuration details (e.g., `DB_PASSWORD`).

3.  **Build/Run Application**
    ```bash
    docker-compose up --build
    docker-compose up
    ```

4.  **Run Database Migrations**
    After starting the application and seeing the server container turned on, open a **new terminal window** and run:
    ```bash
    docker-compose exec server npx prisma migrate dev
    ```

5.  **Run Production**
    After the database migrations, restart and build/run the production (may need to delete the node_modules folder in the servers folder):
    ```bash
    docker-compose down
    docker-compose -f docker-compose.yml up -d
    docker-compose exec server npx prisma migrate deploy   
    ```

### Accessing the Services

* **Client Application**: [http://localhost:3001](http://localhost:3001)
* **Server API**: [http://localhost:3000](http://localhost:3000)
* **RabbitMQ Management UI**: [http://localhost:15672](http://localhost:15672)
