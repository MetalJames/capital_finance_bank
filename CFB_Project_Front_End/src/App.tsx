import { NavBar } from "./components";
import { AboutUs, ContactUs, Home, Login, MyAccountPage, SignUp } from "./pages";
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
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="myaccount/*" element={<MyAccountPage />} />
          </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App
