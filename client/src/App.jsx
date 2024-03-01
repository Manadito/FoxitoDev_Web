import "./App.css";
import { Route, Routes } from "react-router-dom";
import GameCanvas from "./GameCanvas/GameCanvas";
import ThreeCanvas from "./views/ThreeCanvas/ThreeCanvas";

function App() {
  return (
    <div className="grid h-screen w-screen bg-white">
      <Routes>
        <Route path="/" element={<GameCanvas />} />
        <Route path="/headquarters" element={<ThreeCanvas />} />
      </Routes>
    </div>
  );
}
export default App;
