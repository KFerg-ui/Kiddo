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
import { useState, useEffect, createContext } from "react";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";

const UserContext = createContext()

function App() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    console.log("app load")
    console.log("HASTOKEN?: ", localStorage.getItem("token") == true)
    setHasToken(localStorage.getItem("token") == true)
  }, [])



  return (
    <Router>
      <UserContext.Provider value = {setHasToken}>

        <Navbar hasToken = {hasToken}/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/investors" element={<InvestorPortal />} />
          <Route path="/support" element={<CustomerServicePortal />} />
          <Route path="/info" element={<CompanyInfo />} />
          <Route path="/support/:company" element={<CustomerServiceCompany />} />
          <Route path="/admin" element={<Admin />} />
          <Route path = "/forgot-password" element = {<ForgotPassword/>} />
        </Routes>

        <Footer />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
export { UserContext }
