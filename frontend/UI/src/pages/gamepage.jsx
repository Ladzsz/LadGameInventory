import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/gamepage.css";
//importing routes saved as ENV this will allow for global variable manipulation
//as opposed to being hard coded in each file that uses it.
const GamesRoute = import.meta.env.VITE_GAMES_ROUTE;
const SearchGameRoute = import.meta.env.VITE_GAMESEARCH_ROUTE;

const GamePage = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch all games
  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${GamesRoute}`, {
        method: "GET",
      });
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error("Failed to fetch games:", err);
    } finally {
      setLoading(false);
    }
  };

  // use effect to fetch games after dom loads
  useEffect(() => {
    fetchGames();
  }, []);

  // Delete game
  const handleDelete = async (id) => {
    if (!token) {
      alert("You must be logged in to delete a game.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this game?")) return;

    try {
      await fetch(`${GamesRoute}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGames((prev) => prev.filter((game) => game.id !== id));
      alert("Game deleted successfully.");
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
        `${SearchGameRoute}?name=${encodeURIComponent(value)}`,
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
                <p>
                  <strong>Genre:</strong> {game.name}
                </p>
                <p>
                  <strong>Category:</strong> {game.category_name}
                </p>
                <p>
                  <strong>Description:</strong> {game.description}
                </p>
                <p>
                  <strong>Quantity:</strong> {game.quantity}
                </p>
              </div>

              <div className="game-tab__actions">
                <Link to={`/add-game/${game.id}`} className="btn btn--primary">
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
