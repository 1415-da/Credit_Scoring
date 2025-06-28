# 🏦 Secure Bank - Credit Assessment Platform

A professional banking application that provides AI-powered credit assessments with a sophisticated dark theme and smooth animations.

## ✨ Features

### 🎨 **Professional Banking Design**
- **Dark Theme**: Elegant black and grey color scheme
- **Bank Branding**: Secure Bank identity with professional styling
- **Trust Indicators**: SSL encryption, FDIC insurance badges
- **Responsive Design**: Works seamlessly on all devices

### 🚀 **Advanced Animations**
- **Page Transitions**: Smooth fade-in and slide animations
- **Interactive Elements**: Hover effects and micro-interactions
- **Staggered Loading**: Sequential animation of form fields
- **Visual Feedback**: Loading states and error animations

### 📊 **Credit Assessment Features**
- **AI-Powered Analysis**: Machine learning credit scoring
- **Risk Categories**: Low Risk, Moderate Risk, High Risk classifications
- **Detailed Reports**: Comprehensive financial profile breakdown
- **Professional Terminology**: Banking industry-standard language

### 🔒 **Security & Trust**
- **256-bit SSL Encryption**: Bank-level security
- **Data Protection**: Secure handling of financial information
- **Professional Disclaimers**: Clear terms and conditions
- **Confidentiality**: Secure data processing

## 🛠️ Technology Stack

- **Frontend**: React.js with modern CSS animations
- **Backend**: Python Flask API
- **Machine Learning**: Random Forest model for credit scoring
- **Styling**: Custom CSS with gradient effects and animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.7 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Credit_Scoring
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ..
   pip install -r requirements.txt
   ```

4. **Start the backend server**
   ```bash
   python app.py
   ```

5. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. **Deploy to Vercel**
   ```bash
   cd frontend
   vercel
   ```

2. **Environment Variables** (Optional)
   - Create a `.env` file in the frontend directory
   - Add: `REACT_APP_API_URL=your-backend-url`
   - For local development: `REACT_APP_API_URL=http://localhost:5000`

3. **Backend Deployment Options**
   - **Heroku**: Deploy the Flask app to Heroku
   - **Railway**: Use Railway for easy Python deployment
   - **Render**: Deploy to Render's free tier
   - **Local Development**: Keep backend running locally

4. **Vercel Configuration**
   - The `vercel.json` file is already configured for React Router
   - Routes are automatically handled for SPA deployment

### Backend Deployment (Heroku Example)

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Add Python buildpack**
   ```bash
   heroku buildpacks:set heroku/python
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

4. **Update frontend API URL**
   - Set environment variable: `REACT_APP_API_URL=https://your-app-name.herokuapp.com`

### Demo Mode
- If no backend is available, the app will show demo data
- Perfect for showcasing the UI/UX without backend deployment
- Demo results are realistic but not actual credit assessments

## 📱 Application Flow

1. **Landing Page**: Professional Secure Bank introduction
2. **Credit Assessment Form**: Comprehensive financial data input
3. **Results Dashboard**: AI-generated credit assessment report
4. **Detailed Analysis**: Complete financial profile breakdown

## 🎯 Key Features

### **Professional Banking Experience**
- Bank-grade security messaging
- Trust badges and certifications
- Professional terminology and branding
- Regulatory compliance language

### **Advanced UI/UX**
- Smooth page transitions
- Interactive form elements
- Real-time validation
- Professional color scheme
- Responsive design

### **Credit Assessment**
- 27 financial metrics analysis
- AI-powered risk assessment
- Visual credit score gauge
- Detailed breakdown reports

## 🔧 Customization

### **Styling**
- Modify `frontend/src/App.css` for theme changes
- Update `frontend/src/index.css` for global styles
- Customize animations in CSS keyframes

### **Branding**
- Update bank logo and colors in `App.js`
- Modify trust badges and messaging
- Customize professional terminology

### **Features**
- Add new financial metrics in `App.js`
- Modify risk assessment logic
- Update API endpoints as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions about Secure Bank's credit assessment platform, please contact our development team.

---

**Secure Bank** - Your Trusted Financial Partner 🏦