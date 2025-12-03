import { useEffect, useState } from "react";

const cache = {};

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchRates = async () => {
      try {
        setLoading(true);
        setError(null);

        // cache response to avoid repeated API calls
        if (cache[currency]) {
          setData(cache[currency]);
          setLoading(false);
          return;
        }

        const res = await fetch(
          `https://api.exchangerate.host/latest?base=${currency}`
        );
        const json = await res.json();

        cache[currency] = json.rates;
        if (isMounted) setData(json.rates);
      } catch (err) {
        setError("Unable to fetch exchange rates");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    return () => (isMounted = false);
  }, [currency]);

  return { data, loading, error };
}

export default useCurrencyInfo;
