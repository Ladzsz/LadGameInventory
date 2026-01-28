import React from "react";
import "../assets/styles/form.css";
import { useEffect } from "react";

function GameForm({
  //setting the props
  gameId = null,
  initialData = {},
  onSuccess,
}) {

  //setting states
  const [name, setName] = React.useState(initialData.name || "");
  const [description, setDescription] = React.useState(
    initialData.description || "",
  );

  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState(initialData.category_id || "");

  const [quantity, setQuantity] = React.useState(initialData.quantity || 1);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Fetch categories from backend
  useEffect(() => {
    
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  //function to handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    //getting data for the backend
    const payload = {
      name,
      description,
      category_id: Number(category),
      quantity: Number(quantity),
    };

    //fetch request to create or update game
    try {
      const response = await fetch(
        gameId
          ? `http://localhost:5000/api/games/${gameId}`
          : "http://localhost:5000/api/games",
        {
          method: gameId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to save game");
      }

      if (onSuccess) onSuccess();

      if (!gameId) {
        setName("");
        setDescription("");
        setQuantity(1);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //creating form
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
        <label>Category ID</label>
        <select
          value={category}
          onChange={(e) => setCategory(Number(e.target.value))}
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
          min="0"
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
