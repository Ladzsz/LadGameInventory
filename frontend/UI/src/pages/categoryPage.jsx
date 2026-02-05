import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/gamepage.css";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/categories", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category
  const handleDelete = async (id) => {
    if (!token) {
      alert("You must be logged in to delete a category.");
      return;
    }

    if (!user?.is_admin) {
      alert("You must be an admin to delete a category.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories((prev) => prev.filter((category) => category.id !== id));
      alert("Category deleted successfully.");
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  // Search categories from backend
  const searchCategories = async (value) => {
    setSearch(value);

    // If search is empty, reload all categories
    if (!value.trim()) {
      fetchCategories();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/categories/search?name=${encodeURIComponent(value)}`,
      );
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to search categories:", err);
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
          placeholder="Search categories..."
          value={search}
          onChange={(e) => searchCategories(e.target.value)}
          className="game-search"
        />

        <Link to="/add-category" className="btn btn--secondary">
          Add New Category
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <p>Loading categories...</p>
      ) : categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="game-tabs">
          {categories.map((category) => (
            <div key={category.id} className="game-tab">
              <div className="game-tab__info">
                <h3>{category.name}</h3>
                <p>
                  <strong>Description:</strong> {category.description}
                </p>
              </div>

              <div className="game-tab__actions">
                <Link
                  to={`/add-category/${category.id}`}
                  className="btn btn--primary"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(category.id)}
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

export default CategoryPage;
