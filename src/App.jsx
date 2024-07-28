import "./App.css";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col lg:mx-10 mx-1 relative overflow-x-hidden">
      <div className="sticky top-0 left-0 right-0 z-1">
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
