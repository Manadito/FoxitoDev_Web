import "./App.css";
import { Route, Routes, HashRouter as Router } from "react-router-dom"; // Wrap the jsx in HashRouter when deploying to github.
import GameCanvas from "./GameCanvas/GameCanvas";
import ThreeCanvas from "./views/ThreeCanvas/ThreeCanvas";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="grid h-screen w-screen bg-white">
        <Routes>
          <Route path="/" element={<GameCanvas />} />
          <Route path="/headquarters" element={<ThreeCanvas />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
