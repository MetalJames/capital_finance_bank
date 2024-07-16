import { NavBar } from "./components";
import { AboutUs, HelpCenter, Home, Login, MyAccountPage, SignUp } from "./pages";
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
        <Route path="helpcenter" element={<HelpCenter />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="myaccount" element={<MyAccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
