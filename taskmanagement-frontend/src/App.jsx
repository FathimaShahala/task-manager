import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Header";
import MiniSidebar from "./components/Minisidebar";
import MaxBar from "./components/Maxbar";
import Dashboard from "./pages/Dashboard";
import Track from "./pages/Track";
import Projects from "./pages/Projects";
import Reports from "./pages/Report"; // <- Import Reports page
import Header from "./components/Header";
import Welcome from "./pages/Welcome"; // <- Import welcome page
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <MiniSidebar />
      <Header />
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<MaxBar />}>
          <Route index element={<Welcome />} /> {/* <- Show welcome on root */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="track" element={<Track />} />
          <Route path="projects" element={<Projects />} />
          <Route path="reports" element={<Reports />} />{" "}
          {/* <- Route for Reports page */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
