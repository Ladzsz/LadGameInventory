import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/form.css";
import { useNavigate } from "react-router-dom";

function GameForm({ onSuccess }) {
  // grab gameId from URL
  const { id: gameId } = useParams();
  const navigate = useNavigate();

  // setting states (switched to normal state to make more readable)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch categories
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  // use effect to fetch game data after mount
  useEffect(() => {
  const fetchGame = async () => {
    try {
      setLoading(true);

      const url = gameId
        ? `http://localhost:5000/api/games/${gameId}`
        : `http://localhost:5000/api/games`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch game(s)");

      const data = await res.json();

      if (gameId) {
        // populate form incase of edit
        setName(data.name || "");
        setDescription(data.description || "");
        setCategory(data.category_id || "");
        setQuantity(data.quantity || 1);
      }

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchGame();
}, [gameId]);


  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // data to send to backend
    const payload = {
      name,
      description,
      category_id: Number(category),
      quantity: Number(quantity),
    };

    // try block for inital API call
    try {
      const url = gameId
        ? `http://localhost:5000/api/games/${gameId}`
        : "http://localhost:5000/api/games";

      const method = gameId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to save game");

      if (onSuccess) onSuccess(); 

      // reset form only if adding
      if (!gameId) {
        setName("");
        setDescription("");
        setCategory("");
        setQuantity(1);
      }

      // Redirect after success
      navigate("/games");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // render form
  return (
    <form className="game-form" onSubmit={handleSubmit}>
      <h2 className="game-form__title">{gameId ? "Edit Game" : "Add Game"}</h2>

      {error && <p className="game-form__error">{error}</p>}

      <div className="game-form__field">
        <label>Game Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="game-form__field">
        <label>Description</label>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="game-form__field">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">-- Select a Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="game-form__field">
        <label>Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="game-form__actions">
        <button className="btn btn--primary" disabled={loading}>
          {loading ? "Saving..." : "Save Game"}
        </button>
      </div>
    </form>
  );
}

export default GameForm;
