import "../assets/styles/errorpage.css";
import { useEffect } from "react";

function ErrorPage({ code = 404, message, description, onMount, onUnmount }) {
  //if on mount is null or undefined dont call it, same for onUnmount
  useEffect(() => {
    onMount?.();
    return () => {
      onUnmount?.();
    };
  }, [onMount, onUnmount]);

  const errors = {
    404: {
      message: "Not Found",
      description: "The page you requested does not exist",
    },
  };

  const error = errors[code] || errors[404];

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="glitch" data-text={404}>
          {code}
        </h1>
        <p className="subtext">{message || error.message}</p>
        <p className="desc">{description || error.description}</p>
        <p style={{ fontSize: "64px" }}>&nbsp;</p>
      </div>
    </div>
  );
}

export default ErrorPage;
