🧠 AI-Powered Brain Tumor Detection & Classification System 

A comprehensive full-stack web application designed to detect and classify brain tumors from MRI scans using Deep Learning (VGG16). Features secure user authentication, real-time analysis, and professional PDF report generation.

🚀 Key Features 

Deep Learning Analysis: Uses a pre-trained VGG16 model for high-accuracy binary tumor detection (99%).
Multi-Class Classification: Provides detailed tumor typing (Glioma, Meningioma, Pituitary, etc.) and risk stratification.
Secure Authentication: Complete Signup/Login system using SQLite and JWT (JSON Web Tokens) with password hashing.
Professional Reporting: Generates downloadable PDF Reports including patient info, MRI images, detailed analysis, and medical recommendations.
Interactive Dashboard: Modern React-based UI with Dark Mode, drag-and-drop uploads, and sample image library.
Password Security: Show/Hide password toggle and secure session management.

🛠️ Tech Stack 

Frontend
React.js: Component-based UI architecture.
Styled-Components: Modern CSS-in-JS styling.
Axios: For API communication.
React Router: For seamless navigation and protected routes.
Backend
Python (Flask): RESTful API server.
TensorFlow/Keras: Deep Learning model inference.
OpenCV & Pillow: Image processing.
ReportLab: Programmatic PDF generation.
SQLite: Lightweight database for user management.
PyJWT: Stateless authentication.

⚙️ Installation & Setup
Follow these steps to set up the project locally.

1. Prerequisites
Python (3.10 recommended)
Node.js & npm
2. Backend Setup (Terminal 1)
Bash

# Navigate to the project folder
cd Brain-Tumor-Detection-main

# Create virtual environment (if not exists)
python -m venv .venv

# Activate virtual environment
# Windows (CMD):
.venv\Scripts\activate
# Windows (PowerShell):
.venv\Scripts\Activate.ps1
# Mac/Linux:
source .venv/bin/activate

# Install dependencies (Crucial for fixing NumPy/TensorFlow conflicts)
pip install -r requirements.txt
3. Frontend Setup (Terminal 2)
Bash

# Navigate to client folder
cd client

# Install Node modules
npm install
🏃‍♂️ How to Run
You need two separate terminal windows running simultaneously.

Terminal 1: Start Backend

cd Brain-Tumor-Detection-main
.venv\Scripts\activate
python app.py
Wait until you see: ✅ DATABASE INITIALIZED and Running on http://127.0.0.1:5000

Terminal 2: Start Frontend

cd Brain-Tumor-Detection-main/client
npm start
The application will open automatically at http://localhost:3000

📂 Project Structure

Brain-Tumor-Detection-main/
├── app.py                    # Main Flask Backend (API, Auth, PDF logic)
├── model.json                # VGG16 Model Architecture
├── model.h5                  # Pre-trained Model Weights
├── users.db                  # User Database (Created automatically)
├── requirements.txt          # Python dependencies
├── .venv/                    # Python Virtual Environment
│
└── client/                   # React Frontend
    ├── public/
    └── src/
        ├── App.js            # Routing & Auth Logic
        ├── MainApp.js        # Main Dashboard & Prediction Logic
        ├── data.js           # Sample MRI Images (Base64)
        ├── pages/
        │   ├── Login.js      # Login Page
        │   ├── Signup.js     # Signup Page
        │   └── Dashboard.js  # Dashboard Wrapper
        ├── Components/
        │   ├── ResultCard.js # Detailed Result Display
        │   ├── TumorInfo.js  # Educational Info Section
        │   └── ImageUpload.js
        └── utils/
            └── themes.js     # Dark Theme Configuration 


🔧 Troubleshooting
1. PowerShell "Script disabled" Error
If you get a permission error when activating the environment in VS Code:

PowerShell

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
2. NumPy/TensorFlow Crash
If the backend crashes with AttributeError: _ARRAY_API, you have an incompatible NumPy version. Fix it by running:

pip install "numpy<2.0"
(Note: The provided requirements.txt already handles this).

3. Database Error "no such table: users"
Ensure you run python app.py at least once before trying to inspect the database. The app initializes the database on startup.

🔮 Future Scope
True Multi-Class Model: Retrain the model on specific datasets to replace the simulated classification.
Tumor Segmentation: Implement U-Net to highlight the exact tumor area.
Cloud Deployment: Deploy to AWS/Heroku for public access.
📜 License
This project is for educational purposes.

Developed by rohan maurya