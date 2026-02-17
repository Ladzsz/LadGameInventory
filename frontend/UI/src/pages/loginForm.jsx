import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/styles/loginform.css";
//importing routes saved as ENV this will allow for global variable manipulation
//as opposed to being hard coded in each file that uses it.
const UserRoute = import.meta.env.VITE_USERS_ROUTE;
const UserLoginRoute = import.meta.env.VITE_LOGIN_ROUTE;

function AuthForm() {
  //setting states
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setting up endpoint and body based on mode
    const endpoint = mode === "login" ? `${UserLoginRoute}` : `${UserRoute}`;
    const body =
      mode === "login" ? { email, password } : { username, email, password };

    //try block to make API call
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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
        {loading ? (
          <p>Logging in...</p>
        ) : (
          <button className="btn btn--primary" type="submit">
            {mode === "login" ? "Login" : "Register"}
          </button>
        )}

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
            <Link to="/forgot-password" style={{ color: "blue" }}>
              Forgot Password?
            </Link>
          )}
        </div>
      </div>
    </form>
  );
}

export default AuthForm;
