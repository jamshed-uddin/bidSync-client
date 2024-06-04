import "./App.css";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col lg:mx-20 mx-2">
      <div>
        <Navbar />
      </div>
      <div className="flex-grow min-h-[calc(100vh-5rem)] mx-2">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
