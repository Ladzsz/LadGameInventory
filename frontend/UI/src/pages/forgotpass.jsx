import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
//importing routes saved as ENV this will allow for global variable manipulation
//as opposed to being hard coded in each file that uses it.
const ForgotPassRoute = import.meta.env.VITE_FORGOTPASS_ROUTE;

function ForgotPass() {
  //setting state
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setting up endpoint and body
    const endpoint = `${ForgotPassRoute}`;
    const body = { email };

    //try block to make API call
    try {
      setLoading(true);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      //handling response if email sent fails
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Something went wrong ");
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
    } finally {
      setLoading(false);
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

        {loading ? (
  <p>Sending Email...</p>
) : (
  <button className="btn btn--primary" type="submit">
          Submit
        </button>
)}
      </div>
    </form>
  );
}

export default ForgotPass;
