# GitHub Setup Guide

## 1. Create a repository on GitHub

- Go to https://github.com/new
- Name it `payroll-system` (or whatever you prefer)
- Keep it **Public** or **Private** — your choice
- Do **not** initialize with README, .gitignore, or license
- Click **Create repository**

## 2. Push the project

Open a terminal in the project root (`NEW_PROJECT`) and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/payroll-system.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## 3. What to do if you get errors

**"remote origin already exists"** — run `git remote set-url origin https://github.com/YOUR_USERNAME/payroll-system.git`

**node_modules being pushed** — a `.gitignore` already exists in `frontend_project/` but add one to the root if needed. Create `.gitignore` in the root folder:

```
node_modules/
.env
dist/
```

## 4. Running the project after cloning

```bash
# Backend
cd backend_project
npm install
# Create a .env file with MONGO_URI=mongodb_connection_string
npm start

# Frontend (separate terminal)
cd frontend_project
npm install
npm run dev
```
