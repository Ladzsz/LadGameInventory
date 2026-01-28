import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Content from "./components/content";
import HomePage from "./pages/home";
import GameForm from "./pages/form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/add-game"
            element={
              <GameForm
                onSuccess={() => {
                  alert("Game saved!");
                  console.log("Game saved!");
                }}
              />
            }
          />
        </Routes>
      </Content>
      <Footer />
    </>
  );
}

export default App;
