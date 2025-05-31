import "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/customer/Home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/customer/home" replace />} />

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/customer/*" element={<CustomerRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
