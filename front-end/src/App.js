import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import CreateDNS from "./components/createDNS/createDNS";
import UpdateDNS from "./components/updateDNS/updateDNS";
import AllDns from "./components/AllDNSRcorde/AllDNSRecord";
import PrivetRoute from "./components/PrivetRoute/PrivetRoute";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<PrivetRoute />}>
          <Route path="/create-dns" element={<CreateDNS />} />
          <Route path="/update-dns/:id" element={<UpdateDNS />} />
          <Route path="/all-dns" element={<AllDns />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
