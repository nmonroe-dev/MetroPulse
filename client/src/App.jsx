import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import DetailPage from "./pages/detailPage";
import AboutPage from "./pages/aboutPage";
import ContactPage from "./pages/contactPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
