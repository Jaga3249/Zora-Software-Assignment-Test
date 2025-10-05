

---

````md
# Zora Software Assignment Test

A frontend assignment built with React, TypeScript, Vite, and Material UI, designed for the Zora Software take-home test.  
It uses JSON Server as a mock backend API, listening on port 3000.

---

## 🧰 Tech Stack

- React + TypeScript  
- Vite for bundling and dev server  
- Material UI (MUI) for UI components & styling  
- ESLint for linting & code quality  
- JSON Server for mock API  

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18 recommended)  
- npm or yarn  

### Installation

```bash
git clone https://github.com/Jaga3249/Zora-Software-Assignment-Test.git
cd Zora-Software-Assignment-Test
npm install
````

---

## 🖥️ Running the App

### 1️⃣ Start Mock API (JSON Server)

Run the mock backend using `json-server`:

```bash
npx json-server --watch api.json --port 3000
```

This will start the API at:

* `http://localhost:3000/todos`
* `http://localhost:3000/users`
  *(depending on your `api.json` content)*

#### Optional: Add a script in `package.json`

```json
"scripts": {
  "server": "json-server --watch api.json --port 3000",
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint ."
}
```

Then you can simply run:

```bash
npm run server
```

---

### 2️⃣ Start Frontend (Vite + Material UI)

In another terminal:

```bash
npm run dev
```

* Frontend: `http://localhost:5173`
* API: `http://localhost:3000`

You can now use **Material UI components** throughout the app.

---

## 📦 Scripts

| Script    | Description                             |
| --------- | --------------------------------------- |
| `dev`     | Start frontend dev server with HMR      |
| `server`  | Run JSON Server mock API (on port 3000) |
| `build`   | Build frontend for production           |
| `preview` | Preview production build locally        |
| `lint`    | Run ESLint checks                       |

---

## 📁 Project Structure

```
.
├── public/                # Static assets
├── src/                   # App source
│   ├── components/        # Reusable UI components (Material UI)
│   ├── pages/             # Page-level views
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities, API clients
│   └── index.tsx          # Entry point
├── types/                 # Shared TypeScript types
├── api.json               # Mock API data for JSON Server
├── index.html             # Root HTML
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── eslint.config.js
```

---

## 🎯 Features

* ⚡ Fast dev environment with **Vite**
* ✅ Strong typing with **TypeScript**
* 🛠️ Mock backend with **JSON Server** (port 3000)
* 🎨 UI built with **Material UI** components
* 🧹 Pre-configured **ESLint** rules
* 📂 Organized and scalable project structure

---

## ⚡ Optional: Run Frontend + Backend Together

Install **concurrently** to run both servers with a single command:

```bash
npm install --save-dev concurrently
```

Add to `package.json`:

```json
"scripts": {
  "start": "concurrently \"npm run server\" \"npm run dev\""
}
```

Now run everything with:

```bash
npm start
```

---

