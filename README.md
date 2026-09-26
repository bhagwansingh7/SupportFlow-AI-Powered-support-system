SupportFlow- A Customer support application(backend focused)

**SupportFlow** is a full-stack customer support and ticket management system that enables users, support agents, and administrators to manage support requests through a structured workflow.

The project focuses on practical backend engineering concepts such as **REST APIs, authentication, authorization, RBAC, relational database design, ticket assignment, activity tracking, and user-agent communication**.

---

## 🚀 Version 1

SupportFlow v1 provides the core functionality required for a support ticket management system.

### Core Features

* User registration and login
* JWT-based authentication
* HTTP-only cookie-based authentication
* Role-based access control
* User ticket creation and management
* Admin agent registration
* Ticket assignment to agents
* Agent access to assigned tickets
* Ticket status management
* Ticket activity tracking
* User-agent ticket messaging
* Ticket conversation history
* Admin-level ticket and user management
* MySQL database integration
* RESTful API architecture
* React-based ticket activity and messaging interface

---

# 👥 User Roles

SupportFlow uses three primary roles.

### User

A user can:

* Register and log in
* Create support tickets
* View their tickets
* View ticket details
* Track ticket status
* View ticket activity
* Send messages to assigned support agents
* View the complete ticket conversation

### Agent

An agent can:

* Log in using an agent account
* View tickets assigned to them
* Access assigned ticket details
* View ticket activity
* Communicate with users through ticket messages
* Work on assigned support requests
* Update ticket status

### Admin

An administrator can:

* Manage users
* Register support agents
* View all tickets
* Assign tickets to agents
* Manage support operations
* Manage users
* manage Agents
* Monitor ticket activity

---

# 🎫 Ticket Management

A ticket represents a user's support request.

Each ticket contains information such as:

* Title
* Description
* Priority
* Category
* Status
* Created by
* Assigned agent
* Created timestamp
* Updated timestamp

Example ticket lifecycle:

```text
User creates ticket
        │
        ▼
      OPEN
        │
        ▼
Admin assigns agent
        │
        ▼
Agent receives ticket
        │
        ▼
User ↔ Agent communication
        │
        ▼
Ticket activity updates
        │
        ▼
    RESOLVED
```

---

# 💬 Ticket Messages

SupportFlow v1 includes a dedicated **Ticket Messages** system for communication between users and support agents.

Instead of modifying the original ticket description whenever a user or agent wants to communicate, messages are stored separately.

```text
User
 │
 │  "I am still unable to login."
 ▼
Ticket Messages
 │
 │
Agent
 │
 │  "I have checked your account. Please try..."
 ▼
Ticket Messages
```

This allows each ticket to maintain a complete conversation history.

### Ticket Messages can contain:

* Ticket ID
* Sender
* Message content
* Sender role
* Timestamp

The React frontend displays these messages as part of the ticket interface, allowing users and agents to communicate within the context of a specific ticket.

---

# 📋 Ticket Activity

SupportFlow also maintains a **Ticket Activity** history.

Ticket activity records important events that happen during the lifetime of a ticket.

For example:

```text
Ticket created
      ↓
Ticket assigned to Agent
      ↓
Agent started working
      ↓
Priority changed
      ↓
Status changed
      ↓
Agent responded
      ↓
Ticket resolved
```

The activity history provides a chronological record of changes made to the ticket.

### Example

```text
Ticket Activity

────────────────────────────────────

Ticket created by Bhagwansingh
Today, 10:30 AM

Ticket assigned to Agent
Today, 10:45 AM

Status changed from OPEN → IN PROGRESS
Today, 11:10 AM

Agent added a message
Today, 11:15 AM

Status changed from IN PROGRESS → RESOLVED
Today, 12:05 PM
```

The React frontend provides a **Ticket Activity** section where users and agents can view the ticket's historical events.

---

# 🗄️ Database Design

SupportFlow uses **MySQL** as its relational database.

The core entities in v1 include:

```text
┌──────────────┐
│    Users     │
├──────────────┤
│ id           │
│ name         │
│ email        │
│ password     │
│ role         │
└──────┬───────┘
       │
       │ creates / assigned
       ▼
┌──────────────┐
│   Tickets    │
├──────────────┤
│ id           │
│ title        │
│ description  │
│ priority     │
│ category     │
│ status       │
│ created_by   │
│ assigned_to  │
│ created_at   │
│ updated_at   │
└───┬──────┬───┘
    │      │
    │      │
    ▼      ▼
┌───────────────┐    ┌────────────────┐
│TicketActivity │    │ TicketMessages │
├───────────────┤    ├────────────────┤
│ id            │    │ id             │
│ ticket_id     │    │ ticket_id      │
│ ...           │    │ sender_id      │
│ ...           │    │ message        │
│ created_at    │    │ ...            │
└───────────────┘    │ created_at     │
                     └────────────────┘
```

### Main Relationships

```text
User
 │
 ├──────── creates ──────────► Ticket
 │
 └──────── sends ────────────► TicketMessage
                                  │
                                  │
Ticket ◄─────────────────────────┘
 │
 └──────── contains ────────────► TicketActivity
```

This separation keeps the main **Tickets** table focused on the current state of a ticket while **TicketActivity** and **TicketMessages** maintain its history and communication.

---

# 🔐 Authentication & Security

Security is an important part of SupportFlow v1.

The backend implements:

* **JWT authentication**
* **HTTP-only cookies**
* **bcrypt password hashing**
* **Role-based authorization**
* Protected API routes
* Authentication middleware
* Authorization middleware
* Password exclusion from API responses
* Environment variables for sensitive configuration
* CORS configuration for frontend-backend communication

### Authentication Flow

```text
User
 │
 ▼
Login
 │
 ▼
Express API
 │
 ├── Verify credentials
 │
 ├── Compare hashed password
 │
 └── Generate JWT
 │
 ▼
HTTP-only Cookie
 │
 ▼
Protected API Request
 │
 ▼
Authentication Middleware
 │
 ▼
Authorization Middleware
 │
 ▼
Controller
```

---

# 🏗️ System Architecture

```text
                 ┌──────────────────────┐
                 │      React Client    │
                 │                      │
                 │  Tickets             │
                 │  Ticket Details      │
                 │  Ticket Activity     │
                 │  Ticket Messages     │
                 └──────────┬───────────┘
                            │
                            │ REST API
                            ▼
                 ┌──────────────────────┐
                 │    Express Server    │
                 │                      │
                 │ Authentication       │
                 │ Authorization        │
                 │ User APIs            │
                 │ Ticket APIs           │
                 │ Activity APIs        │
                 │ Message APIs         │
                 └──────────┬───────────┘
                            │
                            │ mysql2
                            ▼
                 ┌──────────────────────┐
                 │        MySQL         │
                 │                      │
                 │ Users                │
                 │ Tickets              │
                 │ TicketActivity       │
                 │ TicketMessages       │
                 └──────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Context API
* React Router DOM

## Backend

* Node.js
* Express.js
* JWT
* bcrypt
* cookie-parser
* CORS
* dotenv

## Database

* MySQL
* mysql2/promise

---

# 📁 Project Structure

```text
SupportFlow/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
|   |   |   ├── user.controller.js
│   │   │   └── admin.controller.js
            ├── agent.contoller.js
│   │   │   └── tickets.controller.js
│   │   │   
│   │   │
│   │   ├── middleware/
│   │   │   ├── isAuth.js
│   │   │   └── isAuthorized.js
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   └── ticket.model.js
│   │   │   ├── admin.model.js
│   │   │   └── agent.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── tickets.route.js
│   │   │   └── admin.route.js
│   │   │   ├── isAuth.js
│   │   │   └── isAuthorized.js
│   │   
│   │__ server.js 
│   │
│   ├── .env
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── apis/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 🔌 API Overview

## Authentication

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| POST   | `/api/user/register` | Register a user                |
| POST   | `/api/user/login`    | Login                          |
| GET    | `/api/user/me`       | Get current authenticated user |

## Tickets

| Method | Endpoint                      | Description            |
| ------ | ----------------------------- | ---------------------- |
| POST   | `/api/tickets/createTicket`   | Create a ticket        |
| GET    | `/api/tickets/getAll`         | Get all tickets        |
| GET    | `/api/tickets/getById/:id`    | Get ticket by ID       |
| DELETE | `/api/tickets/deleteById/:id` | Delete ticket          |
| POST   | `/api/tickets/:id/assign`     | Assign ticket to agent |

## Ticket Activity

Ticket activity APIs are used to record and retrieve important events associated with a ticket.

```text
Ticket
   │
   └──► Activity History
          ├── Created
          ├── Assigned
          ├── Status Changed
          ├── Priority Changed
          └── Resolved
```

## Ticket Messages

Ticket message APIs handle communication between users and agents within a ticket.

```text
Ticket
   │
   └──► Messages
          ├── User message
          ├── Agent reply
          ├── User reply
          └── Agent reply
```

> Authentication and role-based authorization are applied to protected endpoints.

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/bhagwansingh7/SupportFlow-AI-Powered-support-system.git

cd SupportFlow
```

## 2. Install backend dependencies

```bash
cd Backend
npm install
```

## 3. Configure environment variables

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=supportflow

JWT_SECRET=your_secret_key
JWT_EXPIRY=1d
```

## 4. Start the backend

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

## 5. Install frontend dependencies

Open another terminal:

```bash
cd Frontend
npm install
```

## 6. Start the frontend

```bash
npm run dev
```

---

# 🔒 Environment Variables

Sensitive credentials should not be committed to the repository.

Example:

```text
DB_PASSWORD
JWT_SECRET
```

Make sure `.env` is included in `.gitignore`.

---

# 🧠 Key Backend Concepts Implemented

SupportFlow v1 was built to practice and demonstrate practical backend engineering concepts:

* REST API design
* Express.js routing
* Middleware
* JWT authentication
* HTTP-only cookies
* Password hashing
* Role-based access control
* Authentication vs authorization
* MySQL relational database design
* Foreign-key relationships
* Ticket assignment
* Ticket lifecycle management
* Activity/event tracking
* Persistent ticket conversations
* SQL queries
* Frontend-backend communication
* CORS and credentials
* Environment configuration
* API debugging
* Deployment fundamentals

---

# 🔮 Future Improvements

Future versions may introduce additional backend and infrastructure concepts such as:

* Redis caching
* Rate limiting
* Docker containerization
* CI/CD pipeline
* Real-time messaging
* AI-assisted ticket classification
* RAG-based support knowledge base
* Email notifications
* Advanced agent management
* Ticket analytics
* Background job processing
* Kafka/event-driven architecture
* Production monitoring and logging

These features are **not part of v1** and will be introduced incrementally.

---

# 📌 Project Status

**Version:** `v1.0`

**Status:** Core support-ticket system implemented

SupportFlow v1 establishes the foundation for a production-style support platform with:

```text
Authentication
      +
Authorization
      +
Ticket Management
      +
Agent Assignment
      +
Ticket Activity
      +
User-Agent Messaging
      +
MySQL
```

The project will be incrementally extended with scalability, infrastructure, security, and AI-focused features in future versions.

---

# 👨‍💻 Author

**Bhagwansingh Dhangar**

B.Tech CSE Student
Backend / Full-Stack Development
