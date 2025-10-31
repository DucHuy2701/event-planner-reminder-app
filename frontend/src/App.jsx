import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div className="container">
      <Link className="navbar-brand fw-bold" to="/">EventPlanner</Link>
      <div className="navbar-nav ms-auto gap-3">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/events">Events</Link>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/signup">Signup</Link>
      </div>
    </div>
  </nav>
)

const Home = () => (
  <div className="container mt-5 text-center">
    <h1 className="display-4 mb-3">Welcome to Event Planner</h1>
    <p className="lead text-muted">Plan, invite, remind — all in one app.</p>
    <button className="btn btn-success btn-lg px-4">Get Started</button>
  </div>
)

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<h2 className="text-center mt-5">Events Page</h2>} />
      <Route path="/login" element={<h2 className="text-center mt-5">Login</h2>} />
      <Route path="/signup" element={<h2 className="text-center mt-5">Signup</h2>} />
    </Routes>
  </BrowserRouter>
)

export default App