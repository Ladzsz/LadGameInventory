import React from "react";
import "../assets/styles/form.css";

function GameForm({
    //setting form fields to either edit or new
  gameId = null,
  initialData = {},
  onSuccess,
}) {
  const [name, setName] = React.useState(initialData.name || "");
  const [description, setDescription] = React.useState(
    initialData.description || ""
  );
  const [categoryId, setCategoryId] = React.useState(
    initialData.category_id || ""
  );
  const [quantity, setQuantity] = React.useState(
    initialData.quantity || 1
  );

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    //getting data for the backend
    const payload = {
      name,
      description,
      category_id: Number(categoryId),
      quantity: Number(quantity),
    };

    //fetch request
    try {
      const response = await fetch(
        gameId ? `/api/games/${gameId}` : "/api/games",
        {
          method: gameId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save game");
      }

      if (onSuccess) onSuccess();

      if (!gameId) {
        setName("");
        setDescription("");
        setCategoryId("");
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
      <h2 className="game-form__title">
        {gameId ? "Edit Game" : "Add Game"}
      </h2>

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
        <input
          type="number"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        />
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
