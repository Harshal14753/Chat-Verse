# ChatVerse 💬

A full-stack real-time chat application built with Spring Boot and React, featuring WebSocket-based messaging, user authentication, and modern UI/UX design.

![ChatVerse Banner](https://img.shields.io/badge/ChatVerse-Real--Time%20Messaging-blue?style=for-the-badge)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.4-brightgreen?style=flat-square)
![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat-square)
![WebSocket](https://img.shields.io/badge/WebSocket-Enabled-orange?style=flat-square)

---

## 🎬 Project Demo

### 📹 Video Demonstration

Watch the full demonstration of ChatVerse in action:

<div align="center">
  <h3>
    <a href="https://drive.google.com/file/d/1w3Pb3ysF-pVvoRmOfh4v0ldbxAcfn5q2/view?usp=drive_link">
      🎥 Watch Full Demo Video →
    </a>
  </h3>
  <p><em>Complete walkthrough of all features and functionalities</em></p>
</div>

> **Note**: The demo video showcases all key features including user registration, login, real-time messaging, user search, profile management, and password change functionality. See how WebSocket technology enables instant message delivery and read receipts.

### 📸 Application Screenshots

#### 1. Home Page
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/68b0b9a3-b858-4fd4-94d2-c5afcc045ed2" />

**Description**: The landing page of ChatVerse welcomes users with a clean and modern interface. It features the application branding, key highlights, and call-to-action buttons to either login or register. The home page sets the tone for the entire application with its professional design and intuitive navigation.

---

#### 2. Login Page
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/756dbed2-5713-44b0-97a0-66d139d0d12e" />

**Description**: The login page provides a secure authentication interface where users can access their accounts. Users enter their registered phone number and password to sign in. The page includes form validation, error handling, and a link to the registration page for new users. The design is clean and focused on user experience.

---

#### 3. Registration Page
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/6e379c88-98dd-410e-b89d-2b21cb2cfa95" />

**Description**: New users can create their ChatVerse account through this registration page. The form collects essential information including name, phone number, password, and an optional "about" section. Built-in validation ensures data integrity, and users are redirected to login after successful registration. The interface guides users through each step with clear labels and helpful feedback.

---

#### 4. Chat List
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/969b5827-a9ea-4114-a0cb-cfcff7f364c4" />

**Description**: The chat list displays all active conversations with contacts. Each chat room entry shows:
- Contact name and profile picture
- Last message preview
- Timestamp of the last message
- Unread message indicators (if any)
- A "New Chat" button to start conversations with new contacts

The list provides quick access to all ongoing conversations and makes it easy to switch between different chats.

---

#### 5. Chat Interface
<img width="1919" height="1016" alt="Image" src="https://github.com/user-attachments/assets/ddb18fba-4ad7-4557-ad6b-f4b2b45db3d3" />

**Description**: The heart of ChatVerse - the real-time chat interface. This screen is divided into two main sections:
- **Left Panel**: Displays all active chat rooms with contact names, profile pictures, and last message previews. A "New Chat" button allows users to start conversations with new contacts.
- **Right Panel**: Shows the active conversation with real-time message updates. Features include:
  - Message bubbles with timestamps
  - Read receipts (✓ Sent, ✓✓ Delivered, ✓✓ Read)
  - Online/offline status indicators
  - Smooth auto-scrolling to latest messages
  - Message input field with send button
  
The interface uses WebSocket technology for instant message delivery, ensuring a seamless chatting experience.

---

#### 6. Search Users
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/550d745c-49ae-4bf6-b563-5d98bea03f1c" />

**Description**: The search functionality allows users to find and connect with other ChatVerse users by entering their phone number. Once found, users can:
- View the searched user's profile
- Start a new chat conversation
- See if the user is currently online
- Access contact details instantly

This feature facilitates easy discovery and connection between users on the platform, making it simple to expand your network.

---

#### 7. User Profile Page
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/eed1fa1b-ee66-4761-96d3-f9ea29a2c4c3" />

**Description**: The profile page displays comprehensive user information including:
- Profile picture
- Full name
- Phone number (username)
- About/Status message
- Current online/offline status
- Account settings access

Users can view their own profile or other users' profiles when searching for new contacts. The page provides options to edit profile information and navigate to password change functionality.

---

#### 8. Change Password
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/5ff9a958-29c8-4146-a733-e07a52cb923a" />

**Description**: A dedicated security page where users can update their account password. The form includes:
- Current password field (for verification)
- New password field
- Confirm new password field
- Form validation for password strength
- Secure password update with Spring Security

This feature ensures users can maintain account security by regularly updating their credentials. The interface provides clear feedback and validation to guide users through the password change process.

---

#### Key UI Features Visible in Screenshots:
- ✨ **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Clean Interface**: Minimalist design focusing on functionality
- ⚡ **Real-Time Updates**: Live message delivery and status updates
- 🔔 **Toast Notifications**: Non-intrusive feedback for user actions
- 🎯 **Intuitive Navigation**: Easy-to-use header with profile and logout options
- 📱 **Modern Components**: React Icons, smooth animations, and professional styling
- 🔒 **Secure Authentication**: Protected routes and encrypted passwords
- 💬 **WebSocket Integration**: Instant bidirectional communication

> **Note**: Screenshots showcase the actual production application hosted on Vercel. The interface demonstrates real-time messaging capabilities powered by WebSocket technology.

---

## 📋 Project Description

**ChatVerse** is a modern, real-time messaging platform that enables users to communicate instantly through one-on-one chat rooms. Built with cutting-edge technologies, it provides a seamless chat experience with features like real-time message delivery, read receipts, user status tracking, and secure authentication. The application leverages WebSocket technology for instant bidirectional communication between the client and server.

The project is designed with a microservices-inspired architecture, separating the backend (Spring Boot REST API + WebSocket server) and frontend (React SPA), making it scalable, maintainable, and production-ready. It's deployed on cloud platforms with the backend hosted on Render and the frontend on Vercel.

---

## �🎯 Core Technologies

- **Backend**: Spring Boot 3.5.4 (Java 17)
- **Frontend**: React 19.1.1 with Vite
- **Real-Time Communication**: WebSocket (STOMP protocol)
- **Database**: PostgreSQL (JPA) + MongoDB (Chat storage)
- **Security**: Spring Security with password encryption
- **API Communication**: Axios + REST APIs
- **Build Tools**: Maven (Backend), Vite (Frontend)

---

## ✨ Key Features

### 🔐 **User Authentication & Security**
- Secure user registration and login system
- Password encryption using Spring Security
- Session management with authentication tokens
- Protected routes and API endpoints
- Change password functionality

### 💬 **Real-Time Messaging**
- Instant message delivery using WebSocket
- One-on-one private chat rooms
- Message status tracking (SENT, DELIVERED, READ)
- Auto-delivery and auto-read receipts when users are active
- Persistent message history

### 👥 **User Management**
- User profile management
- Search users by phone number
- User status tracking (ONLINE/OFFLINE)
- Create new chat rooms with any registered user

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Clean and intuitive interface
- Real-time message updates
- Toast notifications for user feedback
- Smooth scrolling to latest messages
- Profile picture support

---

## 🛠️ Tech Stack

### **Backend (Spring Boot)**
| Technology | Purpose |
|-----------|---------|
| Spring Boot 3.5.4 | Core framework |
| Spring Security | Authentication & Authorization |
| Spring Data JPA | PostgreSQL ORM |
| Spring Data MongoDB | NoSQL message storage |
| Spring WebSocket | Real-time communication |
| STOMP Protocol | WebSocket messaging |
| PostgreSQL | User & chat room data |
| MongoDB | Message storage |
| Lombok | Boilerplate reduction |
| Maven | Dependency management |

### **Frontend (React)**
| Technology | Purpose |
|-----------|---------|
| React 19.1.1 | UI framework |
| React Router | Navigation & routing |
| Vite 7.0.4 | Build tool & dev server |
| Axios | HTTP client |
| STOMP.js | WebSocket client |
| SockJS | WebSocket fallback |
| React Hot Toast | Notifications |
| React Icons | UI icons |
| CSS3 | Styling |

### **DevOps & Deployment**
- **Backend Hosting**: Render
- **Frontend Hosting**: Vercel
- **Database**: Render PostgreSQL + MongoDB Atlas
- **Containerization**: Docker (optional)
- **Version Control**: Git

---

## 🌟 Features

### Authentication & Authorization
- ✅ User registration with phone number and password
- ✅ Secure login with Spring Security
- ✅ Protected routes requiring authentication
- ✅ Profile management
- ✅ Change password functionality
- ✅ Logout with session cleanup

### Chat Functionality
- ✅ Create one-on-one chat rooms
- ✅ Real-time message sending and receiving
- ✅ WebSocket connection with automatic reconnection
- ✅ Message persistence in MongoDB
- ✅ Message status indicators (✓ Sent, ✓✓ Delivered, ✓✓ Read)
- ✅ Auto-mark as delivered when recipient views the room
- ✅ Auto-mark as read when recipient is actively viewing
- ✅ Timestamp for each message
- ✅ Chat room list with last message preview

### User Features
- ✅ Search users by phone number
- ✅ View user profiles
- ✅ User status tracking (Online/Offline)
- ✅ Add new contacts to start chatting

### UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Clean and modern interface
- ✅ Auto-scroll to latest messages
- ✅ Loading indicators
- ✅ Error handling with user-friendly messages
- ✅ Toast notifications for actions

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     ChatVerse Architecture                   │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐                    ┌──────────────────┐
│   React Client   │◄───────────────────┤   Vercel CDN     │
│  (chat_verse_    │     HTTPS          └──────────────────┘
│   frontend)      │
└────────┬─────────┘
         │
         │ REST API (Axios)
         │ WebSocket (STOMP)
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│              Spring Boot Backend (Render)                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Controllers Layer                        │  │
│  │  • UserController   • ChatController                  │  │
│  │  • AdminController  • HomeController                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Service Layer                            │  │
│  │  • UserService      • ChatRoomService                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Repository Layer                         │  │
│  │  • UserRepo    • ChatRoomRepo    • MessageRepo       │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Security Layer                           │  │
│  │  • SecurityConfig   • CustomUserDetailsService       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
┌──────────────────┐         ┌──────────────────┐
│   PostgreSQL     │         │     MongoDB      │
│   (User Data,    │         │   (Messages)     │
│   Chat Rooms)    │         │                  │
└──────────────────┘         └──────────────────┘
```

### Communication Flow

1. **Authentication Flow**:
   - User submits credentials → Backend validates → Spring Security generates session → Frontend stores auth
   
2. **Real-Time Messaging Flow**:
   - Client connects to WebSocket endpoint
   - STOMP subscription to `/topic/room/{roomId}`
   - User sends message → `@MessageMapping("/sendMessage/{roomId}")`
   - Message saved to MongoDB
   - Broadcast to all subscribers via `@SendTo`
   - Auto-delivery and read receipt updates

3. **REST API Flow**:
   - Frontend makes HTTP requests via Axios
   - Spring Boot controllers handle requests
   - Service layer processes business logic
   - Repository layer interacts with databases
   - Response sent back to client

---

## 🚀 How to Run

### Prerequisites

- **Java 17+** (for backend)
- **Node.js 18+** (for frontend)
- **Maven 3.6+** (for backend build)
- **PostgreSQL** (or use cloud PostgreSQL)
- **MongoDB** (or use MongoDB Atlas)
- **Git**

---

### 📦 Backend Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ChatVerse/Chat-Verse-Backend
   ```

2. **Configure environment variables**:
   
   Create a `.env` file or set environment variables:
   ```properties
   PORT=8080
   DATABASE_URL=jdbc:postgresql://localhost:5432/chatverse_db
   RENDER_DATABASE_USERNAME=your_db_username
   RENDER_DATABASE_PASSWORD=your_db_password
   MONGODB_URI=mongodb://localhost:27017/chatverse_messages
   ```

3. **Build the project**:
   ```bash
   mvn clean install
   ```

4. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```
   
   Or run the JAR:
   ```bash
   java -jar target/Personal-Chat-Backend-0.0.1-SNAPSHOT.jar
   ```

5. **Backend will be running on**: `http://localhost:8080`

---

### 🎨 Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd ../chat_verse_frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure API endpoint**:
   
   Update the backend URL in [chat_verse_frontend/src/config/AxiosHelper.js](chat_verse_frontend/src/config/AxiosHelper.js) if needed:
   ```javascript
   export const baseURL = "http://localhost:8080";
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Frontend will be running on**: `http://localhost:5173`

---

### 🐳 Docker Setup (Optional)

1. **Build Docker image**:
   ```bash
   cd Chat-Verse-Backend
   docker build -t chatverse-backend .
   ```

2. **Run container**:
   ```bash
   docker run -p 8080:8080 \
     -e DATABASE_URL=your_db_url \
     -e RENDER_DATABASE_USERNAME=your_username \
     -e RENDER_DATABASE_PASSWORD=your_password \
     -e MONGODB_URI=your_mongodb_uri \
     chatverse-backend
   ```

---

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/register` | Register new user | `{ name, phoneNumber, password, about }` |
| POST | `/login` | User login | `{ phoneNumber, password }` |
| GET | `/user` | Get current user | - |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/user/profile/{id}` | Get user profile by ID | ✅ |
| GET | `/user/rooms/{phoneNumber}` | Get all chat rooms for user | ✅ |
| GET | `/user/search?phone={number}` | Search user by phone number | ✅ |
| POST | `/user/password` | Change password | ✅ |

### Chat Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/rooms/create` | Create new chat room | ✅ |
| GET | `/rooms/{roomId}/messages` | Get messages for a room | ✅ |
| POST | `/chat/send` | Send message (REST alternative) | ✅ |
| PUT | `/messages/{id}/status` | Update message status | ✅ |

### WebSocket Endpoints

| Type | Endpoint | Description |
|------|----------|-------------|
| Connect | `/ws` | WebSocket connection endpoint |
| Subscribe | `/topic/room/{roomId}` | Subscribe to room messages |
| Send | `/app/sendMessage/{roomId}` | Send message to room |
| Subscribe | `/user/queue/status` | User status updates |
| Send | `/app/user/status` | Update user status |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/users` | Get all users | ✅ Admin |
| DELETE | `/admin/user/{id}` | Delete user | ✅ Admin |

---

## 🔮 Future Improvements

### Planned Features

- [ ] **Group Chat**: Support for multi-user chat rooms
- [ ] **File Sharing**: Send images, documents, and media files
- [ ] **Voice Messages**: Record and send voice notes
- [ ] **Video Calls**: Integrate WebRTC for video calling
- [ ] **Message Reactions**: Add emoji reactions to messages
- [ ] **Message Editing**: Edit sent messages
- [ ] **Message Deletion**: Delete messages (for everyone/for me)
- [ ] **Message Search**: Search through chat history
- [ ] **Chat Export**: Export chat history
- [ ] **Push Notifications**: Browser and mobile push notifications
- [ ] **Email Verification**: Verify user email addresses
- [ ] **Two-Factor Authentication**: Enhanced security with 2FA
- [ ] **Dark Mode**: Theme switcher for dark/light modes
- [ ] **Message Encryption**: End-to-end encryption for messages
- [ ] **Read Receipts Toggle**: Allow users to disable read receipts
- [ ] **Typing Indicators**: Show when user is typing
- [ ] **Last Seen**: Display user's last active time
- [ ] **Block Users**: Block/unblock functionality
- [ ] **Admin Dashboard**: Analytics and user management panel
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **Desktop App**: Electron-based desktop application

### Technical Improvements

- [ ] **Redis Integration**: For session management and caching
- [ ] **Message Pagination**: Load messages in chunks for better performance
- [ ] **Rate Limiting**: Prevent spam and abuse
- [ ] **Logging**: Comprehensive logging with ELK stack
- [ ] **Monitoring**: Prometheus and Grafana for monitoring
- [ ] **CI/CD Pipeline**: Automated testing and deployment
- [ ] **Load Balancing**: Support for horizontal scaling
- [ ] **Microservices**: Split into smaller, independent services
- [ ] **GraphQL**: Alternative to REST APIs
- [ ] **PWA Support**: Progressive Web App features
- [ ] **Offline Support**: Cache messages for offline access
- [ ] **Internationalization**: Multi-language support

---

## 👨‍💻 Development

### Project Structure

```
ChatVerse/
├── Chat-Verse-Backend/          # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/personalchat/backend/
│   │       ├── config/          # Security, WebSocket, CORS
│   │       ├── controller/      # REST & WebSocket controllers
│   │       ├── dto/             # Data Transfer Objects
│   │       ├── entity/          # JPA & MongoDB entities
│   │       ├── repositories/    # Data access layer
│   │       └── service/         # Business logic
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── chat_verse_frontend/         # React frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── config/              # Axios configuration
│   │   ├── context/             # React Context (Auth)
│   │   ├── pages/               # Page components
│   │   ├── routes/              # Route configuration
│   │   └── services/            # API service layer
│   ├── public/
│   └── package.json
│
└── README.md                    # This file
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📞 Contact

For any queries or suggestions, feel free to reach out:

- **Project Link**: [ChatVerse Repository](https://github.com/yourusername/ChatVerse)
- **Live Demo**: [ChatVerse Live](https://chat-verse-frontend-seven.vercel.app/)

---

## 🙏 Acknowledgments

- Spring Boot and Spring Framework community
- React and Vite teams
- WebSocket and STOMP protocol maintainers
- Open source contributors

---

<div align="center">

**Made with ❤️ by the ChatVerse Team**

⭐ Star this repo if you find it helpful!

</div>
