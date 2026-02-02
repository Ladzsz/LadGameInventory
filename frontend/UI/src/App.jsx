import "./App.css";
import "./assets/styles/form.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Content from "./components/content";
import HomePage from "./pages/home";
import GameForm from "./pages/form";
import GamePage from "./pages/gamepage";
import CategoryPage from "./pages/categoryPage";
import CategoryForm from "./pages/categoryForm";
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
            <Route
  path="/add-game/:id"
  element={
    <GameForm
      onSuccess={() => {
        alert("Game saved!");
        console.log("Game saved!");
      }}
    />
  }
/>

<Route path="/add-category" element={<CategoryForm onSuccess={() => { alert("Category saved!"); console.log("Category saved!"); }} />} />
<Route
  path="/add-category/:id"
  element={<CategoryForm onSuccess={() => { alert("Category updated!"); console.log("Category updated!"); }} />}
/>
          
          <Route path="/games" element={<GamePage />} />
          <Route path="/categories" element={<CategoryPage />} />
        </Routes>
      </Content>
      <Footer />
    </>
  );
}

export default App;
