import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ResetPass() {
  //setting state
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  //function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setting up endpoint and body
    const endpoint = "http://localhost:5000/api/users/reset-password";
    const body = { token, newPassword: password };

    //try block to make API call
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      //ensuring user must confirm their new password
      if (confirmpassword !== password) {
        throw new Error("Passwords do not match");
      }

      //handling response if email sent fails
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "something went wrong ");
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
      <h2 className="game-form__title">Enter New Password</h2>

      {error && <p className="game-form__error">{error}</p>}

      <div className="game-form__field">
        <label>New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="game-form__field">
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmpassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
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

export default ResetPass;
