import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import InvestorPortal from "./components/investor/InvestorPortal";
import CustomerServicePortal from "./components/support/CustomerServicePortal";
import CompanyInfo from "./components/info/CompanyInfo";
import AdminLogin from "./components/admin/AdminLogin";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/investors" element={<InvestorPortal />} />
        <Route path="/support" element={<CustomerServicePortal />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/info" element={<CompanyInfo />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
