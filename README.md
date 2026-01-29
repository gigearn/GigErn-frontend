⚠️  **PROJECT DEADLINE: JUNE 2026**  ⚠️


🚨 **CRITICAL TIMELINE - IMMEDIATE PRIORITY** 🚨

This is a time-critical project with strict delivery requirements.
All development efforts must align with the June 2026 launch deadline.
No extensions will be granted. Plan accordingly.

══════════════════════════════════

# GigErn - Workforce Infrastructure Platform for India's Gig Economy

A production-ready workforce platform for India's gig economy, starting with retail store staffing and hyperlocal delivery. This platform focuses on labour reliability, progression, and workforce quality rather than competing with customer marketplaces.

## 🎯 Vision

Become a neutral labour infrastructure layer where workers retain identity, reliability, and progression across multiple demand sources. Businesses and platforms tap into a reliable, upgradeable workforce without rebuilding labour systems from scratch.

## 🏗️ Core Innovation: Progressive Workforce System

### Layer 1 – Newcomers (Gig Workers)
- All workers start here
- Shift-based, flexible work
- No guarantees or benefits
- Platform measures reliability through confirmations, attendance, and delivery success

### Layer 2 – Associated Workers (Hybrid)
- Earned through consistent performance
- Priority access to work and recurring shifts
- Higher pay and greater stability
- Eligible for future benefits (insurance, faster grievance handling)
- **This layer delivers most platform value**

### Layer 3 – Employees (Future Phase)
- Formal employment (store or platform)
- Salary, paid leave, insurance
- Not part of the MVP

Workers progress upward by meeting transparent, rule-based criteria. Reliability compounds over time instead of resetting daily like typical gig platforms.

## 💼 What the Platform Offers

**For Stores:**
- Book pre-confirmed staff by shift
- Hire delivery partners per order
- Double confirmation and OTP-based attendance/delivery proof
- Reliability scores are visible and explainable
- Platform handles payments; stores pay wages + platform fee

**For Workers:**
- Accept shifts and deliveries via web app
- Progressive career path with clear advancement criteria
- Reliability-based benefits and priority access
- Transparent scoring system

## 🚫 What the Platform Is NOT

- Not a job portal
- Not an instant delivery app
- Not a customer marketplace
- Not a chat-based or social app
- Not promising employment on day one

## 💰 Business Model

**Stores pay:**
- Worker wages (pass-through)
- Platform fee (for reliability and operations)

**Platform monetizes:**
- Per-shift staffing fees
- Delivery fees
- Higher fees for more reliable (Layer 2) workers

**Workers never pay to access work**

## 🎯 MVP Scope

- Supports Layer 1 and Layer 2
- Shift-based retail staffing
- Hyperlocal delivery with DigiPIN + OTP
- Reliability scoring and promotion tracking
- Excludes payroll, PF/ESIC, insurance claims, AI matching

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** TailwindCSS 4.1.18
- **Routing:** React Router
- **Language:** JavaScript

### Backend
- **API-based architecture** (separate repository)
- **Database:** MongoDB

## 📁 Project Structure

```
GigErn/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── services/       # API service layers
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── backend/                 # Backend API (separate repo)
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Frontend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd GigErn/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Development

### Code Style
- Uses ESLint for code quality
- Follows React best practices
- TailwindCSS for styling

### Environment Variables
Create a `.env` file in the frontend root:
```
VITE_API_URL=http://localhost:3001/api
VITE_ENVIRONMENT=development
```

## 📱 Key Features

### Worker Features
- Shift booking and management
- Delivery order acceptance
- Reliability score tracking
- Progress monitoring between layers
- OTP-based attendance and delivery confirmation

### Store Features
- Staff booking by shift
- Delivery partner assignment
- Worker reliability viewing
- Payment processing
- Shift management dashboard

### Platform Features
- Double confirmation system
- DigiPIN + OTP verification
- Transparent reliability scoring
- Rule-based progression system
- Payment processing and fee management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 📞 Contact

For any questions or support, please contact the development team.

---

**Note:** This is workforce infrastructure, not a gig app. Always think of this project as building the foundational labour layer for India's gig economy.
