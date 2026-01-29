import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/gamepage.css";

const GamePage = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all games
  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/games", { method: "GET" });
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error("Failed to fetch games:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load games on mount
  useEffect(() => {
    fetchGames();
  }, []);

  // Delete game
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;

    try {
      await fetch(`http://localhost:5000/api/games/${id}`, { method: "DELETE" });
      setGames((prev) => prev.filter((game) => game._id !== id));
    } catch (err) {
      console.error("Failed to delete game:", err);
    }
  };

  // Search games from backend
  const searchGames = async (value) => {
    setSearch(value);

    // If search is empty, reload all games
    if (!value.trim()) {
      fetchGames();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/games/search?name=${encodeURIComponent(value)}`
      );
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error("Failed to search games:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-page">
      {/* Header */}
      <div className="game-page__header">
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => searchGames(e.target.value)}
          className="game-search"
        />

        <Link to="/add-game" className="btn btn--secondary">
          Add New Game
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <p>Loading games...</p>
      ) : games.length === 0 ? (
        <p>No games found.</p>
      ) : (
        <div className="game-tabs">
          {games.map((game) => (
            <div key={game.id} className="game-tab">
              <div className="game-tab__info">
                <h3>{game.title}</h3>
                <p><strong>Genre:</strong> {game.name}</p>
                <p><strong>Category:</strong> {game.category_name}</p>
                <p><strong>Description:</strong> {game.description}</p>
                <p><strong>Quantity:</strong> {game.quantity}</p>
              </div>

              <div className="game-tab__actions">
                <Link
                  to={`/add-game/${game.id}`}
                  className="btn btn--primary"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(game.id)}
                  className="btn btn--danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GamePage;
