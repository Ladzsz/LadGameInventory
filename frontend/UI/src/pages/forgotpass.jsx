import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ForgotPass() {
  //setting state
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setting up endpoint and body
    const endpoint = "http://localhost:5000/api/users/forgot-password";
    const body = { email };

    //try block to make API call
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      //handling response if email sent fails
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Please enter valid email ");
      }

      //success block
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  //rendering form
  return (
    <form id="forgotpassForm" className="game-form" onSubmit={handleSubmit}>
      <h2 className="game-form__title">Enter Email</h2>

      {error && <p className="game-form__error">{error}</p>}

      <div className="game-form__field">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/login" style={{ color: "blue" }}>
          Go back?
        </Link>

        <button className="btn btn--primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default ForgotPass;
