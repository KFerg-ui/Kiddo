import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import InvestorPortal from "./components/investor/InvestorPortal";
import CustomerServicePortal from "./components/support/CustomerServicePortal";
import CompanyInfo from "./components/info/CompanyInfo";
import CustomerServiceCompany from "./components/support/CustomerServiceCompany";
import Admin from "./components/login/Admin";

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
        <Route path="/info" element={<CompanyInfo />} />
        <Route path="/support/:company" element = {<CustomerServiceCompany/>}/>
        <Route path="/login/admin" element = {<Admin/>} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
