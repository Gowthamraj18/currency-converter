# Currency Converter - Full Stack Application

A modern, dynamic currency converter web application with FastAPI backend and React frontend featuring real-time exchange rates, beautiful glassmorphism UI, and smooth animations.

## Features

### Backend (FastAPI)
- **Real-time Exchange Rates**: Using ExchangeRate-API with your provided API key
- **RESTful API**: Clean `/convert` endpoint with proper error handling
- **CORS Enabled**: Easy frontend integration
- **Health Check**: `/health` endpoint for monitoring
- **Currency Support**: Get list of supported currencies via `/currencies` endpoint

### Frontend (React + TypeScript)
- **Modern UI**: Glassmorphism design with gradient backgrounds
- **20+ Currencies**: Major global currencies with flags and symbols
- **Real-time Conversion**: Auto-convert as you type (with debouncing)
- **Smooth Animations**: Framer Motion powered transitions
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works perfectly on desktop and mobile
- **Micro-interactions**: Hover effects, button animations, loading states

## Project Structure

```
currency-converter/
├── backend/
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── CurrencyConverter.tsx
│   │   ├── lib/
│   │   │   ├── currencies.ts
│   │   │   └── exchangeApi.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
└── README.md
```

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Run the frontend:**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Convert Currency
```http
POST /convert
Content-Type: application/json

{
  "from_currency": "USD",
  "to_currency": "INR", 
  "amount": 1000
}
```

**Response:**
```json
{
  "from_currency": "USD",
  "to_currency": "INR",
  "amount": 1000.0,
  "exchange_rate": 83.1234,
  "converted_amount": 83123.4,
  "timestamp": "1708425600",
  "success": true
}
```

### Get Supported Currencies
```http
GET /currencies
```

### Health Check
```http
GET /health
```

## Environment Variables

### Backend
The API key is already configured in `main.py`:
```python
API_KEY = "a1e061319802080f39890672"
```

### Frontend
Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:8000
```

## Available Currencies

The application supports 20+ major currencies including:
- 🇺🇸 USD - US Dollar
- 🇪🇺 EUR - Euro  
- 🇬🇧 GBP - British Pound
- 🇯🇵 JPY - Japanese Yen
- 🇮🇳 INR - Indian Rupee
- 🇦🇺 AUD - Australian Dollar
- 🇨🇦 CAD - Canadian Dollar
- And many more...

## Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **httpx**: Async HTTP client for API calls
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: ASGI server

### Frontend
- **React 18**: Modern UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Beautiful icons
- **Axios**: HTTP client

## Features Showcase

### 🎨 Design Features
- Glassmorphism UI with backdrop blur effects
- Gradient backgrounds with floating orbs
- Smooth transitions and micro-interactions
- Dark/Light mode toggle
- Professional fintech-style interface

### ⚡ Performance Features
- Debounced auto-conversion (500ms delay)
- Async API calls with proper error handling
- Optimized animations with Framer Motion
- Responsive design for all screen sizes

### 🔧 Technical Features
- TypeScript for type safety
- RESTful API design
- Proper error boundaries and loading states
- Environment variable configuration
- Production-ready code structure

## Deployment

### Backend (Production)
```bash
# Install production dependencies
pip install -r requirements.txt

# Run with production server
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend (Production)
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The frontend build can be deployed to Vercel, Netlify, or any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions, please check:
1. The setup instructions above
2. API key configuration
3. Environment variables
4. Network connectivity to exchange rate API

---

**Built with ❤️ using modern web technologies**
