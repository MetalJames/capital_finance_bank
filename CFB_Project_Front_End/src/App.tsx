import { NavBar, Footer } from "./components";
import { AboutUs, ContactUs, Home, Login, MyAccountPage, SignUp, Support } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

function App() {

  return (
    <BrowserRouter>
    <UserProvider>
    <header>
      <NavBar />
    </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="support" element={<Support/>} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="myaccount" element={<MyAccountPage />} />
      </Routes>
      </UserProvider>
    <Footer />
  </BrowserRouter>
  );
}

export default App
