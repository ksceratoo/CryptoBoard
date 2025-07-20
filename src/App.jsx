import { useState, useEffect } from "react";
import HomePage from "./pages/home";
import { Routes, Route } from "react-router";
import AboutPage from "./pages/about";
import Header from "./components/Header";
import NotFoundPage from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-details";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortby, setSortBy] = useState("market-cap_desc");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${API_URL}&order=${sortby}&per_page=${limit}&page=1&sparkline=false`
        );
        if (!response.ok) throw new Error("failed to fetch data");
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, [limit]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              loading={loading}
              error={error}
              filter={filter}
              limit={limit}
              setFilter={setFilter}
              setLimit={setLimit}
              setLoading={setLoading}
              sortby={sortby}
              setSortBy={setSortBy}
            />
          }
        />
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/coin/:id" element={<CoinDetailsPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
};
export default App;
