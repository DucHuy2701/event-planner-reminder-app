import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import AuthPage from "./page/AuthPage";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ email: "user@example.com" });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          EventsPlanner
        </Link>
        <div className="navbar-nav ms-auto gap-3">
          <Link className="nav-link" to="/">
            Home
          </Link>
          {user ? (
            <>
              <Link className="nav-link" to="/events">
                Events
              </Link>
              <span className="nav-link text-light">Welcome, {user.email}</span>
              <button className="btn btn-outline-light btn-sm" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="login">
                Login
              </Link>
              <Link className="nav-link" to="signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const Home = () => (
  <div className="container mt-5 text-center">
    <h1 className="display-4 mb-3">Welcome to Event Planner</h1>
    <p className="lead text-muted">Plan, invite, remind — all in one app.</p>
    <Link className="btn btn-success btn-lg px-4" to="/events">
      Get Started
    </Link>
  </div>
);

const ProtectedPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Events Page</h2>
      <p>Only user see this!</p>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthPage />}/>
      <Route path="/signup" element={<AuthPage />}/>
      <Route path="/events" element={<ProtectedPage />}/>
    </Routes>
  </BrowserRouter>
);

export default App;
