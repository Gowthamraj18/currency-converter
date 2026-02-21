import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownUp, Loader2, TrendingUp, RefreshCw } from "lucide-react";
import { currencies, getCurrency } from "@/lib/currencies";
import { convertCurrency, ConversionResult } from "@/lib/exchangeApi";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(async () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await convertCurrency(fromCurrency, toCurrency, numAmount);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [amount, fromCurrency, toCurrency]);

  // Clear result when inputs change
  const handleAmountChange = (value: string) => {
    setAmount(value);
    setResult(null);
  };

  const handleFromCurrencyChange = (value: string) => {
    setFromCurrency(value);
    setResult(null);
  };

  const handleToCurrencyChange = (value: string) => {
    setToCurrency(value);
    setResult(null);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromData = getCurrency(fromCurrency);
  const toData = getCurrency(toCurrency);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-card w-full max-w-lg p-8 md:p-10"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: "var(--gradient-primary)" }}
        >
          <TrendingUp className="h-7 w-7 text-primary-foreground" />
        </motion.div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Currency Converter
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Real-time exchange rates
        </p>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-600">
          Amount
        </label>
        <div className="currency-input-wrapper">
          <span className="currency-symbol">
            {fromData?.symbol}
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="Enter amount"
            className="currency-input text-xl"
            min="0"
          />
        </div>
      </div>

      {/* Currency Selectors */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1">
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-600">
            From
          </label>
          <select
            value={fromCurrency}
            onChange={(e) => handleFromCurrencyChange(e.target.value)}
            className="currency-select"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSwap}
          className="swap-button mt-6 h-11 w-11 shrink-0"
          title="Swap currencies"
        >
          <ArrowDownUp className="h-5 w-5" />
        </motion.button>

        <div className="flex-1">
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-600">
            To
          </label>
          <select
            value={toCurrency}
            onChange={(e) => handleToCurrencyChange(e.target.value)}
            className="currency-select"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Convert Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleConvert}
        disabled={loading}
        className="glow-button flex w-full items-center justify-center gap-2 px-6 py-3.5 text-base"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <RefreshCw className="h-5 w-5" />
        )}
        {loading ? "Converting..." : "Convert"}
      </motion.button>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 rounded-xl border border-red-300 bg-red-50 p-4 text-center text-sm text-red-600"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence mode="wait">
        {result && !loading && (
          <motion.div
            key={`${result.from}-${result.to}-${result.amount}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="result-card mt-6"
          >
            <div className="mb-3 flex items-center text-sm text-gray-600">
              <span>
                {fromData?.flag} {result.from} → {toData?.flag} {result.to}
              </span>
            </div>

            <div className="text-3xl font-bold tracking-tight">
              <span className="text-gray-900 mr-1 font-semibold">{toData?.symbol}</span>
              <span className="gradient-text">
                {result.result.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-600">
              <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
              <span>
                1 {result.from} = {result.rate.toFixed(4)} {result.to}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CurrencyConverter;
