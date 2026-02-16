import React from "react";
import { Link } from "react-router-dom";

const SignOutButton = () => {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("loginStateChange"));
    console.log("User signed out");
  };

  return (
    <Link to="/login" onClick={handleSignOut}>
      Sign Out
    </Link>
  );
};

export default SignOutButton;
