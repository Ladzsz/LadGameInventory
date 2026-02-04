import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// NOTE FROM Ladzsz will use the same styles as game form for consistency

function CategoryForm({ onSuccess }) {
  // grab categoryId from URL
  const { id: categoryId } = useParams();
  const navigate = useNavigate();

  // setting states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

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

        const url = categoryId
          ? `http://localhost:5000/api/categories/${categoryId}`
          : `http://localhost:5000/api/categories`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch category(s)");

        const data = await res.json();

        if (categoryId) {
          // populate form incase of edit
          setName(data.name || "");
          setDescription(data.description || "");
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [categoryId]);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // data to send to backend
    const payload = {
      name,
      description,
    };

    // try block for inital API call
    try {
      const url = categoryId
        ? `http://localhost:5000/api/categories/${categoryId}`
        : "http://localhost:5000/api/categories";

      const method = categoryId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to save category");

      if (onSuccess) onSuccess();

      // reset form only if adding
      if (!categoryId) {
        setName("");
        setDescription("");
      }

      // Redirect after success
      navigate("/categories");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // render form
  return (
    <form className="game-form" onSubmit={handleSubmit}>
      <h2 className="game-form__title">
        {categoryId ? "Edit Category" : "Add Category"}
      </h2>

      {error && <p className="game-form__error">{error}</p>}

      <div className="game-form__field">
        <label>Category Name</label>
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

      <div className="game-form__actions">
        <button className="btn btn--primary" disabled={loading}>
          {loading ? "Saving..." : "Save Category"}
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
