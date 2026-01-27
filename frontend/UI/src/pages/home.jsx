import React from "react";
import "../assets/styles/home.css";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <main className="homepage">
      <section className="homepage__hero">
        <h1 className="homepage__title">Game Inventory Manager</h1>
        <p className="homepage__subtitle">
          Organize, track, and manage your game collection — your way.
        </p>
      </section>

      <section className="homepage__content">
        <h2 className="homepage__heading">What is this site?</h2>
        <p className="homepage__text">
          Game Inventory Manager is a simple tool that lets you keep track of
          your video game collection by category. Whether you organize by
          genre, platform, or custom tags, this site keeps everything easy
          to manage.
        </p>

        <h2 className="homepage__heading">What can you do?</h2>
        <ul className="homepage__list">
          <li>Create games and assign them to categories</li>
          <li>View your entire game library</li>
          <li>Edit game details at any time</li>
          <li>Delete games you no longer want</li>
        </ul>

        <h2 className="homepage__heading">How it works</h2>
        <p className="homepage__text">
          Start by creating categories like <strong>RPG</strong>,{" "}
          <strong>FPS</strong>, or <strong>Indie</strong>. Add games to each
          category and update your inventory whenever you want.
        </p>
      </section>

      <section className="homepage__actions">
        <Link to="/games" className="btn btn--primary">
            View Games
        </Link>

        {/* Navigate to add-game route */}
        <Link to="/add-game" className="btn btn--secondary">
            Add New Game
        </Link>
      </section>
    </main>
  );
};

export default HomePage;
