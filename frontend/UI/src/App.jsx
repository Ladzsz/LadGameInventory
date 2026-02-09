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
import AuthForm from "./pages/loginForm";
import ProtectedRoute from "./components/protectedRoute";
import ErrorPage from "./components/error";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isErrorPage, setIsErrorPage] = useState(false);

  return (
    <>
      <Header />

      <Content isErrorPage={isErrorPage}>
        <Routes>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/" element={<HomePage />} />

          {/* Protected routes */}
          <Route
            path="/add-game"
            element={
              <ProtectedRoute>
                <GameForm onSuccess={() => alert("Game saved!")} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-game/:id"
            element={
              <ProtectedRoute>
                <GameForm onSuccess={() => alert("Game saved!")} />
              </ProtectedRoute>
            }
          />

          {/* admin Protected routes */}
          <Route
            path="/add-category"
            element={
              <ProtectedRoute requireAdmin>
                <CategoryForm onSuccess={() => alert("Category saved!")} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-category/:id"
            element={
              <ProtectedRoute requireAdmin>
                <CategoryForm onSuccess={() => alert("Category updated!")} />
              </ProtectedRoute>
            }
          />

          {/* unProtected routes */}
          <Route path="/games" element={<GamePage />} />
          <Route path="/categories" element={<CategoryPage />} />

          <Route
            path="*"
            element={
              <ErrorPage
                onMount={() => setIsErrorPage(true)}
                onUnmount={() => setIsErrorPage(false)}
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
