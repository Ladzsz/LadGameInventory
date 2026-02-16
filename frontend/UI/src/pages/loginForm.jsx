import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/styles/loginform.css";

function AuthForm() {
  //setting states
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setting up endpoint and body based on mode
    const endpoint =
      mode === "login"
        ? "http://localhost:5000/api/users/login"
        : "http://localhost:5000/api/users";
    const body =
      mode === "login" ? { email, password } : { username, email, password };

    //try block to make API call
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      //handling response if email  and user exist or not
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "User or email already taken");
      }

      //success block
      const data = await response.json();
      if (mode === "login") {
        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("loginStateChange"));
        navigate("/");
      } else {
        alert("Registration successful! Please log in.");
        setMode("login");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  //rendering form
  return (
    <form className="game-form" onSubmit={handleSubmit}>
      <h2 className="game-form__title">
        {mode === "login" ? "Login" : "Register"}
      </h2>

      {error && <p className="game-form__error">{error}</p>}

      {mode === "register" && (
        <div className="game-form__field">
          <label>Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setuserName(e.target.value)}
            required
          />
        </div>
      )}

      <div className="game-form__field">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="game-form__field">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div id="login-form__actions" className="game-form__actions">
        <button className="btn btn--primary" type="submit">
          {mode === "login" ? "Login" : "Register"}
        </button>

        <div id="bottom-text-div">
          <p
            className="game-form__toggled"
            style={{
              cursor: "pointer",
              color: "blue",
              display: "inline-block",
            }}
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login"
              ? "Create an account?"
              : "Already have an account?"}
          </p>

          {mode === "login" && (
            <Link to="/forgot-pass" style={{ color: "blue" }}>
              Forgot Password?
            </Link>
          )}
        </div>
      </div>
    </form>
  );
}

export default AuthForm;
