import { NavBar, Footer } from "./components";
import { AboutUs, ContactUs, Home, Login, MyAccountPage, SignUp } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
    <header>
      <NavBar />
    </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="myaccount" element={<MyAccountPage />} />
      </Routes>
    <Footer />
  </BrowserRouter>
  );
}

export default App
