import { useEffect, useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { data: rates, loading, error } = useCurrencyInfo(from);
  const options = Object.keys(rates || {});

  const convert = () => {
    if (!rates || !rates[to]) {
      setConvertedAmount(0); // fallback to 0 if missing
      return;
    }
    setConvertedAmount(amount * rates[to]);
  };

  useEffect(() => {
    if (!loading && rates && rates[to]) {
      convert();
    }
  }, [amount, from, to, rates, loading]);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount || 0);
  };

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      }}
    >
      <div className="w-full max-w-md p-6 rounded-2xl backdrop-blur-xl bg-white/30 shadow-2xl space-y-4">
        <h1 className="text-2xl font-bold text-center text-white drop-shadow-lg">
          💱 Currency Converter
        </h1>

        {loading && <p className="text-sm text-center text-gray-800">Fetching rates...</p>}
        {error && <p className="text-sm text-center text-red-900">{error}</p>}

        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            selectCurrency={from}
            onAmountChange={setAmount}
            onCurrencyChange={setFrom}
          />

          {/* Swap button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={swap}
              className="w-10 h-10 flex justify-center items-center rounded-full
                bg-blue-600 text-white shadow-md hover:bg-blue-700 
                transition-all active:scale-90 hover:rotate-180 duration-300"
            >
              ↔
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            selectCurrency={to}
            onCurrencyChange={setTo}
            amountDisable
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white 
              font-semibold rounded-xl shadow-md transition-all active:scale-95"
          >
            Convert
          </button>
        </form>

        <p className="text-center text-white font-semibold tracking-wide drop-shadow-lg">
          {amount} {from.toUpperCase()} = {(convertedAmount ?? 0).toFixed(2)} {to.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

export default App;
