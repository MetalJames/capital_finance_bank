import { NavBar } from "./components";
import { AboutUs, ContactUs, Home, MyAccount } from "./pages";
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
        <Route path="myaccount" element={<MyAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
