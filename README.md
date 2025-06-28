# Credit Scoring Web App

A full-stack web application for predicting credit scores using a trained machine learning model (Random Forest) with a Flask backend and a React.js frontend. The app features a professional, responsive UI and a dynamic credit score gauge meter.

---

## Features
- **Flask backend** serving a trained credit scoring model (`rf_model.pkl`)
- **React frontend** with a clean, modern UI
- **Credit score gauge meter** with colored segments and needle
- **Form input persistence** (remembers last input)
- **Results dashboard** and detailed score breakdown

---

## Prerequisites
- **Python 3.8+** (for backend)
- **Node.js 16+ & npm** (for frontend)

---

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Credit_Scoring
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Install Node.js dependencies (including dev tools)**
   ```bash
   npm install
   ```
   This will install both backend and frontend dependencies, including `concurrently`.

---

## Running the App

To start both the backend (Flask) and frontend (React) together, run:

```bash
npm run dev
```

- The **backend** will run on [http://localhost:5000](http://localhost:5000)
- The **frontend** will run on [http://localhost:3000](http://localhost:3000)

> **Note:** You do NOT need to run `python app.py` or `npm start` separately.

To stop the app, press `Ctrl + C` in the terminal.

---

## Project Structure

```
Credit_Scoring/
├── app.py                # Flask backend
├── rf_model.pkl          # Trained Random Forest model
├── requirements.txt      # Python dependencies
├── package.json          # Node.js scripts and dependencies
├── frontend/             # React frontend app
│   ├── src/
│   │   ├── App.js        # Main React app (UI, gauge, forms)
│   │   └── ...
│   └── ...
└── README.md             # This file
```

---

## Usage
- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Enter your credit-related details in the form.
- View your predicted credit score and breakdown on the results dashboard.

---

## Customization
- To update the model, replace `rf_model.pkl` with a new trained model (ensure feature order matches).
- To change the UI, edit files in `frontend/src/` (e.g., `App.js`, `App.css`).

---

## License
MIT