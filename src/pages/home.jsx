import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortInput from "../components/SortInput";
import Spinner from "../components/Spinner";

const HomePage = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortby,
  setSortBy,
  loading,
  error,
}) => {
  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortby) {
        case "market-cap_desc":
          return b.market_cap - a.market_cap;
        case "market-cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
      }
    });

  return (
    <>
      <h1>🚀 Crypto Dash</h1>

      {loading && <Spinner color="white" />}
      {error && <div className="error">{error}</div>}
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} setLimit={setLimit} />
        <SortInput sortby={sortby} onSortChange={setSortBy} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
          ) : (
            <p>No matching coins</p>
          )}
        </main>
      )}
    </>
  );
};

export default HomePage;
