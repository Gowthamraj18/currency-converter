import CurrencyConverter from './components/CurrencyConverter'
import './index.css'

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Light Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-white/40" />
      </div>
      
      {/* Floating Orbs */}
      <div className="floating absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="floating absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-purple-400/15 blur-3xl" style={{ animationDelay: '3s' }} />
      <div className="floating absolute left-1/2 top-1/3 h-96 w-96 rounded-full bg-pink-400/10 blur-3xl" style={{ animationDelay: '1.5s' }} />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <CurrencyConverter />
          <p className="mt-6 text-center text-xs text-gray-500">
            Powered by ExchangeRate API · Rates update in real-time
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
