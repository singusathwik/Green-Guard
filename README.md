# Green_guard

A MERN stack web application dedicated to environmental awareness and action, inspired by the United Nations Sustainable Development Goal 15: Life on Land. Green_guard empowers communities to participate in, track, and share local conservation initiatives.

<br>

## 🚀 Features
MERN Stack: Built with MongoDB, Express.js, React.js, and Node.js for robust, scalable performance.

SDG-15 Focus: Supports activities aligned with "Life on Land" (UN SDG 15).

User Participation: Share, track, and join conservation campaigns and events.

Authentication: Secure user registration and login.

Responsive Design: Works on desktop and mobile devices.

<br>

## 📂 Project Structure

     Green_guard/
      │
      ├── backend/           # Node.js + Express API and MongoDB models
      │   ├── models/        # Mongoose schemas
      │   ├── routes/        # API endpoints
      │   ├── controllers/   # Business logic
      │   └── ...            # Other backend files
      │
      ├── frontend/          # React.js client application
      │   ├── src/
      │   └── ...
      │
      ├── package.json       # Project metadata and scripts
      ├── README.md          # Project documentation
      └── ...


<br>

## 🛠 Prerequisites
Node.js (v14+ recommended)

MongoDB
Install MongoDB Community Edition
Ensure it runs locally at mongodb://localhost:27017/

Git
Download Git

npm or yarn

<br>

## ⚡️ Quickstart
1. Clone the Repository

    ```bash 
    git clone https://github.com/Srikiran05/Green_guard.git
    cd Green_guard
    ```

2. Install Backend Dependencies
    ```bash 
    cd backend
    npm install
    ```
    
3. Install Frontend Dependencies
    ```bash 
    cd ../frontend
    npm install
    ```

4. Set up Environment Variables
   * Create a `.env` file in /backend and add your MongoDB URI and any other required variables.

5. Start the Backend Server
    ```bash 
    cd ../backend
    npm start
    ```

6. Start the Frontend
    ```bash 
    cd ../frontend
    npm start
    ```

<br>

## 💬 Usage

* Register or log in to your account.

* Browse, join, or create conservation events and campaigns.

* Track your participation and impact on local biodiversity.
   
<br>

## 🧩 Troubleshooting
* Port Conflicts:
    - Change the default ports in the backend or frontend if needed.
  
* MongoDB Errors:
    - Verify MongoDB is running and the connection URL is correct.

* Dependency Issues:
    - Delete `node_modules` and `package-lock.json`, then reinstall dependencies.

<br>

## 🙏 Acknowledgments
* United Nations Sustainable Development Goals

* Inspiration from open-source MERN projects
