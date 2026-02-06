# GigErn Frontend

Frontend application for GigErn - Workforce Infrastructure Platform for India's Gig Economy.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gigearn/GigErn-frontend.git
cd GigErn-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
Create a `.env` file in the root:
```
VITE_API_URL=http://localhost:3001/api
VITE_ENVIRONMENT=development
```

4. Start development server:
```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠️ Tech Stack

- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** TailwindCSS 4.1.18
- **Routing:** React Router
- **Language:** JavaScript

## 📁 Project Structure

```
GigErn-frontend/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   └── services/       # API service layers
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🔧 Configuration

### Environment Variables
- `VITE_API_URL` - Backend API endpoint
- `VITE_ENVIRONMENT` - Environment (development/production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.
